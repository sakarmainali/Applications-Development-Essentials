(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[3],{101:function(e,t,a){},104:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a.n(n),c=a(16),o=a(1),l=a(0),i=a.n(l),s=a(2),m=a(18),u=a(13),d=a(19),p=a(98);a(101);t.default=function(){var e=Object(l.useState)(),t=Object(o.a)(e,2),a=t[0],n=t[1],E=Object(d.a)(),f=E.isLoading,b=E.error,h=E.sendRequest,y=E.clearError,v=Object(s.h)().summaryId;return Object(l.useEffect)((function(){(function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("https://book-min.herokuapp.com/"+"api/summary/".concat(v));case 3:t=e.sent,console.log(t.summarybyid),n(t.summarybyid),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}})()()}),[h,v]),i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{error:b,onClear:y}),f&&i.a.createElement("div",{className:"center"},i.a.createElement(u.a,null)),!f&&a&&i.a.createElement("ul",{className:"nice-display"},i.a.createElement(p.a,{key:a.id,id:a.id,image:a.summary_cover,title:a.summary_title,description:a.book_description,body:a.summary_body,creatorId:a.creator_id})))}},98:function(e,t,a){"use strict";var n=a(6),r=a.n(n),c=a(16),o=a(1),l=a(0),i=a.n(l),s=a(8),m=a(14),u=a(30),d=(a(18),a(13)),p=a(17),E=a(19);a(99);t.a=function(e){var t=Object(E.a)(),a=t.isLoading,n=(t.error,t.sendRequest),f=(t.clearError,Object(l.useContext)(p.a)),b=Object(l.useState)(!1),h=Object(o.a)(b,2),y=h[0],v=h[1],k=function(){v(!1)},_=function(){var t=Object(c.a)(r.a.mark((function t(){return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return v(!1),t.prev=1,t.next=4,n("https://book-min.herokuapp.com/"+"api/summary/".concat(e.id),"DELETE",null,{Authorization:"Bearer "+f.token});case 4:e.onDelete(e.id),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{show:y,onCancel:k,header:"Are you sure?",footerClass:"place-item__modal-actions",footer:i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{inverse:!0,onClick:k},"CANCEL"),i.a.createElement(m.a,{danger:!0,onClick:_},"DELETE"))},i.a.createElement("p",null,"Do you want to proceed and delete this summary? Please note that it can't be undone thereafter.")),i.a.createElement("li",{className:"place-item"},i.a.createElement(s.a,{className:"place-item__content"},a&&i.a.createElement(d.a,{asOverlay:!0}),i.a.createElement("div",{className:"place-item__image"},i.a.createElement("img",{src:"https://book-min.herokuapp.com/"+"".concat(e.image),alt:e.title})),i.a.createElement("div",{className:"place-item__info"},i.a.createElement("h2",null,e.title),i.a.createElement("h3",null,e.body),i.a.createElement("p",null,e.description)),i.a.createElement("div",{className:"place-item__actions"},f.userId===e.creatorId&&i.a.createElement(m.a,{to:"/summary/".concat(e.id)},"EDIT"),f.userId===e.creatorId&&i.a.createElement(m.a,{danger:!0,onClick:function(){v(!0)}},"DELETE")))))}},99:function(e,t,a){}}]);
//# sourceMappingURL=3.9924da6f.chunk.js.map