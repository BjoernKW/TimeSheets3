import { Component, NgZone, OnInit } from '@angular/core';

declare var Mite: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  defaultDate: string;
  mite: any;

  storage = localStorage;

  totalMinutes = 0;
  totalHours = 0;

  currentYear;

  projects: { key: string, value: string }[] = [];
  timeEntries: {
    userName: string,
    serviceName: string,
    note: string,
    date: string,
    hours: string
  }[] = [];

  static formatDateForDisplay(date: Date) {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();
  }

  static formatDate(date: Date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  constructor(private _ngZone: NgZone) {
    const today = new Date();

    this.defaultDate = HomeComponent.formatDate(today);
    this.currentYear = today.getFullYear();

    this.projects = localStorage['projects'] ? JSON.parse(localStorage['projects']) : [];
    this.timeEntries = localStorage['timeEntries'] ? JSON.parse(localStorage['timeEntries']) : [];
    this.totalMinutes = localStorage['totalMinutes'] ? localStorage['totalMinutes'] : 0;
    this.totalHours = this.totalMinutes / 60;

    if (!localStorage['startDate']) {
      localStorage['startDate'] = this.defaultDate;
    }
    if (!localStorage['endDate']) {
      localStorage['endDate'] = this.defaultDate;
    }
    if (!localStorage['headline']) {
      localStorage['headline'] = 'TimeSheets';
    }
    if (!localStorage['project']) {
      localStorage['project'] = '';
    }
    if (!localStorage['totalMinutes']) {
      localStorage['totalMinutes'] = this.totalMinutes;
    }
    if (!localStorage['language']) {
      localStorage['language'] = 'en';
    }
  }

  ngOnInit() {
  }

  login() {
    this.mite = new Mite(
      {
        account: localStorage['accountName'],
        api_key: localStorage['apiKey']
      }
    );

    this._ngZone.run(() => {
      this.mite.Project.active(
        (data: any) => {
          const projects: any[] = [];
          data.forEach(
            (object: any) => {
              projects.push({ key: object.project.id, value: object.project.customer_name + ': ' + object.project.name });
            }
          );

          localStorage['projects'] = JSON.stringify(projects);

          this.projects = JSON.parse(localStorage['projects']);
        }
      );
    });
  }

  displayTimes() {
    if (!this.mite) {
      this.mite = new Mite(
        {
          account: localStorage['accountName'],
          api_key: localStorage['apiKey']
        }
      );
    }

    this._ngZone.run(() => {
      this.mite.Project.find(
        localStorage['project'],
        (data: any) => {
          localStorage['projectName'] = data.project.customer_name + ': ' + data.project.name;
          localStorage['displayStartDate'] = HomeComponent.formatDateForDisplay(new Date(localStorage['startDate']));
          localStorage['displayEndDate'] = HomeComponent.formatDateForDisplay(new Date(localStorage['endDate']));
          localStorage['showProjectHeadline'] = true;
        }
      );

      this.mite.TimeEntry.all(
        {
          project_id: localStorage['project'],
          from: localStorage['startDate'],
          to: localStorage['endDate']
        },
        (data: any) => {
          const timeEntries: any[] = [];
          this.totalMinutes = 0;

          data.forEach(
            (object: any) => {
              const date = new Date(object.time_entry.date_at);
              const formattedDate = HomeComponent.formatDateForDisplay(date);

              timeEntries.push(
                {
                  userName: object.time_entry.user_name,
                  serviceName: object.time_entry.service_name,
                  note: object.time_entry.note,
                  date: formattedDate,
                  hours: object.time_entry.minutes / 60
                }
              );

              this.totalMinutes += object.time_entry.minutes;
            }
          );

          localStorage['timeEntries'] = JSON.stringify(timeEntries);
          localStorage['totalMinutes'] = this.totalMinutes;

          this.timeEntries = JSON.parse(localStorage['timeEntries']);
          this.totalHours = this.totalMinutes / 60;
        }
      );
    });
  }
}
