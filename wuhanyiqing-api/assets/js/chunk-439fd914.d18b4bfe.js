(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-439fd914"],{9407:function(e,t,a){},baa2:function(e,t,a){"use strict";var l=a("9407"),o=a.n(l);o.a},f9d6:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"welcome-root"},[a("div",{staticClass:"block"},[a("span",{staticClass:"demonstration"},[e._v("填报日期：")]),a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),a("div",{staticClass:"block"},[a("span",[e._v("记录状态：")]),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.valuel,callback:function(t){e.valuel=t},expression:"valuel"}},e._l(e.options,function(e){return a("el-option",{key:e.keepStatusCd,attrs:{label:e.keepStatusDesc,value:e.keepStatusCd}})}),1)],1),a("div",{staticClass:"block"},[a("el-button",{attrs:{type:"primary"},on:{click:e.getData}},[e._v("查询")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogTableVisible2=!0}}},[e._v("新增")]),a("el-button",{attrs:{type:"primary"}},[e._v("数据导入")]),a("el-button",{attrs:{type:"primary"}},[e._v("数据导出")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("提交")])],1),a("div",{staticClass:"Detail"},[a("p",{staticClass:"DetailTab"},[e._v("滞汉外地人清单")]),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),a("el-table-column",{attrs:{prop:"areaDesc",label:"行政区"}}),a("el-table-column",{attrs:{prop:"id",label:"序号"}}),a("el-table-column",{attrs:{prop:"detainedName",label:"姓名"}}),a("el-table-column",{attrs:{prop:"telephone",label:"电话",width:"110"}}),a("el-table-column",{attrs:{prop:"cardNumber",label:"身份证号","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"placeAreaDesc",label:"户籍地"}}),a("el-table-column",{attrs:{prop:"address",label:"当地居住地址","show-overflow-tooltip":"",width:"110"}}),a("el-table-column",{attrs:{prop:"detainedPersonTypeDesc",label:"滞留人员类型",width:"110"}}),a("el-table-column",{attrs:{prop:"resetMode",label:"安置方式","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"salveAmount",label:"救助金额"}}),a("el-table-column",{attrs:{prop:"salveDateStat",label:"救助开始日期",width:"110","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"salveDateEnd",label:"救助结束日期",width:"110","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"submitUser",label:"经办人"}}),a("el-table-column",{attrs:{prop:"orderName",label:"负责人"}}),a("el-table-column",{attrs:{prop:"keepstatusDesc",label:"记录状态"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleClick(t.row.id)}}},[e._v("详细")]),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("修改")])]}}])})],1)],1),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,50],"page-size":e.pageSize,total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),a("el-dialog",{attrs:{title:"修改",visible:e.dialogTableVisible1},on:{"update:visible":function(t){e.dialogTableVisible1=t}}},[a("el-form",{ref:"form",attrs:{model:e.form1}},[a("table",{staticClass:"tableList1",attrs:{border:""}},[a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"4"}},[e._v("滞汉外地人修改")])]),a("tr",[a("td",[e._v("姓名")]),a("td",[a("el-input",{model:{value:e.form1.detainedName,callback:function(t){e.$set(e.form1,"detainedName",t)},expression:"form1.detainedName"}})],1),a("td",[e._v("身份证号")]),a("td",[a("el-input",{on:{blur:function(t){return e.checkIdCard(e.form1.cardNumber)}},model:{value:e.form1.cardNumber,callback:function(t){e.$set(e.form1,"cardNumber",t)},expression:"form1.cardNumber"}})],1)]),a("tr",[a("td",[e._v("电话")]),a("td",[a("el-input",{on:{blur:function(t){return e.phoneNumber(e.form1.telephone)}},model:{value:e.form1.telephone,callback:function(t){e.$set(e.form1,"telephone",t)},expression:"form1.telephone"}})],1),a("td",[e._v("当地居住地址")]),a("td",[a("el-input",{model:{value:e.form1.address,callback:function(t){e.$set(e.form1,"address",t)},expression:"form1.address"}})],1)]),a("tr",[a("td",[e._v("滞留人员类型")]),a("td",[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form1.detainedPersonTypeCd,callback:function(t){e.$set(e.form1,"detainedPersonTypeCd",t)},expression:"form1.detainedPersonTypeCd"}},e._l(e.types,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),a("td",[e._v("安置方式")]),a("td",[a("el-input",{model:{value:e.form1.resetMode,callback:function(t){e.$set(e.form1,"resetMode",t)},expression:"form1.resetMode"}})],1)]),a("tr",[a("td",[e._v("救助开始日期")]),a("td",[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:e.form1.salveDateStat,callback:function(t){e.$set(e.form1,"salveDateStat",t)},expression:"form1.salveDateStat"}})],1),a("td",[e._v("救助结束日期")]),a("td",[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:e.form1.salveDateEnd,callback:function(t){e.$set(e.form1,"salveDateEnd",t)},expression:"form1.salveDateEnd"}})],1)]),a("tr",[a("td",[e._v("救助金额")]),a("td",[a("el-input",{on:{blur:function(t){return e.isRealNum(e.form1.salveAmount)}},model:{value:e.form1.salveAmount,callback:function(t){e.$set(e.form1,"salveAmount",t)},expression:"form1.salveAmount"}})],1),a("td",[e._v("户籍地")]),a("td",[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form1.placeAreaCd,callback:function(t){e.$set(e.form1,"placeAreaCd",t)},expression:"form1.placeAreaCd"}},e._l(e.cityArr,function(e){return a("el-option",{key:e.areaCd,attrs:{label:e.areaDesc,value:e.areaCd}})}),1)],1)]),a("tr",[a("td",[e._v("负责人")]),a("td",{attrs:{colspan:"4"}},[a("el-input",{model:{value:e.form1.orderName,callback:function(t){e.$set(e.form1,"orderName",t)},expression:"form1.orderName"}})],1)]),a("tr",[a("td",[e._v("备注")]),a("td",{attrs:{colspan:"4"}},[a("el-input",{model:{value:e.form1.bz,callback:function(t){e.$set(e.form1,"bz",t)},expression:"form1.bz"}})],1)])])])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveChange()}}},[e._v("保存")]),a("el-button",{on:{click:function(t){e.dialogTableVisible1=!1}}},[e._v("放弃")])],1)],1),a("el-dialog",{attrs:{title:"新增",visible:e.dialogTableVisible2},on:{"update:visible":function(t){e.dialogTableVisible2=t}}},[a("el-form",{ref:"form",attrs:{model:e.form2}},[a("table",{staticClass:"tableList1",attrs:{border:""}},[a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"4"}},[e._v("滞汉外地人新增")])]),a("tr",[a("td",[e._v("姓名")]),a("td",[a("el-input",{model:{value:e.form2.detainedName,callback:function(t){e.$set(e.form2,"detainedName",t)},expression:"form2.detainedName"}})],1),a("td",[e._v("身份证号")]),a("td",[a("el-input",{on:{blur:function(t){return e.checkIdCard(e.form2.cardNumber)}},model:{value:e.form2.cardNumber,callback:function(t){e.$set(e.form2,"cardNumber",t)},expression:"form2.cardNumber"}})],1)]),a("tr",[a("td",[e._v("电话")]),a("td",[a("el-input",{on:{blur:function(t){return e.phoneNumber(e.form2.telephone)}},model:{value:e.form2.telephone,callback:function(t){e.$set(e.form2,"telephone",t)},expression:"form2.telephone"}})],1),a("td",[e._v("当地居住地址")]),a("td",[a("el-input",{model:{value:e.form2.address,callback:function(t){e.$set(e.form2,"address",t)},expression:"form2.address"}})],1)]),a("tr",[a("td",[e._v("滞留人员类型")]),a("td",[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form2.detainedPersonTypeCd,callback:function(t){e.$set(e.form2,"detainedPersonTypeCd",t)},expression:"form2.detainedPersonTypeCd"}},e._l(e.types,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),a("td",[e._v("安置方式")]),a("td",[a("el-input",{model:{value:e.form2.resetMode,callback:function(t){e.$set(e.form2,"resetMode",t)},expression:"form2.resetMode"}})],1)]),a("tr",[a("td",[e._v("救助开始日期")]),a("td",[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:e.form2.salveDateStat,callback:function(t){e.$set(e.form2,"salveDateStat",t)},expression:"form2.salveDateStat"}})],1),a("td",[e._v("救助结束日期")]),a("td",[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择日期"},model:{value:e.form2.salveDateEnd,callback:function(t){e.$set(e.form2,"salveDateEnd",t)},expression:"form2.salveDateEnd"}})],1)]),a("tr",[a("td",[e._v("救助金额")]),a("td",[a("el-input",{on:{blur:function(t){return e.isRealNum(e.form2.salveAmount)}},model:{value:e.form2.salveAmount,callback:function(t){e.$set(e.form2,"salveAmount",t)},expression:"form2.salveAmount"}})],1),a("td",[e._v("户籍地")]),a("td",[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form2.placeAreaCd,callback:function(t){e.$set(e.form2,"placeAreaCd",t)},expression:"form2.placeAreaCd"}},e._l(e.cityArr,function(e){return a("el-option",{key:e.areaCd,attrs:{label:e.areaDesc,value:e.areaCd}})}),1)],1)]),a("tr",[a("td",[e._v("负责人")]),a("td",{attrs:{colspan:"4"}},[a("el-input",{model:{value:e.form2.orderName,callback:function(t){e.$set(e.form2,"orderName",t)},expression:"form2.orderName"}})],1)]),a("tr",[a("td",[e._v("备注")]),a("td",{attrs:{colspan:"4"}},[a("el-input",{model:{value:e.form2.bz,callback:function(t){e.$set(e.form2,"bz",t)},expression:"form2.bz"}})],1)])])])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveNew()}}},[e._v("保存")]),a("el-button",{on:{click:function(t){e.dialogTableVisible2=!1}}},[e._v("放弃")])],1)],1),a("el-dialog",{attrs:{title:"详情",visible:e.dialogTableVisible3},on:{"update:visible":function(t){e.dialogTableVisible3=t}}},[a("table",{staticClass:"tableList1",attrs:{border:""}},[a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"center"},attrs:{colspan:"4"}},[e._v("滞汉外地人详细信息")])]),a("tr",[a("td",{attrs:{width:"15%"}},[e._v("序号")]),a("td",{attrs:{width:"35%"}},[e._v(e._s(e.info.id))]),a("td",{attrs:{width:"15%"}},[e._v("行政区")]),a("td",{attrs:{width:"35%"}},[e._v(e._s(e.info.areaDesc))])]),a("tr",[a("td",{attrs:{width:"15%"}},[e._v("姓名")]),a("td",{attrs:{width:"35%"}},[e._v(e._s(e.info.detainedName))]),a("td",{attrs:{width:"15%"}},[e._v("身份证号")]),a("td",{attrs:{width:"35%"}},[e._v(e._s(e.info.cardNumber))])]),a("tr",[a("td",[e._v("电话")]),a("td",[e._v(e._s(e.info.telephone))]),a("td",[e._v("当地居住地址")]),a("td",[e._v(e._s(e.info.address))])]),a("tr",[a("td",[e._v("滞留人员类型")]),a("td",[e._v(e._s(e.info.detainedPersonTypeDesc))]),a("td",[e._v("户籍地")]),a("td",[e._v(e._s(e.info.placeAreaDesc))])]),a("tr",[a("td",[e._v("安置方式")]),a("td",[e._v(e._s(e.info.resetMode))]),a("td",[e._v("目的城市")]),a("td",[e._v(e._s(e.info.destCity))])]),a("tr",[a("td",[e._v("救助开始日期")]),a("td",[e._v(e._s(e.info.salveDateStat))]),a("td",[e._v("救助结束日期")]),a("td",[e._v(e._s(e.info.salveDateEnd))])]),a("tr",[a("td",[e._v("救助金额")]),a("td",[e._v(e._s(e.info.salveAmount))]),a("td",[e._v("记录状态")]),a("td",[e._v(e._s(e.info.keepstatusDesc))])]),a("tr",[a("td",[e._v("经办人")]),a("td",[e._v(e._s(e.info.submitUser))]),a("td",[e._v("负责人")]),a("td",[e._v(e._s(e.info.orderName))])]),a("tr",[a("td",[e._v("审核人")]),a("td",[e._v(e._s(e.info.reviewUser))]),a("td",[e._v("更新时间")]),a("td",[e._v(e._s(e.info.uptDate))])]),a("tr",[a("td",[e._v("录入时间")]),a("td",{attrs:{colspan:"4"}},[e._v(e._s(e.info.submitDate))])]),a("tr",[a("td",[e._v("备注")]),a("td",{attrs:{colspan:"4"}},[e._v(e._s(e.info.bz))])])])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible3=!1}}},[e._v("返回")])],1)])],1)},o=[],r={name:"Welcome",data:function(){return{value1:"",valuel:1,options:[],tableData:[],multipleSelection:[],dialogTableVisible1:!1,dialogTableVisible2:!1,dialogTableVisible3:!1,info:{},form:{},form1:{detainedName:"",cardNumber:"",telephone:"",address:"",resetMode:"",salveDateStat:"",salveDateEnd:"",salveAmount:"",placeAreaCd:"",orderName:"",areaCd:"",bz:"",detainedPersonTypeCd:""},form2:{detainedName:"",cardNumber:"",telephone:"",address:"",resetMode:"",salveDateStat:"",salveDateEnd:"",salveAmount:"",placeAreaCd:"",orderName:"",areaCd:"",bz:"",detainedPersonTypeCd:""},types:[{value:0,label:"全部"},{value:1,label:"学生"},{value:2,label:"务工经商人员"},{value:3,label:"旅游"},{value:4,label:"投亲靠友"},{value:5,label:"来汉就医"},{value:6,label:"居无定所"},{value:7,label:"其他人员"}],cityArr:[],areaArr:[],currentPage:1,pageSize:10,pageIndex:1,totalCount:0}},created:function(){this.recordStatus(),this.getData(),this.getCity(),this.areaDesc()},components:{},methods:{handleUpdate:function(e){console.log(e),"2"!==e.keepStatusCd?(this.dialogTableVisible1=!0,e.areaCd=parseInt(e.areaCd),e.detainedPersonTypeCd=parseInt(e.detainedPersonTypeCd),this.form1=e):this.$message("不能修改提交状态的数据")},recordStatus:function(){var e=this;this.$http({url:this.$http.adornUrl("/base/keepstatus/getStatus"),method:"get"}).then(function(t){e.options=t.data.data,e.valuel=e.options[0].keepStatusCd})},getData:function(){var e=this;this.$http({url:this.$http.adornUrl("/dataInto/pageList?keepStatusCd=".concat(this.valuel,"&submitDate=").concat(this.value1,"&pageIndex=").concat(this.pageIndex,"&pageSize=").concat(this.pageSize)),method:"get"}).then(function(t){console.log(t),e.tableData=t.data.page.list,e.pageSize=t.data.page.pageSize,e.totalCount=t.data.page.totalCount})},handleSizeChange:function(e){this.pageSize=e,this.getData()},handleCurrentChange:function(e){this.pageIndex=e,this.getData()},handleClick:function(e){var t=this;this.$http({url:this.$http.adornUrl("/dataInto/info/"+e),method:"get"}).then(function(e){e.data.code||(t.dialogTableVisible3=!0,t.info=e.data.t01DetainedPersonInfo)})},handleSelectionChange:function(e){this.multipleSelection=e,console.log(this.multipleSelection)},saveChange:function(){var e=this;this.$http({url:this.$http.adornUrl("/dataInto/updateInfo"),method:"post",data:this.$http.adornData(this.form1)}).then(function(t){t.data.code?e.$message({message:"修改失败",type:"error"}):(e.$message({message:"修改成功",type:"success"}),e.dialogTableVisible1=!1,e.form1=JSON.parse(JSON.stringify(e.form)),e.getData())})},saveNew:function(){var e=this;""!=this.form2.detainedName&&""!=this.form2.cardNumber&&""!=this.form2.telephone&&""!=this.form2.address&&""!=this.form2.resetMode?(console.log(this.userInfo),this.$http({url:this.$http.adornUrl("/dataInto/save"),method:"post",data:this.$http.adornData(this.form2)}).then(function(t){t.data.code?e.$message({message:"新增失败",type:"error"}):(e.$message({message:"新增成功",type:"success"}),e.dialogTableVisible2=!1,e.form2=JSON.parse(JSON.stringify(e.form)),e.getData())})):this.$message({message:"请完整填写表格",type:"error"})},submit:function(){var e=this;1!=this.multipleSelection.length?this.$message({message:"请选择一条数据",type:"info"}):this.$http({url:this.$http.adornUrl("/dataInto/updateStatus/".concat(this.multipleSelection[0].id,"?keepStatusCd=",2)),method:"post"}).then(function(t){e.$message({message:"提交成功",type:"success"}),e.getData()})},getCity:function(){var e=this;this.$http({url:this.$http.adornUrl("/base/area/getData"),method:"get"}).then(function(t){e.cityArr=t.data.data})},areaDesc:function(){var e=this;this.$http({url:this.$http.adornUrl("/base/wuhanArea/getData"),method:"get"}).then(function(t){e.areaArr=t.data.data,e.areaArr.push({orgId:420101e6,name:"武汉市"})})},checkIdCard:function(e){var t=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;return!!t.test(e)||(this.$message.error("身份证号填写有误"),!1)},phoneNumber:function(e){var t=/^[1][3,4,5,7,8,9][0-9]{9}$/;return!!t.test(e)||(this.$message.error("手机号填写有误"),!1)},isRealNum:function(e){var t=/^(([1-9]\d*)|\d)(\.\d{1,2})?$/;return!!t.test(e)||(this.$message.error("金额格式有误"),!1)}},computed:{userInfo:function(){var e=JSON.parse(JSON.stringify(this.$store.state.user.userInfo));return e.orgIdCode=parseInt(e.orgId),e}},mounted:function(){this.form=JSON.parse(JSON.stringify(this.form1))}},s=r,n=(a("baa2"),a("2877")),i=Object(n["a"])(s,l,o,!1,null,"7c53611e",null);t["default"]=i.exports}}]);
//# sourceMappingURL=chunk-439fd914.d18b4bfe.js.map