(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["project"],{"01de":function(t,e,r){"use strict";var s=r("7940"),a=r.n(s);a.a},"07bd":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",[r("el-col",{attrs:{xs:24,sm:2,md:2,lg:2,xl:2}},[r("el-menu",{class:t.menuVertical,attrs:{"default-active":t.$route.path,mode:t.menuMode,router:"",collapse:t.menuCollapse}},[r("el-menu-item",{attrs:{index:"/projects/"+t.project._id}},[r("i",{staticClass:"el-icon-menu"})]),r("el-menu-item",{attrs:{index:"/projects/"+t.project._id+"/lists"}},[r("i",{staticClass:"el-icon-tickets"})]),r("el-menu-item",{attrs:{index:"/projects/"+t.project._id+"/chat"}},[r("i",{staticClass:"el-icon-message"})])],1)],1),r("el-col",{attrs:{xs:24,sm:22,md:22,lg:22,xl:22}},[r("el-card",[r("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[r("el-breadcrumb-item",{attrs:{to:"/"}},[t._v("home")]),r("el-breadcrumb-item",{attrs:{to:t.$route.params.listId?"/projects/"+t.project._id:""}},[t._v(t._s(t.project.title))]),t.showList?r("el-breadcrumb-item",[t._v(t._s(t.list))]):t._e()],1)],1),r("router-view")],1)],1)},a=[],n=(r("7514"),r("cadf"),r("551c"),{data:function(){return{windowWidth:0}},computed:{project:function(){return this.$store.state.project.currentProject},menuMode:function(){return this.windowWidth>768?"vertical":"horizontal"},menuCollapse:function(){return this.windowWidth>768},menuVertical:function(){return this.windowWidth>768&&"menuVertical"},list:function(){var t=this,e=this.project.lists.find(function(e){return e._id===t.$route.params.listId});return!!e&&e.title},showList:function(){return this.$route.params.listId}},created:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.windowWidth=window.innerWidth}}}),i=n,o=(r("245b"),r("2877")),l=Object(o["a"])(i,s,a,!1,null,"514be316",null);e["default"]=l.exports},"0a49":function(t,e,r){var s=r("9b43"),a=r("626a"),n=r("4bf8"),i=r("9def"),o=r("cd1c");t.exports=function(t,e){var r=1==t,l=2==t,c=3==t,u=4==t,d=6==t,p=5==t||d,h=e||o;return function(e,o,m){for(var f,b,v=n(e),g=a(v),x=s(o,m,3),k=i(g.length),$=0,j=r?h(e,k):l?h(e,0):void 0;k>$;$++)if((p||$ in g)&&(f=g[$],b=x(f,$,v),t))if(r)j[$]=b;else if(b)switch(t){case 3:return!0;case 5:return f;case 6:return $;case 2:j.push(f)}else if(u)return!1;return d?-1:c||u?u:j}}},1169:function(t,e,r){var s=r("2d95");t.exports=Array.isArray||function(t){return"Array"==s(t)}},"245b":function(t,e,r){"use strict";var s=r("3a81"),a=r.n(s);a.a},"36d8":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",[r("el-col",{attrs:{xs:24,sm:24,md:24,lg:8,xl:8}},[r("lists")],1),r("el-col",{attrs:{xs:24,sm:24,md:24,lg:16,xl:16}},[r("router-view")],1)],1)},a=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Lists")]),r("el-button",{staticStyle:{float:"right",padding:"3px 0px"},attrs:{type:"text",icon:"el-icon-search"},on:{click:function(e){t.filterOn=!t.filterOn}}}),r("el-button",{staticStyle:{float:"right",padding:"3px 10px"},attrs:{type:"text",icon:"el-icon-plus"},on:{click:t.addList}})],1),t.filterOn?r("el-input",{attrs:{placeholder:"Filter",clearable:""},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}):t._e(),r("vue-perfect-scrollbar",{staticStyle:{height:"55vh"}},[r("el-menu",{staticStyle:{border:"0px"},attrs:{router:"","default-active":t.$route.path}},t._l(t.lists,function(e){return r("el-menu-item",{key:e._id,attrs:{exact:"",index:"/projects/"+t.project._id+"/lists/"+e._id}},[t._v("\n        "+t._s(e.title)+"\n      ")])}))],1)],1)},i=[],o=(r("96cf"),r("3040")),l=(r("6762"),r("2fdb"),r("9d63")),c=r.n(l),u={data:function(){return{filterOn:!1,filter:""}},computed:{lists:function(){var t=this;return this.project.lists.filter(function(e){return e.title.includes(t.filter)})},project:function(){return this.$store.state.project.currentProject}},methods:{addList:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,r,s,a,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$prompt("Enter list title","Add List",{confirmButtonText:"Add",cancelButtonText:"Cancel",inputPattern:/\S/,inputErrorMessage:"List Title is requeried"});case 3:return e=t.sent,this.$store.dispatch("enableGlobalLoading"),t.next=7,this.$store.dispatch("addList",{title:e.value});case 7:r=t.sent,s=r.status,a=r.message,n=r.json,this.$store.dispatch("disableGlobalLoading"),s?this.$router.push("/projects/"+this.project._id+"/lists/"+n.listId):this.$message({type:"error",message:a}),t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](0),console.log(t.t0);case 18:case"end":return t.stop()}},t,this,[[0,15]])}));return function(){return t.apply(this,arguments)}}()},components:{VuePerfectScrollbar:c.a}},d=u,p=r("2877"),h=Object(p["a"])(d,n,i,!1,null,null,null),m=h.exports,f={computed:{project:function(){return this.$store.state.project.currentProject}},components:{Lists:m}},b=f,v=Object(p["a"])(b,s,a,!1,null,null,null);e["default"]=v.exports},"3a81":function(t,e,r){},"5b5d":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.list?r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Tasks")]),r("el-button",{staticStyle:{float:"right",padding:"3px 0px"},attrs:{type:"text",icon:"el-icon-search"},on:{click:function(e){t.filterOn=!t.filterOn}}}),r("el-button",{staticStyle:{float:"right",padding:"3px 10px"},attrs:{type:"text",icon:"el-icon-plus"},on:{click:function(e){t.addDialog=!0}}}),r("el-button",{staticStyle:{float:"right",padding:"3px 0px"},attrs:{type:"text",icon:"el-icon-delete"},on:{click:t.deleteList}})],1),t.filterOn?r("el-input",{attrs:{placeholder:"Filter",clearable:""},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}):t._e(),r("el-tabs",{attrs:{type:"card"}},[r("el-tab-pane",{attrs:{label:"Active"}},[r("tasks",{attrs:{tasks:t.activeTasks,state:"active"}})],1),r("el-tab-pane",{attrs:{label:"Completed"}},[r("tasks",{attrs:{tasks:t.completedTasks,state:"completed"}})],1),r("el-tab-pane",{attrs:{label:"Missed"}},[r("tasks",{attrs:{tasks:t.missedTasks,state:"missed"}})],1)],1),r("add-task",{attrs:{visible:t.addDialog},on:{"update:visible":function(e){t.addDialog=e}}})],1):t._e()},a=[],n=(r("96cf"),r("3040")),i=(r("6762"),r("2fdb"),r("7514"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("vue-perfect-scrollbar",{staticStyle:{height:"47vh"}},[r("el-collapse",{staticStyle:{margin:"0 10px"}},t._l(t.tasks,function(e){return r("el-collapse-item",{key:e._id,attrs:{title:e.title}},[r("div",{staticStyle:{"word-break":"break-all"}},[r("strong",[t._v("Description: ")]),t._v(" "+t._s(e.description))]),e.deadline?r("div",[r("strong",[t._v("Deadline: ")]),t._v(" "+t._s(new Date(e.deadline).toDateString()))]):t._e(),e.users.length>0?r("div",{staticStyle:{"word-break":"break-all"}},[r("strong",[t._v("Assigned Users: ")]),t._l(e.user,function(e){return r("span",[t._v(t._s(e))])})],2):t._e(),e.attachments.length>0?r("div",{staticStyle:{"word-break":"break-all"}},[r("strong",[t._v("Attachments: ")]),t._l(e.attachments,function(e){return r("span",[r("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.name))])])})],2):t._e(),r("div",{staticStyle:{float:"right","margin-right":"10px"}},[r("el-button",{attrs:{type:"text",color:"red"},on:{click:function(r){t.mark(e)}}},[t._v("Mark as "+t._s("completed"===t.state?"active":"completed"))]),r("el-button",{attrs:{type:"text",color:"red"},on:{click:function(r){t.deleteTask(e._id)}}},[t._v("Delete")])],1)])}))],1)}),o=[],l=r("9d63"),c=r.n(l),u={components:{VuePerfectScrollbar:c.a},methods:{deleteTask:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var r,s,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("Delete List?",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"warning"});case 3:return this.$store.dispatch("enableGlobalLoading"),t.next=6,this.$store.dispatch("deleteTask",{listId:this.$route.params.listId,taskId:e});case 6:if(r=t.sent,s=r.status,a=r.message,!s){t.next=16;break}return t.next=12,this.$store.dispatch("getProject",this.$route.params.id);case 12:this.$message({type:"success",message:"Task deleted!"}),this.$store.dispatch("disableGlobalLoading"),t.next=18;break;case 16:this.$message({type:"error",message:a}),this.$store.dispatch("disableGlobalLoading");case 18:t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](0),console.log(t.t0);case 23:case"end":return t.stop()}},t,this,[[0,20]])}));return function(e){return t.apply(this,arguments)}}(),mark:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var r,s,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.$store.dispatch("enableGlobalLoading"),t.next=3,this.$store.dispatch("markTask",{listId:this.$route.params.listId,task:e});case 3:if(r=t.sent,s=r.status,a=r.message,!s){t.next=12;break}return t.next=9,this.$store.dispatch("getProject",this.$route.params.id);case 9:this.$store.dispatch("disableGlobalLoading"),t.next=14;break;case 12:this.$message({type:"error",message:a}),this.$store.dispatch("disableGlobalLoading");case 14:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},props:["tasks","state"]},d=u,p=r("2877"),h=Object(p["a"])(d,i,o,!1,null,null,null),m=h.exports,f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-dialog",{attrs:{"close-on-press-escape":!1,"show-close":!1,fullscreen:"",center:"",title:"Add Task",visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[r("el-form",{attrs:{"label-position":"","label-width":"120px"}},[r("el-row",{attrs:{gutter:30}},[r("el-col",{attrs:{xs:24,sm:24,md:24,lg:14,xl:14}},[r("el-form-item",{attrs:{label:"Title"}},[r("el-input",{model:{value:t.task.title,callback:function(e){t.$set(t.task,"title",e)},expression:"task.title"}})],1),r("el-form-item",{attrs:{label:"Description"}},[r("el-input",{attrs:{type:"textarea",rows:4},model:{value:t.task.description,callback:function(e){t.$set(t.task,"description",e)},expression:"task.description"}})],1),r("el-form-item",{attrs:{label:"Deadline"}},[r("el-date-picker",{attrs:{type:"date"},model:{value:t.task.deadline,callback:function(e){t.$set(t.task,"deadline",e)},expression:"task.deadline"}})],1),r("el-form-item",{attrs:{label:"Assign Users"}},[r("el-select",{attrs:{filterable:"",multiple:"",placeholder:"Select"},model:{value:t.task.users,callback:function(e){t.$set(t.task,"users",e)},expression:"task.users"}},t._l(t.project.members,function(t){return r("el-option",{key:t.username,attrs:{label:t.username,value:t.username}})}))],1)],1),r("el-col",{attrs:{xs:24,sm:24,md:24,lg:10,xl:10}},[r("el-form-item",{attrs:{label:"Attachments"}},[r("el-upload",{ref:"upload",attrs:{multiple:"","auto-upload":!1,action:t.root+"/projects/"+t.project._id+"/lists/"+t.list._id+"/tasks/files",headers:{Authorization:t.$store.state.user.token},data:t.uploadData,"on-change":t.onChange,"on-success":t.onSuccess,"on-error":t.onError}},[r("el-button",{attrs:{size:"small",type:"text"}},[t._v("Upload")])],1)],1)],1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.cancel}},[t._v("Cancel")]),r("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("Confirm")])],1)],1)},b=[],v=r("fdc3"),g={data:function(){return{task:{title:"",description:"",deadline:"",users:[]},fileList:[],root:v["b"],uploadData:{}}},computed:{project:function(){return this.$store.state.project.currentProject},list:function(){var t=this;return this.project.lists.find(function(e){return e._id===t.$route.params.listId})}},components:{VuePerfectScrollbar:c.a},methods:{submitForm:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,r,s,a,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.$store.dispatch("enableGlobalLoading"),t.next=4,this.$store.dispatch("addTask",{task:this.task,listId:this.list._id});case 4:e=t.sent,r=e.status,s=e.message,a=e.json,r?this.fileList.length>0?(this.uploadData={taskId:a.taskId},setTimeout(function(){n.$refs.upload.submit()},1e3)):(this.$store.dispatch("disableGlobalLoading"),this.$store.dispatch("getProject",this.project._id),this.$emit("update:visible",!1),this.clearForm(),this.$message({type:"success",message:"Task Added!"})):(this.$store.dispatch("disableGlobalLoading"),this.$message({type:"error",message:s})),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log(t.t0);case 14:case"end":return t.stop()}},t,this,[[0,11]])}));return function(){return t.apply(this,arguments)}}(),onChange:function(t,e){this.fileList=e},onSuccess:function(){this.$store.dispatch("disableGlobalLoading"),this.$store.dispatch("getProject",this.project._id),this.$emit("update:visible",!1),this.clearForm(),this.$message({type:"success",message:"Task Added!"})},onError:function(){this.$store.dispatch("disableGlobalLoading"),this.$message({type:"error",message:"An error occured! make sure you are uploading files with the allowed extensions"})},clearForm:function(){this.task={title:"",description:"",deadline:"",users:[]},this.fileList=[],this.uploadData={},this.$refs.upload.clearFiles()},cancel:function(){this.$emit("update:visible",!1),this.clearForm()}},props:["visible"]},x=g,k=Object(p["a"])(x,f,b,!1,null,null,null),$=k.exports,j={data:function(){return{filterOn:!1,filter:"",addDialog:!1}},computed:{project:function(){return this.$store.state.project.currentProject},list:function(){var t=this;return this.project.lists.find(function(e){return e._id===t.$route.params.listId})},activeTasks:function(){var t=this;return this.list.tasks.filter(function(e){return e.title.includes(t.filter)&&"active"===e.state})},completedTasks:function(){var t=this;return this.list.tasks.filter(function(e){return e.title.includes(t.filter)&&"completed"===e.state})},missedTasks:function(){var t=this;return this.list.tasks.filter(function(e){return e.title.includes(t.filter)&&"missed"===e.state})}},components:{tasks:m,addTask:$},methods:{deleteList:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,r,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("Are you sure?","Delete List?",{confirmButtonText:"Delete",cancelButtonText:"Cancel",type:"warning"});case 3:return this.$store.dispatch("enableGlobalLoading"),t.next=6,this.$store.dispatch("deleteList",this.list._id);case 6:e=t.sent,r=e.status,s=e.message,this.$store.dispatch("disableGlobalLoading"),r?this.$router.push("/projects/"+this.project._id+"/lists"):this.$message({type:"error",message:s}),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),console.log(t.t0);case 16:case"end":return t.stop()}},t,this,[[0,13]])}));return function(){return t.apply(this,arguments)}}()}},_=j,w=Object(p["a"])(_,s,a,!1,null,null,null);e["default"]=w.exports},7514:function(t,e,r){"use strict";var s=r("5ca1"),a=r("0a49")(5),n="find",i=!0;n in[]&&Array(1)[n](function(){i=!1}),s(s.P+s.F*i,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),r("9c6c")(n)},7940:function(t,e,r){},cd1c:function(t,e,r){var s=r("e853");t.exports=function(t,e){return new(s(t))(e)}},d131:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-col",{attrs:{xs:24,sm:24,md:18,lg:18,xl:18}},[r("activity")],1),r("el-col",{attrs:{xs:24,sm:24,md:6,lg:6,xl:6}},[r("owner"),r("members")],1)],1)],1)},a=[],n=(r("cadf"),r("551c"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Recent Activities")])]),r("vue-perfect-scrollbar",{staticStyle:{height:"350px"}},t._l(30,function(t){return r("el-alert",{key:t,attrs:{title:t.toString(),type:"info",closable:!1}})}))],1)}),i=[],o=r("9d63"),l=r.n(o),c={computed:{project:function(){return this.$store.state.project.currentProject}},components:{VuePerfectScrollbar:l.a}},u=c,d=(r("01de"),r("2877")),p=Object(d["a"])(u,n,i,!1,null,"56a14466",null),h=p.exports,m=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Project Owner")]),t.project.owner.username===t.user.username?r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-delete"},on:{click:t.deleteProject}}):t._e()],1),r("el-table",{attrs:{data:[t.project.owner],"show-header":!1}},[r("el-table-column",{attrs:{width:"50"},scopedSlots:t._u([{key:"default",fn:function(t){return["none"===t.row.picture?r("img",{attrs:{src:"https://ui-avatars.com/api/?size=33&name="+t.row.name+"&rounded=true",align:"middle"}}):r("img",{staticStyle:{"object-fit":"cover","border-radius":"50%"},attrs:{src:t.row.picture,align:"middle",width:"33",height:"33"}})]}}])}),r("el-table-column",{attrs:{prop:"username"}})],1)],1)},f=[],b=(r("96cf"),r("3040")),v={computed:{project:function(){return this.$store.state.project.currentProject},user:function(){return this.$store.state.user.user}},methods:{deleteProject:function(){var t=Object(b["a"])(regeneratorRuntime.mark(function t(){var e,r,s,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$prompt("Enter Project Title","Delete Project",{confirmButtonText:"Delete",cancelButtonText:"Cancel",inputPattern:/\S/,inputErrorMessage:"Project Title is requeried"});case 3:if(e=t.sent,e.value!==this.project.title){t.next=15;break}return this.$store.dispatch("enableGlobalLoading"),t.next=8,this.$store.dispatch("deleteProject");case 8:r=t.sent,s=r.status,a=r.message,this.$store.dispatch("disableGlobalLoading"),s?this.$router.push("/"):this.$message({type:"error",message:a}),t.next=16;break;case 15:this.$message({type:"error",message:"Invalid Project Title"});case 16:t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](0),console.log(t.t0);case 21:case"end":return t.stop()}},t,this,[[0,18]])}));return function(){return t.apply(this,arguments)}}()}},g=v,x=Object(d["a"])(g,m,f,!1,null,null,null),k=x.exports,$=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("span",[t._v("Project Members")]),t.project.owner.username===t.user.username?r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-plus"},on:{click:t.addMember}}):t._e(),t.project.owner.username===t.user.username?r("el-button",{staticStyle:{float:"right",padding:"3px 10px"},attrs:{type:"text",icon:"el-icon-minus"},on:{click:t.removeMember}}):r("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text",icon:"el-icon-close"},on:{click:t.leaveProject}})],1),r("vue-perfect-scrollbar",{staticStyle:{height:"190px"}},[t.project.members.length>0?r("el-table",{attrs:{data:t.project.members,"show-header":!1}},[r("el-table-column",{attrs:{width:"50"},scopedSlots:t._u([{key:"default",fn:function(t){return["none"===t.row.picture?r("img",{attrs:{src:"https://ui-avatars.com/api/?size=33&name="+t.row.name+"&rounded=true",align:"middle"}}):r("img",{staticStyle:{"object-fit":"cover","border-radius":"50%"},attrs:{src:t.row.picture,align:"middle",width:"33",height:"33"}})]}}])}),r("el-table-column",{attrs:{prop:"username"}})],1):t._e()],1)],1)},j=[],_={computed:{project:function(){return this.$store.state.project.currentProject},user:function(){return this.$store.state.user.user}},methods:{addMember:function(){var t=Object(b["a"])(regeneratorRuntime.mark(function t(){var e,r,s,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$prompt("Enter Username","Add Member",{confirmButtonText:"Add",cancelButtonText:"Cancel",inputPattern:/\S/,inputErrorMessage:"Username is requeried"});case 3:return e=t.sent,this.$store.dispatch("enableGlobalLoading"),t.next=7,this.$store.dispatch("addMember",e.value);case 7:return r=t.sent,s=r.status,a=r.message,t.next=12,this.$store.dispatch("getProject",this.$route.params.id);case 12:this.$store.dispatch("disableGlobalLoading"),s?this.$message({type:"success",message:"Member Added!"}):this.$message({type:"error",message:a}),t.next=18;break;case 16:t.prev=16,t.t0=t["catch"](0);case 18:case"end":return t.stop()}},t,this,[[0,16]])}));return function(){return t.apply(this,arguments)}}(),removeMember:function(){var t=Object(b["a"])(regeneratorRuntime.mark(function t(){var e,r,s,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$prompt("Enter Username","Remove Member",{confirmButtonText:"Remove",cancelButtonText:"Cancel",inputPattern:/\S/,inputErrorMessage:"Username is requeried"});case 3:return e=t.sent,this.$store.dispatch("enableGlobalLoading"),t.next=7,this.$store.dispatch("removeMember",e.value);case 7:return r=t.sent,s=r.status,a=r.message,t.next=12,this.$store.dispatch("getProject",this.$route.params.id);case 12:this.$store.dispatch("disableGlobalLoading"),s?this.$message({type:"success",message:"Member Removed!"}):this.$message({type:"error",message:a}),t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](0),console.log(t.t0);case 19:case"end":return t.stop()}},t,this,[[0,16]])}));return function(){return t.apply(this,arguments)}}(),leaveProject:function(){var t=Object(b["a"])(regeneratorRuntime.mark(function t(){var e,r,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$confirm("Are you sure?","Leave Project?",{confirmButtonText:"Leave",cancelButtonText:"Cancel",type:"warning"});case 3:return this.$store.dispatch("enableGlobalLoading"),t.next=6,this.$store.dispatch("leaveProject");case 6:e=t.sent,r=e.status,s=e.message,this.$store.dispatch("disableGlobalLoading"),r?this.$router.push("/"):this.$message({type:"error",message:s}),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),console.log(t.t0);case 16:case"end":return t.stop()}},t,this,[[0,13]])}));return function(){return t.apply(this,arguments)}}()},components:{VuePerfectScrollbar:l.a}},w=_,y=Object(d["a"])(w,$,j,!1,null,null,null),L=y.exports,P={components:{activity:h,owner:k,members:L}},S=P,T=Object(d["a"])(S,s,a,!1,null,null,null);e["default"]=T.exports},e139:function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t._v("    \n  Chat, not implemented yet   \n")])},a=[],n={computed:{project:function(){return this.$store.state.project.currentProject}}},i=n,o=r("2877"),l=Object(o["a"])(i,s,a,!1,null,null,null);e["default"]=l.exports},e853:function(t,e,r){var s=r("d3f4"),a=r("1169"),n=r("2b4c")("species");t.exports=function(t){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)||(e=void 0),s(e)&&(e=e[n],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=project.66ef79e2.js.map