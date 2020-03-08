<template>
  <div class="welcome-root">
    <div class="block">
      <span class="demonstration">填报日期：</span>
      <el-date-picker v-model="value1" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="block">
      <span>记录状态：</span>
      <el-select v-model="valuel" placeholder="请选择">
        <el-option v-for="item in options" :key="item.keepStatusCd" :label="item.keepStatusDesc" :value="item.keepStatusCd">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <el-button type="primary" @click="getData">查询</el-button>
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
         <el-table-column prop="detainedName" label="姓名" >
                    <template slot-scope="scope">
                                    <a href="javascript:void(null)" @click="toDetail(scope.row.id)">{{scope.row.detainedName}}</a>
                                    </template>
                  </el-table-column>
        <!-- <el-table-column prop="detainedName" label="姓名">
        </el-table-column> -->
        <el-table-column prop="telephone" label="电话" width="110">
        </el-table-column>
        <el-table-column prop="cardNumber" label="身份证号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="placeAreaDesc" label="户籍地">
        </el-table-column>
        <el-table-column prop="address" label="当地居住地址" show-overflow-tooltip width="110">
        </el-table-column>
        <el-table-column prop="detainedPersonTypeDesc" label="滞留人员类型" width="110">
        </el-table-column>

        <!-- <el-table-column prop="appealChannelCd" label="诉求类型">
        </el-table-column> -->
        <el-table-column prop="resetMode" label="安置方式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="salveAmount" label="救助金额">
        </el-table-column>
        <el-table-column prop="salveDateStat" label="救助开始日期" width="110" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="salveDateEnd" label="救助结束日期" width="110" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="submitUser" label="经办人">
        </el-table-column>
        <el-table-column prop="orderName" label="负责人">
        </el-table-column>
        <el-table-column prop="keepstatusDesc" label="记录状态">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="totalCount">
    </el-pagination>
       <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="dialogTableVisible3">
      <table border class="tableList1">
        <tbody>
          <tr>
            <td style="text-align:center;" colspan="4">滞汉外地人详细信息</td>
          </tr>
          <tr>
            <td width="15%">序号</td>
            <td width="35%">{{info.id}}</td>
            <td width="15%">行政区</td>
            <td width="35%">{{info.areaDesc}}</td>
          </tr>
          <tr>
            <td width="15%">姓名</td>
            <td width="35%">{{info.detainedName}}</td>
            <td width="15%">身份证号</td>
            <td width="35%">{{info.cardNumber}}</td>
          </tr>
          <tr>
            <td>电话</td>
            <td>{{info.telephone}}</td>
            <td>当地居住地址</td>
            <td>{{info.address}}</td>
          </tr>
          <tr>
            <td>滞留人员类型</td>
            <td>{{info.detainedPersonTypeDesc}}</td>
            <td>户籍地</td>
            <td>{{info.placeAreaDesc}}</td>
          </tr>
          <tr>
            <td>安置方式</td>
            <td>{{info.resetMode}}</td>
            <td>目的城市</td>
            <td>{{info.destCity}}</td>
          </tr>
          <tr>
            <td>救助开始日期</td>
            <td>{{info.salveDateStat}}</td>
            <td>救助结束日期</td>
            <td>{{info.salveDateEnd}}</td>
          </tr>
          <tr>
            <td>救助金额</td>
            <td>{{info.salveAmount}}</td>
            <td>记录状态</td>
            <td>{{info.keepstatusDesc}}</td>
          </tr>
          <tr>
            <td>经办人</td>
            <td>{{info.submitUser}}</td>
            <td>负责人</td>
            <td>{{info.orderName}}</td>
          </tr>
          <tr>
            <td>审核人</td>
            <td>{{info.reviewUser}}</td>
            <td>更新时间</td>
            <td>{{info.uptDate}}</td>
          </tr>

          <tr>
            <td>录入时间</td>
            <td colspan="4">{{info.submitDate}}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="4">{{info.bz}}</td>
          </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible3 = false">返回</el-button>
      </div>
    </el-dialog>
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
      valuel: 2,
      tableData: [], //数据列表
      multipleSelection: [],
      dialogTableVisible3: false, //详情
      info: {}, //详情信息
      currentPage: 1, //页数
      pageSize: 10, //条数
      pageIndex: 1, //页码
      totalCount: 0,
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
    // doModelManageList() {
    //   // if (this.value != '' && this.value1 != '') {
    //     this.$http({
    //       url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.value}&submitDate=${this.value1}`),
    //       method: 'get',

    //     }).then(res => {
    //       // console.log(res)
    //       this.tableData = res.data.page.list;
    //     })
    //   // } else {
    //   //   this.$message({
    //   //     message: '请选择查询条件',
    //   //     type: 'info'
    //   //   });
    //   // }
    // },
    //记录状态
    recordStatus() {
      this.$http({
        url: this.$http.adornUrl('/base/keepstatus/getStatus'),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.options = res.data.data;
        this.valuel = this.options[1].keepStatusCd
      })
    },
    // 获取数据
    getData() {
      this.$http({
        url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.valuel}&submitDate=${this.value1}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.page.list;
        this.pageSize = res.data.page.pageSize
        this.totalCount = res.data.page.totalCount
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
    //详情
    toDetail(id) {
      this.$http({
        url: this.$http.adornUrl('/dataInto/info/' + id),
        method: 'get',

      }).then(res => {
        if (!res.data.code) {
          this.dialogTableVisible3 = true;
          this.info = res.data.t01DetainedPersonInfo;
        }

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
</style>
