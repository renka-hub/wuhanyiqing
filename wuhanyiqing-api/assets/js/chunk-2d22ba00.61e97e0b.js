(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22ba00"],{f088:function(e,n,t){"use strict";t.r(n);var u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.menu.list&&e.menu.list.length>=1?t("el-submenu",{attrs:{index:e.menu.menuId+"","popper-class":"site-sidebar--"+e.sidebarLayoutSkin+"-popper"}},[t("template",{slot:"title"},[t("icon-svg",{staticClass:"site-sidebar__menu-icon",attrs:{name:e.menu.icon||""}}),t("span",[e._v(e._s(e.menu.name))])],1),e._l(e.menu.list,function(n){return t("sub-menu",{key:n.menuId,attrs:{menu:n,dynamicMenuRoutes:e.dynamicMenuRoutes}})})],2):t("el-menu-item",{attrs:{index:e.menu.menuId+""},on:{click:function(n){return e.gotoRouteHandle(e.menu)}}},[t("icon-svg",{staticClass:"site-sidebar__menu-icon",attrs:{name:e.menu.icon||""}}),t("span",[e._v(e._s(e.menu.name))])],1)},s=[],i=(t("7f7f"),{name:"sub-menu",props:{menu:{type:Object,required:!0},dynamicMenuRoutes:{type:Array,required:!0}},components:{SubMenu:r},computed:{sidebarLayoutSkin:{get:function(){return this.$store.state.common.sidebarLayoutSkin}}},methods:{gotoRouteHandle:function(e){var n=this.dynamicMenuRoutes.filter(function(n){return n.meta.menuId===e.menuId});n.length>=1&&this.$router.push({name:n[0].name})}}}),a=i,o=t("2877"),m=Object(o["a"])(a,u,s,!1,null,null,null),r=n["default"]=m.exports}}]);
//# sourceMappingURL=chunk-2d22ba00.61e97e0b.js.map