"use strict";(self.webpackChunkelectronic_e_shop_v1=self.webpackChunkelectronic_e_shop_v1||[]).push([[876],{5977:function(e,l,s){s.d(l,{Z:function(){return c}});var a=s(1413),r=s(4925),t=s(7087),i=s(184),n=["ratio","effect","alt","className"];function c(e){var l=e.ratio,s=e.effect,c=void 0===s?"blur":s,o=e.alt,d=void 0===o?"lazy-image":o,m=e.className,u=(0,r.Z)(e,n);return l?(0,i.jsx)("span",{className:"relative overflow-hidden block w-full  leading-0 border border-transparent ".concat(m),style:{paddingTop:"".concat(100*l,"%")},children:(0,i.jsx)(t.LazyLoadImage,(0,a.Z)((0,a.Z)({wrapperClassName:"absolute inset-0 bg-cover",className:"object-cover w-full h-full"},u),{},{alt:d,effect:c,placeholderSrc:"/images/common/img_placeholder.svg"}))}):(0,i.jsx)("span",{className:"overflow-hidden block w-full leading-0 border border-transparent ".concat(m),children:(0,i.jsx)(t.LazyLoadImage,(0,a.Z)((0,a.Z)({wrapperClassName:"bg-cover w-full h-full",className:"object-cover w-full h-full"},u),{},{effect:c,placeholderSrc:"/images/common/img_placeholder.svg"}))})}},5212:function(e,l,s){var a=s(1413),r=s(4925),t=s(2791),i=s(6907),n=s(184),c=["children","title","meta"],o=(0,t.forwardRef)((function(e,l){var s=e.children,t=e.title,o=void 0===t?"":t,d=(e.meta,(0,r.Z)(e,c));return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.ql,{children:(0,n.jsx)("title",{children:"".concat(o," | electronic online shop")})}),(0,n.jsx)("div",(0,a.Z)((0,a.Z)({ref:l},d),{},{children:s})),(0,n.jsx)("div",{className:"h-16 w-full md:hidden "})]})}));l.Z=o},3876:function(e,l,s){s.r(l),s.d(l,{default:function(){return p}});var a=s(1413),r=s(1134),t=s(2711),i=s(2791),n=s(9120),c=s(937),o=s(6140),d=s(5977),m=s(5212),u=s(3504),f=s(1105),h=s(184);function p(){var e=(0,n.Z)(),l=e.user,s=e.initialize,p=(0,i.useMemo)((function(){return{image:null===l||void 0===l?void 0:l.image,firstname:null===l||void 0===l?void 0:l.firstname,lastname:null===l||void 0===l?void 0:l.lastname,phone:null===l||void 0===l?void 0:l.phone,email:null===l||void 0===l?void 0:l.email,bday:null===l||void 0===l?void 0:l.bday}}),[l]),x=(0,r.cI)(p),b=x.register,g=x.reset,j=x.handleSubmit,v=x.setValue,N=x.watch,w=x.formState.isSubmitting,y=N("image");return(0,i.useEffect)((function(){l&&g(p)}),[l,p,g]),(0,h.jsxs)(m.Z,{title:"Profile",className:"flex flex-col w-full gap-2 sm:gap-4 ",children:[(0,h.jsx)("div",{className:"breadcrumbs  bg-base-300 absolute w-full left-0 px-6 overflow-x-hidden mt-24",children:(0,h.jsxs)("ul",{children:[(0,h.jsx)("li",{children:(0,h.jsx)(u.rU,{to:"/",children:(0,f.t)("words.home")})}),(0,h.jsx)("li",{children:(0,h.jsx)(u.rU,{to:"/user",children:(0,f.t)("menu.user")})}),(0,h.jsx)("li",{children:(0,h.jsx)("label",{children:(0,f.t)("menu.profile")})})]})}),(0,h.jsx)("div",{className:"mt-40 w-full"}),(0,h.jsx)("div",{className:"container px-5 py-8 text-gray-700 max-w-2xl",children:(0,h.jsxs)("form",{onSubmit:j((function(e){var l=new FormData,a=e.firstname,r=e.lastname,t=e.bday,i=e.image;l.append("firstname",a),l.append("lastname",r),l.append("bday",t),l.append("image",i),"string"===typeof i&&(0,c.DS)(c.$5.user.setProfileWithoutImage,e).then((function(e){200===e.status?(o.ZP.success("Your profile was changed"),s()):o.ZP.error(e.message)})),"object"===typeof i&&(0,c.Y6)(c.$5.user.setProfileWithImage,l).then((function(e){200===e.status?(o.ZP.success("Your profile was changed"),s()):o.ZP.error(e.message)}))})),className:"grid sm:grid-cols-2 gap-5 rounded-2xl shadow-lg bg-base-300",children:[(0,h.jsxs)("div",{className:"card p-6  gap-5  h-full items-center flex flex-col justify-center",children:[(0,h.jsxs)("div",{className:"mx-auto relative ",children:[y&&(0,h.jsx)(d.Z,{className:"w-32 h-32 rounded-full outline-dashed outline-stone-300 outline-offset-4 outline-1",src:"string"===typeof y?"".concat(c.S$.root).concat(y):URL.createObjectURL(y)}),(0,h.jsx)("input",{hidden:!0,id:"image",type:"file",accept:"image/*",onChange:function(e){e.target.files&&e.target.files.length>0&&v("image",e.target.files[0])}}),(0,h.jsx)("label",{htmlFor:"image",className:"rounded-lg border bg-base-100  w-9 h-9 cursor-pointer flex absolute bottom-0 right-0",children:(0,h.jsx)(t.JO,{icon:"fa:pencil",width:20,className:"m-auto text-gray-300"})})]}),(0,h.jsxs)("p",{className:"text-gray-500 text-center text-sm",children:["Allowed *.jpeg, *.jpg, *.png, *.gif ",(0,h.jsx)("br",{}),"max size of 3.1 MB"]})]}),(0,h.jsxs)("div",{className:" p-6 gap-3",children:[(0,h.jsxs)("div",{className:"grid  gap-5 mb-5",children:[(0,h.jsxs)("div",{className:"w-full",children:[(0,h.jsxs)("p",{className:"font-bold text-sm pl-2",children:[" ","First Name"]}),(0,h.jsx)("input",(0,a.Z)({className:"input h-10 border border-base-300 w-full",required:!0},b("firstname")))]}),(0,h.jsxs)("div",{className:"w-full",children:[(0,h.jsxs)("p",{className:"font-bold text-sm pl-2",children:[" ","Last Name"]}),(0,h.jsx)("input",(0,a.Z)({className:"input h-10 border border-base-300 w-full",required:!0},b("lastname")))]}),(0,h.jsxs)("div",{className:"w-full",children:[(0,h.jsxs)("p",{className:"font-bold text-sm pl-2",children:[" ","Mobile"]}),(0,h.jsx)("input",(0,a.Z)({className:"input h-10 border border-base-300 w-full ",readOnly:!0,disabled:!0},b("phone")))]}),(0,h.jsxs)("div",{className:"w-full",children:[(0,h.jsxs)("p",{className:"font-bold text-sm pl-2",children:[" ","Email"]}),(0,h.jsx)("input",(0,a.Z)({className:"input h-10 border border-base-300 w-full",readOnly:!0,disabled:!0},b("email")))]}),(0,h.jsxs)("div",{className:"w-full ",children:[(0,h.jsx)("p",{className:"font-bold text-sm pl-2",children:"Birthday"}),(0,h.jsx)("input",(0,a.Z)({placeholder:"1996-4-3",className:"input h-10 border border-base-300 w-full",required:!0},b("bday")))]})]}),(0,h.jsx)("div",{className:"flex ",children:(0,h.jsx)("button",{type:"submit",className:"btn btn-accent px-5 ml-auto ".concat(w&&"loading"),children:"Save"})})]})]})})]})}}}]);
//# sourceMappingURL=876.4f3ae561.chunk.js.map