<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <el-row>
      <el-col :span="5">
        <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
          <a class="site-navbar__brand-lg" href="javascript:;">武汉市滞汉外地人员信息上报平台</a>
          <!--<a class="site-navbar__brand-mini" href="javascript:;">金信</a>-->
        </h1>
      </el-col>
      <el-col :span="16">
        <main-topbar-menu :nav="navIndex" :data="menuList" :dynamicMenuRoutes="dynamicMenuRoutes"></main-topbar-menu>
      </el-col>
      <el-col :span="3">
        <el-menu
                class="site-navbar__menu site-navbar__menu--right"
                mode="horizontal">
          <!-- <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
            <template slot="title">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </template>
          </el-menu-item> -->
          <el-menu-item class="site-navbar__avatar" index="3">
            <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.png" :alt="userName">{{ userName }}
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import MainTopbarMenu from './main-topbar-menu'
  import { clearLoginInfo } from '@/utils'
  import { isURL } from '@/utils/validate'
  export default {
    data () {
      return {
        dynamicMenuRoutes: [],
        updatePassowrdVisible: false,
        navIndex:''
      }
    },
    components: {
      UpdatePassword,MainTopbarMenu
    },
    computed: {
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold },
        set (val) { this.$store.commit('common/updateSidebarFold', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      userName: {
        get () { return this.$store.state.user.name }
      },
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      },
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || ''
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
        this.navIndex = this.getActiveTab(route.meta.menuId)
      },
      //
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
        let data = this.menuList
        for (let index = 0; index<data.length; index++) {
          let nd = data[index];
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
    }
  }
</script>
<style lang="scss" scoped>
  .site-navbar__brand,.site-navbar__header{
    width:330px;
  }
  .site-navbar__body{
    margin-left:330px;
  }
  .el-menu--horizontal>.el-menu-item{
    color:#fff;
  }
  .site-navbar__brand-lg{
    font-size: 18px;
  }
</style>
