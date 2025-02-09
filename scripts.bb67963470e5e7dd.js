
!function(E){"use strict";var S={protocol:"https",domain:"mite.yo.lk",async:!0,timeout:60,error:function(u,i){alert("Error: mite.gyver could not connect with your mite.account!")}},q=function(){},R=function(u){return/^\s*$/.test(u)?{}:JSON.parse(u)},p=function(u){return"function"==typeof u&&(u={success:u}),u||{}},l=function(u){for(var i=1,c=arguments.length;i<c;i++)for(var a in arguments[i])u[a]=arguments[i][a];return u};E.Mite=function(u){if(!u||!u.account||!u.api_key)throw"account & api_key need to be set";var i=l({},S,u),c={},a={},v=function(f){return i.protocol+"://corsapi."+i.domain+"/"+f+".json"},T=function(f,n,o){var d,t=new XMLHttpRequest,_=o.data||null,e="boolean"==typeof o.async?o.async:i.async,r=o.timeout||i.timeout,g=function(h){var y=h.success||q,x=h.error||i.error,O=h.complete||q,m={success:null,error:null,complete:null};return/2\d\d/.test(t.status)?t.responseText?(m.success=[R(t.responseText)],y(m.success[0])):(m.error=[t,"error"],x(t,"error")):(m.error=[t,t.responseText||"error"],x(t,t.responseText||"error")),m.complete=t,O(t),m};if(t.onreadystatechange=function(){if(4==t.readyState){if("GET"==f){for(var y=0;y<c[n].length;y++)a[n]=g(c[n][y]);delete c[n]}else g(o);clearTimeout(d)}},o.error&&(d=setTimeout(function(){error(t,"timeout")},1e3*r)),t.open(f,n,e),_ instanceof Object&&(_=JSON.stringify(_),t.setRequestHeader("Content-Type","application/json")),t.setRequestHeader("X-Requested-With","XMLHttpRequest"),t.setRequestHeader("X-MiteApiKey",i.api_key),t.setRequestHeader("X-MiteAccount",i.account),t.send(_),!i.async)return R(t.responseText)},j=function(f,n,o){var t=p(o);return t.data=n,T("PUT",v(f),t)},w=function(f,n){return T("DELETE",v(f),p(n))},k=function(f){var n=function(e,r,d){var s,g=/\?/.test(e)?"&":"?";if(typeof d>"u"?s=p(r):(s=p(d)).data=r,e=v(e),s.data&&(e+=g+function(u){if(!u||"String"==typeof u)return u||"";var i=[];for(var c in u)i.push("_queryString"==c?u[c]:[encodeURIComponent(c),encodeURIComponent(u[c])].join("="));return i.join("&")}(s.data),delete s.data),c[e])c[e].push(s);else{if(!f||!a[e])return c[e]=[s],T("GET",e,s);s.success&&a[e].success&&s.success.apply(null,a[e].success),s.error&&a[e].error&&s.error.apply(null,a[e].error),s.complete&&a[e].complete&&s.complete.apply(null,a[e].complete)}},o={_name:function(){return this._url.replace(/s$/,"").replace(/ie$/,"y")},_wrapParams:function(e){var r={};return r[this._name()]=e,r},all:function(e,r){return n(this._url,e,r)},find:function(e,r){return n(this._url+"/"+e,r)},create:function(e,r){return function(f,n,o){var t=p(o);return t.data=n,T("POST",v(f),t)}(this._url,this._wrapParams(e),r)},update:function(e,r,d){return j(this._url+"/"+e,this._wrapParams(r),d)},destroy:function(e,r){return w(this._url+"/"+e,r)}},t=l({all:void 0,active:o.all,archived:function(e,r){return n(this._url+"/archived",e,r)}},o),_={create:void 0,update:void 0,destroy:void 0};return{account:function(e){return n("account",e)},myself:function(e){return n("myself",e)},TimeEntry:l({_url:"time_entries"},o),Tracker:{find:function(e){return n("tracker",e)},start:function(e,r){return j("tracker/"+e,{},r)},stop:function(e,r){return w("tracker/"+e,r)}},Bookmark:l({_url:"time_entries/bookmarks",time_entries_for:function(e,r){return n(this._url+"/"+e+"/follow",r)}},o,_),Customer:l({_url:"customers",projects_for:function(e,r){return n("projects?customer_id="+e,r)},time_entries_for:function(e,r){return n("time_entries?customer_id="+e,r)}},t),Project:l({_url:"projects",time_entries_for:function(e,r){return n("time_entries?project_id="+e,r)}},t),Service:l({_url:"services",time_entries_for:function(e,r){return n("time_entries?service_id="+e,r)}},t),User:l({_url:"users",time_entries_for:function(e,r){return n("time_entries?user_id="+e,r)}},t,_),config:i,clearCache:function(e){this._url&&(e?a[e]=void 0:a={})}}};return l(k(),{cache:k(!0)})}}(window);
