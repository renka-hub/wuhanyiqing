(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aeb2a"],{"0abe":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"角色名称",prop:"roleName"}},[a("el-input",{attrs:{placeholder:"角色名称"},model:{value:e.dataForm.roleName,callback:function(t){e.$set(e.dataForm,"roleName",t)},expression:"dataForm.roleName"}})],1),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{placeholder:"备注"},model:{value:e.dataForm.remark,callback:function(t){e.$set(e.dataForm,"remark",t)},expression:"dataForm.remark"}})],1),a("el-form-item",{attrs:{size:"mini",label:"授权"}},[a("el-tree",{ref:"menuListTree",attrs:{data:e.menuList,props:e.menuListTreeProps,"node-key":"menuId","default-expand-all":!0,"show-checkbox":""}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},o=[],n=a("ed08"),s={data:function(){return{visible:!1,menuList:[],menuListTreeProps:{label:"name",children:"children"},dataForm:{id:0,roleName:"",remark:""},dataRule:{roleName:[{required:!0,message:"角色名称不能为空",trigger:"blur"}]},tempKey:-666666}},methods:{init:function(e){var t=this;this.dataForm.id=e||0,this.$http({url:this.$http.adornUrl("/sys/menu/list"),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;t.menuList=Object(n["d"])(a.data,"menuId")}).then(function(){t.visible=!0,t.$nextTick(function(){t.$refs["dataForm"].resetFields(),t.$refs.menuListTree.setCheckedKeys([])})}).then(function(){t.dataForm.id&&t.$http({url:t.$http.adornUrl("/sys/role/info/".concat(t.dataForm.id)),method:"get",params:t.$http.adornParams()}).then(function(e){var a=e.data;if(a&&0===a.code){t.dataForm.roleName=a.role.roleName,t.dataForm.remark=a.role.remark;var r=a.role.menuIdList.indexOf(t.tempKey);-1!==r&&a.role.menuIdList.splice(r,a.role.menuIdList.length-r),t.$refs.menuListTree.setCheckedKeys(a.role.menuIdList)}})})},dataFormSubmit:function(){var e=this;this.$refs["dataForm"].validate(function(t){t&&e.$http({url:e.$http.adornUrl("/sys/role/".concat(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData({roleId:e.dataForm.id||void 0,roleName:e.dataForm.roleName,remark:e.dataForm.remark,menuIdList:[].concat(e.$refs.menuListTree.getCheckedKeys(),[e.tempKey],e.$refs.menuListTree.getHalfCheckedKeys())})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},i=s,l=a("2877"),m=Object(l["a"])(i,r,o,!1,null,null,null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d0aeb2a.4511ee4d.js.map