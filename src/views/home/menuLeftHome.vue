<template>
  <div class="menuCon">
    <a-row class="home">
      <!--上-->
      <a-col :span="24" class="work-menu-groupTop">
        <a-col :span="4">
          <div class="work-menu-groupTop_con" @click="gotoWelcome">
            <div v-if="isCollapse==false" class="nobg">
              <span>武汉市滞汉外地人员信息上报平台</span>
            </div>
          </div>
        </a-col>
        <!-- 导航菜单 -->
        <a-col :span="15">

          <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="activeIndex" :router="true">
            
            <el-menu-item index="/welcome">区录入人员</el-menu-item>
            <el-menu-item index="/userMain">市管理员</el-menu-item>
            <!-- <el-submenu index="1">
              <template slot="title">统计分析</template>
              <el-menu-item index="/proportion">滞留人员占比分析</el-menu-item>
              <el-menu-item index="/userMain">滞留人员趋势分析</el-menu-item>
            </el-submenu> -->

          </el-menu>
        </a-col>
        <a-col :span="5" class="container-header">
          <header class="header" style="text-align: right; font-size: 12px">
            <div class="header-options">
             
            </div>
          </header>
        </a-col>
      </a-col>

      <!--内容-->
      <a-col :span="24" class="work-menu-group">
        <a-col :span="24" class="container-con" :class="isCollapse?'container-root-context-collapse':'container-root-context'">
          <router-view></router-view>
        </a-col>
      </a-col>
    </a-row>
  </div>

</template>

<script>


export default {
  name: "MenuLeftHome",

  data() {
    return {
      isCollapse: false,
      fullScreen: false,
      collapseText: 'double-right',
      activeIndex: '1',
      activeIndex2: '1'

    }
  },
  components: {

  },
  computed: {

  },
  methods: {
    //点击logo返回主页
    gotoWelcome() {
      this.$router.push({ 'path': '/' })
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
   
  },
  mounted: function () {
    if (this.$route.fullPath == '/home') {
      this.$router.push({ "path": "welcome" })
    }
    const $this = this
   
  }
};
</script>

<style scoped lang="scss">
.menuCon {
  .home {
    height: 100vh;
    .ant-menu-item {
      margin: 0;
    }
    .work-menu-group {
      position: absolute;
      top: 60px;
      right: 0;
    }
    .work-menu-groupTop {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 999;
      background-color: rgb(84, 92, 100);
      height: 60px;
      line-height: 60px;
      .work-menu-groupTop_con {
        .nobg {
          height: 60px;
          line-height: 60px;
          font-size: 20px;
          text-align: center;
          color: #fff;
          font-family: "Microsoft Yahei";
          cursor: pointer;
          span {
            display: inline-block;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            background-image: -webkit-gradient(
              linear,
              0 0,
              0 bottom,
              from(rgba(255, 255, 255, 1)),
              to(rgba(255, 255, 255, 1))
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
      .container-header {
        .header-options {
          .personal-infos {
            padding: 0 10px;
            font-size: 16px;
            float: right;
            color: #fff;
            cursor: pointer;
            .personal-pic svg {
              width: 25px;
              height: 25px;
              margin: 17px 10px 0 0;
              float: left;
            }
          }
          .icon-mount {
            padding: 0 10px;
            float: right;
            color: #fff;
            height: 60px;
            cursor: pointer;
            svg {
              width: 28px;
              height: 28px;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
</style>
