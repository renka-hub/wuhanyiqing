<template>
  <div class="welcome-root">
    <div class="block">
      <span class="tblable">用户名：</span>
      <el-input v-model="user" placeholder="请输入关键字" clearable class="seach"></el-input>
    </div>
    <div class="block">
      <span class="demonstration">记录时间：</span>
      <el-date-picker v-model="time" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期">
      </el-date-picker>
    
    </div>
    <div class="block">
      <span class="tblable">日志类型：</span>
      <el-input v-model="type" placeholder="请输入关键字" clearable class="seach"></el-input>
    </div>
    <div class="block">
      <el-button type="primary" @click="getData">查询</el-button>
    </div>

    <div class="Detail">
      <!-- <p class="DetailTab">登录日志</p> -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="index" :index="indexMethod" label="序号" header-align="center" align="center" width="100">
        </el-table-column>
        <!-- <el-table-column prop="id" label="序号" width="100">
        </el-table-column> -->
        <el-table-column prop="user" label="用户名">
        </el-table-column>
        <el-table-column prop="time" label="记录时间">
        </el-table-column>
        <el-table-column prop="type" label="日志类型" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  // name: 'Welcome',
  data() {
    return {
      mate: Vue,
      user: '',
      time: '',
      type: '',
      tableData: [], //数据列表
      multipleSelection: [],
      currentPage: 1, //页数
      pageSize: 20, //条数
      pageIndex: 1, //页码
      totalCount: 0,
    }
  },
  created() {
    this.getData();
  },
  components: {

  },
  methods: {

    // 获取数据
    getData() {
      if (this.time == null) {
        this.time = ''
      }
      this.$http({
        url: this.$http.adornUrl(`/operate/log/pageList?userName=${this.user}&time=${this.time}&type=${this.type}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.page.list;
        this.pageSize = res.data.page.pageSize
        this.totalCount = res.data.page.totalCount
        this.currentPage= res.data.page.currPage

      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      // console.log(`当前页: ${val}`);
      this.getData();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    indexMethod(index) {
      return (index + 1) + (this.currentPage - 1) * (this.pageSize)
    }

  },
  computed: {
    userInfo() {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.userInfo))
      user.orgIdCode = parseInt(user.orgId)
      return user
    },

  },
  mounted() {

  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.welcome-root {
  height: 100%;
  margin: 30px 0;
}
.welcome-root .block {
  display: inline-block;
  margin-left: 30px;
  .upload-demo {
    display: inline-block;
    .el-button {
      height: 36px;
      margin: 0 10px;
    }
    /deep/ .el-upload-list {
      display: none !important;
    }
  }
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 160px;
}
.Detail {
  margin-top: 50px;
  text-align: center;
  /deep/ .cell {
    text-align: center !important;
  }
}
.tableList1 {
  border: 1px solid #ddd;
  width: 100%;
  /deep/ .el-date-editor.el-input[data-v-78b3a16e],
  .el-date-editor.el-input__inner[data-v-78b3a16e] {
    width: 100%;
  }
  td {
    padding: 5px 10px;
    v-deep input {
      border: none;
    }
    .el-select {
      width: 100%;
    }
  }
}

.el-form-item {
  /deep/ .el-form-item__label {
    // text-align: left;
    width: 30%;
  }
  display: inline-block;
  width: 49%;
  margin-bottom: 30px;
  /deep/ .el-form-item__content {
    width: 70%;
    display: inline-block;
  }
  .el-select {
    width: 100%;
  }
  .el-date-editor {
    width: 100%;
  }
}
.block {
  .seach {
    width: 74%;
  }
}
</style>
