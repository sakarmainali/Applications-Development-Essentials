(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[5],{102:function(e,t,a){"use strict";a.r(t);var r=a(6),n=a.n(r),i=a(16),o=a(1),l=a(0),s=a.n(l),u=a(2),c=a(22),m=a(14),p=a(18),d=a(13),b=a(34),v=a(21),y=a(31),f=a(19),k=a(17);a(97);t.default=function(){var e=Object(l.useContext)(k.a),t=Object(f.a)(),a=t.isLoading,r=t.error,_=t.sendRequest,O=t.clearError,h=Object(y.a)({book_description:{value:"",isValid:!1},summary_title:{value:"",isValid:!1},summary_body:{value:"",isValid:!1},image:{value:null,isValid:!0}},!1),x=Object(o.a)(h,2),E=x[0],g=x[1],j=Object(u.g)(),w=function(){var t=Object(i.a)(n.a.mark((function t(a){var r;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,r=new FormData,console.log(e.token),r.append("book_description",E.inputs.book_description.value),r.append("summary_title",E.inputs.summary_title.value),r.append("summary_body",E.inputs.summary_body.value),r.append("image",E.inputs.image.value),t.next=10,_("https://book-min.herokuapp.com/api/summary","POST",r,{Authorization:"Bearer "+e.token});case 10:j.push("/"),t.next=16;break;case 13:t.prev=13,t.t0=t.catch(1),console.log("error occured");case 16:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e){return t.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(p.a,{error:r,onClear:O}),s.a.createElement("form",{className:"place-form",onSubmit:w},a&&s.a.createElement(d.a,{asOverlay:!0}),s.a.createElement(c.a,{id:"book_description",element:"input",type:"text",label:"Book Description",validators:[Object(v.c)()],errorText:"Please enter a valid title.",onInput:g}),s.a.createElement(c.a,{id:"summary_title",element:"input",type:"text",label:"Summary Title",validators:[Object(v.c)()],errorText:"Please enter a valid title.",onInput:g}),s.a.createElement(c.a,{id:"summary_body",element:"textarea",label:"Summary Body",validators:[Object(v.b)(5)],errorText:"Please enter a valid description.",onInput:g}),s.a.createElement(b.a,{id:"image",onInput:g}),s.a.createElement(m.a,{type:"submit",disabled:!E.isValid},"ADD SUMMARY")))}},97:function(e,t,a){}}]);
//# sourceMappingURL=5.3e9b4269.chunk.js.map