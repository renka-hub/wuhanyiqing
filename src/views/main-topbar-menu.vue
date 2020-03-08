<template>
  <div>
    <el-menu mode="horizontal" :default-active="nav" background-color="#17B3A3" text-color="#FFFFFF" active-text-color="#FFFF00">
      <template v-for="item in data" >
        <el-submenu :index="item.menuId.toString()" v-if="item.list && item.list.length>0" :key="item.menuId" >
          <template slot="title"  style="padding-left:10px" >
            <span slot="title">{{ item.name}}</span>
          </template>
          <main-topbar-menu :nav="nav" :data="item.list" :dynamicMenuRoutes="dynamicMenuRoutes"></main-topbar-menu>
        </el-submenu>
        <el-menu-item v-else :index="item.menuId.toString()" :key="item.menuId" @click="gotoRouteHandle(item)">
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "main-topbar-menu",
    props : {
        data:{
          type: Array,
          required: true
        },
        dynamicMenuRoutes: {
          type: Array,
          required: true
        },
        nav:{
          type: String,
        },
    },
    methods:{
      getActiveTab:function(idx){
        let url = idx || location.href
        let fn = null
        if(idx){
          fn = function(url, n){
            return url == n.menuId
          }
        }else if(url.indexOf('#/i-')>-1){
          fn = function(url, n){
            return url.endsWith('i-'+n.menuId)
          }
        }else{
          fn = function(url, n){
            return url.indexOf(n.url) > -1
          }
        }
        for (let index = 0; index<this.data.length; index++) {
          let nd = this.data[index];
          if (nd.url && fn(url, nd)) {
            return nd.menuId.toString();
          }
          if(nd.list){
            for(let j = 0; j < nd.list.length; j++){
              let sn = nd.list[j];
              if(sn.url && fn(url, sn)){
                return sn.menuId.toString();
              }
            }
          }
        }
        return '';
      },
      // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
      gotoRouteHandle (menu) {
        var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
        if (route.length >= 1) {
          this.$router.push({ name: route[0].name })
        }
      },
      // 路由操作
      routeHandle (route) {
        this.navIndex = this.getActiveTab(route.meta.menuId)
      }
    },
  }
</script>

<style scoped>
  /deep/.el-menu--horizontal>.el-submenu .el-submenu__title{
    height:50px;
    line-height:50px;
  }
  /deep/.el-menu--horizontal>.el-menu-item{
    height:50px;
    line-height:50px;
  }
  .el-menu--horizontal {
    border-right: none;
    border-bottom: solid 0px rgb(23, 179, 163) !important;
  }
  .el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title.is-active{
    color:#333;
    background-color:#fff;
  }
</style>