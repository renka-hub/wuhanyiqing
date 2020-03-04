<template>
  <div class="welcome-root">
    <div class="block">
      <span class="demonstration">填报日期：</span>
      <el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="block">
      <span>记录状态：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.keepStatusCd" :label="item.keepStatusDesc" :value="item.keepStatusCd">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <el-button type="primary" @click="doModelManageList">查询</el-button>
      <el-button type="primary" @click="goBack()">退回</el-button>
    </div>
    <div class="Detail">
      <p class="DetailTab"><span>武汉</span>区当日新增滞汉外地人明细反馈表</p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="序号" width="120">

        </el-table-column>
        <el-table-column prop="areaCd" label="区县" width="120">
        </el-table-column>
        <el-table-column prop="detainedName" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="cardNumber" label="身份证号">
        </el-table-column>
        <el-table-column prop="detainedPersonTypeCd" label="滞留人员类型">
        </el-table-column>
        <el-table-column prop="address" label="当地居住地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="appealChannelCd" label="诉求类型">
        </el-table-column>
        <el-table-column prop="resetMode" label="安置方式">
        </el-table-column>
        <el-table-column prop="destCity" label="目的城市">
        </el-table-column>
        <el-table-column prop="detainedInfo" label="详情">
        </el-table-column>
        <el-table-column prop="bz" label="备注">
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'


export default {
  name: 'Welcome',
  data() {
    return {
      value1: '', //填报日期
      options: [], //记录状态
      value: '',
      tableData: [], //数据列表
      multipleSelection: []
    }
  },
  created() {
    this.recordStatus();
    this.getData();
  },
  components: {
  },
  methods: {
    // 查询
    doModelManageList() {
      this.$http({
        url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.value}&submitDate=${this.value1}`),
        method: 'get',
       
      }).then(res => {
        console.log(res)
        this.tableData = res.data.page.list;
      })
    },
    //记录状态
    recordStatus() {
      this.$http({
        url: this.$http.adornUrl('/base/keepstatus/getStatus'),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.options = res.data.data;
      })
    },
    // 获取数据
    getData() {
      this.$http({
        url: this.$http.adornUrl('/dataInto/pageList'),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.page.list;
        // console.log(this.tableData)
      })
    },
    //退回
    goBack() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'info'
        });
      } else {
        console.log(this.multipleSelection[0].keepStatusCd)
        this.$http({
          url: this.$http.adornUrl(`/dataInto/updateStatus/${this.multipleSelection[0].id}?keepStatusCd=${3}`),
          method: 'post'
        }).then(res => {
          this.$message({
            message: '退回成功',
            type: 'success'
          });
          this.getData();
        })
      }

    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    }
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
}
.Detail {
  margin-top: 50px;
  text-align: center;
  /deep/ .cell {
    text-align: center !important;
  }
}
</style>
