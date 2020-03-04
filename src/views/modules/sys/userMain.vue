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
      <p class="DetailTab">滞汉外地人清单</p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="areaDesc" label="行政区">
        </el-table-column>
        <el-table-column prop="id" label="序号">
        </el-table-column>

        <el-table-column prop="detainedName" label="姓名">
        </el-table-column>
        <el-table-column prop="telephone" label="电话">
        </el-table-column>
        <el-table-column prop="cardNumber" label="身份证号">
        </el-table-column>
        <el-table-column prop="placeAreaCd" label="户籍地">
        </el-table-column>
        <el-table-column prop="address" label="当地居住地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="detainedPersonTypeDesc" label="滞留人员类型">
        </el-table-column>

        <!-- <el-table-column prop="appealChannelCd" label="诉求类型">
        </el-table-column> -->
        <el-table-column prop="resetMode" label="安置方式">
        </el-table-column>
        <el-table-column prop="salveAmount" label="救助金额">
        </el-table-column>
        <el-table-column prop="salveDateStat" label="救助开始日期">
        </el-table-column>
        <el-table-column prop="salveDateEnd" label="救助结束日期">
        </el-table-column>
        <el-table-column prop="reviewUser" label="经办人">
        </el-table-column>
        <el-table-column prop="orderName" label="负责人">
        </el-table-column>
        <el-table-column prop="keepstatusDesc" label="记录状态">
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
      if (this.value != '' && this.value1 != '') {
        this.$http({
          url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.value}&submitDate=${this.value1}`),
          method: 'get',

        }).then(res => {
          // console.log(res)
          this.tableData = res.data.page.list;
        })
      } else {
        this.$message({
          message: '请选择查询条件',
          type: 'info'
        });
      }
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
        url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${2}`),
        method: 'get',
      }).then(res => {
        console.log(res)
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
        if (this.multipleSelection[0].keepStatusCd == 2) {
          this.$http({
            url: this.$http.adornUrl(`/dataInto/updateStatus/${this.multipleSelection[0].id}?keepStatusCd=${this.multipleSelection[0].keepStatusCd}`),
            method: 'post'
          }).then(res => {
            this.$message({
              message: '退回成功',
              type: 'success'
            });
            this.getData();
          })
        }
        else {
          this.$message({
            message: '请选择提交状态的数据，才可以退回！',
            type: 'info'
          });
        }
      }

    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
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
