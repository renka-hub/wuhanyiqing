(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b0d8affe","chunk-2d0c953e","chunk-2d0f1561"],{5959:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"100px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"bean名称",prop:"beanName"}},[a("el-input",{attrs:{placeholder:"spring bean名称, 如: testTask"},model:{value:e.dataForm.beanName,callback:function(t){e.$set(e.dataForm,"beanName",t)},expression:"dataForm.beanName"}})],1),a("el-form-item",{attrs:{label:"方法名称",prop:"methodName"}},[a("el-input",{attrs:{placeholder:"方法名称"},model:{value:e.dataForm.methodName,callback:function(t){e.$set(e.dataForm,"methodName",t)},expression:"dataForm.methodName"}})],1),a("el-form-item",{attrs:{label:"参数",prop:"params"}},[a("el-input",{attrs:{placeholder:"参数"},model:{value:e.dataForm.params,callback:function(t){e.$set(e.dataForm,"params",t)},expression:"dataForm.params"}})],1),a("el-form-item",{attrs:{label:"cron表达式",prop:"cronExpression"}},[a("el-input",{attrs:{placeholder:"如: 0 0 12 * * ?"},model:{value:e.dataForm.cronExpression,callback:function(t){e.$set(e.dataForm,"cronExpression",t)},expression:"dataForm.cronExpression"}})],1),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:e.dataForm.remark,callback:function(t){e.$set(e.dataForm,"remark",t)},expression:"dataForm.remark"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},r=[],s={data:function(){return{visible:!1,dataForm:{id:0,beanName:"",methodName:"",params:"",cronExpression:"",remark:"",status:0},dataRule:{beanName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],methodName:[{required:!0,message:"方法名称不能为空",trigger:"blur"}],cronExpression:[{required:!0,message:"cron表达式不能为空",trigger:"blur"}]}}},methods:{init:function(e){var t=this;this.dataForm.id=e||0,this.visible=!0,this.$nextTick(function(){t.$refs["dataForm"].resetFields(),t.dataForm.id&&t.$http({url:t.$http.adornUrl("/sys/schedule/info/".concat(t.dataForm.id)),method:"get",params:t.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.beanName=a.schedule.beanName,t.dataForm.methodName=a.schedule.methodName,t.dataForm.params=a.schedule.params,t.dataForm.cronExpression=a.schedule.cronExpression,t.dataForm.remark=a.schedule.remark,t.dataForm.status=a.schedule.status)})})},dataFormSubmit:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&e.$http({url:e.$http.adornUrl("/sys/schedule/".concat(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData({jobId:e.dataForm.id||void 0,beanName:e.dataForm.beanName,methodName:e.dataForm.methodName,params:e.dataForm.params,cronExpression:e.dataForm.cronExpression,remark:e.dataForm.remark,status:e.dataForm.id?e.dataForm.status:void 0})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},i=s,o=a("2877"),l=Object(o["a"])(i,n,r,!1,null,null,null);t["default"]=l.exports},"975e":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-schedule"},[a("el-form",{attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"bean名称",clearable:""},model:{value:e.dataForm.beanName,callback:function(t){e.$set(e.dataForm,"beanName",t)},expression:"dataForm.beanName"}})],1),a("el-form-item",[a("el-button",{on:{click:function(t){return e.getDataList()}}},[e._v("查询")]),e.isAuth("sys:schedule:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addOrUpdateHandle()}}},[e._v("新增")]):e._e(),e.isAuth("sys:schedule:delete")?a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){return e.deleteHandle()}}},[e._v("批量删除")]):e._e(),e.isAuth("sys:schedule:pause")?a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){return e.pauseHandle()}}},[e._v("批量暂停")]):e._e(),e.isAuth("sys:schedule:resume")?a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){return e.resumeHandle()}}},[e._v("批量恢复")]):e._e(),e.isAuth("sys:schedule:run")?a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){return e.runHandle()}}},[e._v("批量立即执行")]):e._e(),e.isAuth("sys:schedule:log")?a("el-button",{attrs:{type:"success"},on:{click:function(t){return e.logHandle()}}},[e._v("日志列表")]):e._e()],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),a("el-table-column",{attrs:{prop:"jobId","header-align":"center",align:"center",width:"80",label:"ID"}}),a("el-table-column",{attrs:{prop:"beanName","header-align":"center",align:"center",label:"bean名称"}}),a("el-table-column",{attrs:{prop:"methodName","header-align":"center",align:"center",label:"方法名称"}}),a("el-table-column",{attrs:{prop:"params","header-align":"center",align:"center",label:"参数"}}),a("el-table-column",{attrs:{prop:"cronExpression","header-align":"center",align:"center",label:"cron表达式"}}),a("el-table-column",{attrs:{prop:"remark","header-align":"center",align:"center",label:"备注"}}),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("el-tag",{attrs:{size:"small"}},[e._v("正常")]):a("el-tag",{attrs:{size:"small",type:"danger"}},[e._v("暂停")])]}}])}),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isAuth("sys:schedule:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.addOrUpdateHandle(t.row.jobId)}}},[e._v("修改")]):e._e(),e.isAuth("sys:schedule:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.deleteHandle(t.row.jobId)}}},[e._v("删除")]):e._e(),e.isAuth("sys:schedule:pause")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.pauseHandle(t.row.jobId)}}},[e._v("暂停")]):e._e(),e.isAuth("sys:schedule:resume")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.resumeHandle(t.row.jobId)}}},[e._v("恢复")]):e._e(),e.isAuth("sys:schedule:run")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.runHandle(t.row.jobId)}}},[e._v("立即执行")]):e._e()]}}])})],1),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e(),e.logVisible?a("log",{ref:"log"}):e._e()],1)},r=[],s=a("5959"),i=a("9fca"),o={data:function(){return{dataForm:{beanName:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,logVisible:!1}},components:{AddOrUpdate:s["default"],Log:i["default"]},activated:function(){this.getDataList()},methods:{getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/schedule/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,beanName:this.dataForm.beanName})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.jobId});this.$confirm("确定对[id=".concat(a.join(","),"]进行[").concat(e?"删除":"批量删除","]操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/schedule/delete"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})},pauseHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.jobId});this.$confirm("确定对[id=".concat(a.join(","),"]进行[").concat(e?"暂停":"批量暂停","]操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/schedule/pause"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})},resumeHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.jobId});this.$confirm("确定对[id=".concat(a.join(","),"]进行[").concat(e?"恢复":"批量恢复","]操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/schedule/resume"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})},runHandle:function(e){var t=this,a=e?[e]:this.dataListSelections.map(function(e){return e.jobId});this.$confirm("确定对[id=".concat(a.join(","),"]进行[").concat(e?"立即执行":"批量立即执行","]操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/schedule/run"),method:"post",data:t.$http.adornData(a,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})},logHandle:function(){var e=this;this.logVisible=!0,this.$nextTick(function(){e.$refs.log.init()})}}},l=o,d=a("2877"),c=Object(d["a"])(l,n,r,!1,null,null,null);t["default"]=c.exports},"9fca":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"日志列表","close-on-click-modal":!1,visible:e.visible,width:"75%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"任务ID",clearable:""},model:{value:e.dataForm.id,callback:function(t){e.$set(e.dataForm,"id",t)},expression:"dataForm.id"}})],1),a("el-form-item",[a("el-button",{on:{click:function(t){return e.getDataList()}}},[e._v("查询")])],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:"",height:"460"}},[a("el-table-column",{attrs:{prop:"logId","header-align":"center",align:"center",width:"80",label:"日志ID"}}),a("el-table-column",{attrs:{prop:"jobId","header-align":"center",align:"center",width:"80",label:"任务ID"}}),a("el-table-column",{attrs:{prop:"beanName","header-align":"center",align:"center",label:"bean名称"}}),a("el-table-column",{attrs:{prop:"methodName","header-align":"center",align:"center",label:"方法名称"}}),a("el-table-column",{attrs:{prop:"params","header-align":"center",align:"center",label:"参数"}}),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("el-tag",{attrs:{size:"small"}},[e._v("成功")]):a("el-tag",{staticStyle:{cursor:"pointer"},attrs:{size:"small",type:"danger"},nativeOn:{click:function(a){return e.showErrorInfo(t.row.logId)}}},[e._v("失败")])]}}])}),a("el-table-column",{attrs:{prop:"times","header-align":"center",align:"center",label:"耗时(单位: 毫秒)"}}),a("el-table-column",{attrs:{prop:"createTime","header-align":"center",align:"center",width:"180",label:"执行时间"}})],1),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}})],1)},r=[],s={data:function(){return{visible:!1,dataForm:{id:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1}},methods:{init:function(){this.visible=!0,this.getDataList()},getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/scheduleLog/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,jobId:this.dataForm.id})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},showErrorInfo:function(e){var t=this;this.$http({url:this.$http.adornUrl("/sys/scheduleLog/info/".concat(e)),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code?t.$alert(a.log.error):t.$message.error(a.msg)})}}},i=s,o=a("2877"),l=Object(o["a"])(i,n,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-b0d8affe.79939839.js.map