(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a5d92f9","chunk-c6eca984"],{"1edd":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-menu"},[a("el-form",{attrs:{inline:!0,model:t.dataForm}},[a("el-form-item",[t.isAuth("sys:menu:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addOrUpdateHandle()}}},[t._v("新增")]):t._e()],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,border:"","row-key":"menuId"}},[a("el-table-column",{attrs:{prop:"name","header-align":"center",align:"center",width:"150",label:"名称"}}),a("el-table-column",{attrs:{prop:"parentName","header-align":"center",align:"center",width:"100",label:"上级菜单"}}),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"图标"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("icon-svg",{attrs:{name:t.row.icon||""}})]}}])}),a("el-table-column",{attrs:{prop:"type","header-align":"center",align:"center",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.type?a("el-tag",{attrs:{size:"small"}},[t._v("目录")]):1===e.row.type?a("el-tag",{attrs:{size:"small",type:"success"}},[t._v("菜单")]):2===e.row.type?a("el-tag",{attrs:{size:"small",type:"info"}},[t._v("按钮")]):t._e()]}}])}),a("el-table-column",{attrs:{prop:"orderNum","header-align":"center",align:"center",label:"排序号"}}),a("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"菜单URL"}}),a("el-table-column",{attrs:{prop:"perms","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"授权标识"}}),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isAuth("sys:menu:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.addOrUpdateHandle(e.row.menuId)}}},[t._v("修改")]):t._e(),t.isAuth("sys:menu:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteHandle(e.row.menuId)}}},[t._v("删除")]):t._e()]}}])})],1),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},n=[],o=a("f4b3"),i=a("305b"),s=a("ed08"),l={data:function(){return{dataForm:{},dataList:[],dataListLoading:!1,addOrUpdateVisible:!1}},components:{TableTreeColumn:o["a"],AddOrUpdate:i["default"]},activated:function(){this.getDataList()},methods:{getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/menu/list"),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;t.dataList=Object(s["d"])(a.data,"menuId","parentId"),t.dataListLoading=!1})},addOrUpdateHandle:function(t){var e=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})},deleteHandle:function(t){var e=this;this.$confirm("确定对[id=".concat(t,"]进行[删除]操作?"),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:e.$http.adornUrl("/sys/menu/delete/".concat(t)),method:"post",data:e.$http.adornData()}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.getDataList()}}):e.$message.error(a.msg)})}).catch(function(){})}}},d=l,c=(a("c65d"),a("2877")),u=Object(c["a"])(d,r,n,!1,null,null,null);e["default"]=u.exports},"305b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"类型",prop:"type"}},[a("el-radio-group",{model:{value:t.dataForm.type,callback:function(e){t.$set(t.dataForm,"type",e)},expression:"dataForm.type"}},t._l(t.dataForm.typeList,function(e,r){return a("el-radio",{key:r,attrs:{label:r}},[t._v(t._s(e))])}),1)],1),a("el-form-item",{attrs:{label:t.dataForm.typeList[t.dataForm.type]+"名称",prop:"name"}},[a("el-input",{attrs:{placeholder:t.dataForm.typeList[t.dataForm.type]+"名称"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),a("el-form-item",{attrs:{label:"上级菜单",prop:"parentName"}},[a("el-popover",{ref:"menuListPopover",attrs:{placement:"bottom-start",trigger:"click"}},[a("el-tree",{ref:"menuListTree",attrs:{data:t.menuList,props:t.menuListTreeProps,"node-key":"menuId","default-expand-all":!0,"highlight-current":!0,"expand-on-click-node":!1},on:{"current-change":t.menuListTreeCurrentChangeHandle}})],1),a("el-input",{directives:[{name:"popover",rawName:"v-popover:menuListPopover",arg:"menuListPopover"}],staticClass:"menu-list__input",attrs:{readonly:!0,placeholder:"点击选择上级菜单"},model:{value:t.dataForm.parentName,callback:function(e){t.$set(t.dataForm,"parentName",e)},expression:"dataForm.parentName"}})],1),1===t.dataForm.type?a("el-form-item",{attrs:{label:"菜单路由",prop:"url"}},[a("el-input",{attrs:{placeholder:"菜单路由"},model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1):t._e(),0!==t.dataForm.type?a("el-form-item",{attrs:{label:"授权标识",prop:"perms"}},[a("el-input",{attrs:{placeholder:"多个用逗号分隔, 如: user:list,user:create"},model:{value:t.dataForm.perms,callback:function(e){t.$set(t.dataForm,"perms",e)},expression:"dataForm.perms"}})],1):t._e(),2!==t.dataForm.type?a("el-form-item",{attrs:{label:"排序号",prop:"orderNum"}},[a("el-input-number",{attrs:{"controls-position":"right",min:0,label:"排序号"},model:{value:t.dataForm.orderNum,callback:function(e){t.$set(t.dataForm,"orderNum",e)},expression:"dataForm.orderNum"}})],1):t._e(),2!==t.dataForm.type?a("el-form-item",{attrs:{label:"菜单图标",prop:"icon"}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-popover",{ref:"iconListPopover",attrs:{placement:"bottom-start",trigger:"click","popper-class":"mod-menu__icon-popover"}},[a("div",{staticClass:"mod-menu__icon-list"},t._l(t.iconList,function(e,r){return a("el-button",{key:r,class:{"is-active":e===t.dataForm.icon},on:{click:function(a){return t.iconActiveHandle(e)}}},[a("icon-svg",{attrs:{name:e}})],1)}),1)]),a("el-input",{directives:[{name:"popover",rawName:"v-popover:iconListPopover",arg:"iconListPopover"}],staticClass:"icon-list__input",attrs:{readonly:!0,placeholder:"菜单图标名称"},model:{value:t.dataForm.icon,callback:function(e){t.$set(t.dataForm,"icon",e)},expression:"dataForm.icon"}})],1),a("el-col",{staticClass:"icon-list__tips",attrs:{span:2}},[a("el-tooltip",{attrs:{placement:"top",effect:"light"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t._v("全站推荐使用SVG Sprite, 详细请参考:"),a("a",{attrs:{href:"//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js",target:"_blank"}},[t._v("icons/index.js")]),t._v("描述")]),a("i",{staticClass:"el-icon-warning"})])],1)],1)],1):t._e()],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},n=[],o=(a("7f7f"),a("ed08")),i=a("985d"),s={data:function(){var t=this,e=function(e,a,r){1!==t.dataForm.type||/\S/.test(a)?r():r(new Error("菜单URL不能为空"))};return{visible:!1,dataForm:{id:0,type:1,typeList:["目录","菜单","按钮"],name:"",parentId:0,parentName:"",url:"",perms:"",orderNum:0,icon:"",iconList:[]},dataRule:{name:[{required:!0,message:"菜单名称不能为空",trigger:"blur"}],parentName:[{required:!0,message:"上级菜单不能为空",trigger:"change"}],url:[{validator:e,trigger:"blur"}]},menuList:[],menuListTreeProps:{label:"name",children:"children"}}},created:function(){this.iconList=i["a"].getNameList()},methods:{init:function(t){var e=this;this.dataForm.id=t||0,this.$http({url:this.$http.adornUrl("/sys/menu/select"),method:"get",params:this.$http.adornParams()}).then(function(t){var a=t.data;e.menuList=Object(o["d"])(a.menuList,"menuId")}).then(function(){e.visible=!0,e.$nextTick(function(){e.$refs["dataForm"].resetFields()})}).then(function(){e.dataForm.id?e.$http({url:e.$http.adornUrl("/sys/menu/info/".concat(e.dataForm.id)),method:"get",params:e.$http.adornParams()}).then(function(t){var a=t.data;e.dataForm.id=a.menu.menuId,e.dataForm.type=a.menu.type,e.dataForm.name=a.menu.name,e.dataForm.parentId=a.menu.parentId,e.dataForm.url=a.menu.url,e.dataForm.perms=a.menu.perms,e.dataForm.orderNum=a.menu.orderNum,e.dataForm.icon=a.menu.icon,e.menuListTreeSetCurrentNode()}):e.menuListTreeSetCurrentNode()})},menuListTreeCurrentChangeHandle:function(t,e){this.dataForm.parentId=t.menuId,this.dataForm.parentName=t.name},menuListTreeSetCurrentNode:function(){this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId),this.dataForm.parentName=(this.$refs.menuListTree.getCurrentNode()||{})["name"]},iconActiveHandle:function(t){this.dataForm.icon=t},dataFormSubmit:function(){var t=this;this.$refs["dataForm"].validate(function(e){e&&t.$http({url:t.$http.adornUrl("/sys/menu/".concat(t.dataForm.id?"update":"save")),method:"post",data:t.$http.adornData({menuId:t.dataForm.id||void 0,type:t.dataForm.type,name:t.dataForm.name,parentId:t.dataForm.parentId,url:t.dataForm.url,perms:t.dataForm.perms,orderNum:t.dataForm.orderNum,icon:t.dataForm.icon})}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(a.msg)})})}}},l=s,d=(a("ed78"),a("2877")),c=Object(d["a"])(l,r,n,!1,null,null,null);e["default"]=c.exports},9451:function(t,e,a){},c65d:function(t,e,a){"use strict";var r=a("9451"),n=a.n(r);n.a},d6d1:function(t,e,a){},ed78:function(t,e,a){"use strict";var r=a("d6d1"),n=a.n(r);n.a},f4b3:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table-column",t._b({attrs:{prop:t.prop},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{style:t.childStyles(e.row),on:{click:function(a){return a.preventDefault(),t.toggleHandle(e.$index,e.row)}}},[a("i",{class:t.iconClasses(e.row),style:t.iconStyles(e.row)}),t._v("\n      "+t._s(e.row[t.prop])+"\n    ")])]}}])},"el-table-column",t.$attrs,!1))},n=[],o=a("6747"),i=a.n(o),s={name:"table-tree-column",props:{prop:{type:String},treeKey:{type:String,default:"id"},parentKey:{type:String,default:"parentId"},levelKey:{type:String,default:"_level"},childKey:{type:String,default:"children"}},methods:{childStyles:function(t){return{"padding-left":(t[this.levelKey]>1?7*t[this.levelKey]:0)+"px"}},iconClasses:function(t){return[t._expanded?"el-icon-caret-bottom":"el-icon-caret-right"]},iconStyles:function(t){return{visibility:this.hasChild(t)?"visible":"hidden"}},hasChild:function(t){return i()(t[this.childKey])&&t[this.childKey].length>=1||!1},toggleHandle:function(t,e){var a=this;if(this.hasChild(e)){var r=this.$parent.store.states.data.slice(0);r[t]._expanded=!r[t]._expanded,r=r[t]._expanded?r.splice(0,t+1).concat(e[this.childKey]).concat(r):this.removeChildNode(r,e[this.treeKey]),this.$parent.store.commit("setData",r),this.$nextTick(function(){a.$parent.doLayout()})}},removeChildNode:function(t,e){var a=i()(e)?e:[e];if(e.length<=0)return t;for(var r=[],n=0;n<t.length;n++)-1!==a.indexOf(t[n][this.parentKey])&&-1===a.indexOf(t[n][this.treeKey])&&(r.push(t.splice(n,1)[0][this.treeKey]),n--);return this.removeChildNode(t,r)}}},l=s,d=a("2877"),c=Object(d["a"])(l,r,n,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-3a5d92f9.7cb7cad8.js.map