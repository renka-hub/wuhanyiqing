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
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="handleUpdate">修改</el-button>
      <el-button type="primary" @click="dialogTableVisible2 = true">新增</el-button>
      <el-button type="primary">数据导入</el-button>
      <el-button type="primary">数据导出</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <div class="Detail">
      <p class="DetailTab"><span>武汉</span>区当日新增滞汉外地人明细反馈表</p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" >
        </el-table-column>
        <el-table-column prop="id" label="序号" width="120">

        </el-table-column>
        <el-table-column prop="detainedName" label="姓名" width="120" >
          <template slot-scope="scope">
            <a @click="toDetail(scope.row.id)" href="javascript:void(null)">
              {{scope.row.detainedName}}
            </a>
          </template>
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
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="dialogTableVisible1">
      <el-form ref="form" :model="form1">
        <table border class="tableList1">
          <tbody>
            <tr>
              <td style="text-align:center;" colspan="4">XX区当日新增滞汉外地人明细</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <el-input v-model="form1.detainedName"></el-input>
              </td>
              <td>身份证号</td>
              <td>
                <el-input v-model="form1.cardNumber"></el-input>
              </td>
            </tr>
            <tr>
              <td>电话</td>
              <td>
                <el-input v-model="form1.telephone"></el-input>
              </td>
              <td>当地居住地址</td>
              <td>
                <el-input v-model="form1.address"></el-input>
              </td>
            </tr>
            <tr>
              <td>滞留人员类型</td>
              <td>
                <el-select v-model="form1.DetainedPersonTypeCd" placeholder="请选择">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>诉求类型</td>
              <td>
                <el-select v-model="form1.appealTypeCd" placeholder="请选择">
                  <el-option v-for="item in Appeals" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>安置方式</td>
              <td>
                <el-input v-model="form1.resetMode"></el-input>
              </td>
              <td>目的城市</td>
              <td>
                <el-input v-model="form1.destCity"></el-input>
              </td>
            </tr>
            <tr>
              <td>详情</td>
              <td colspan="4">
                <el-input v-model="form1.detainedInfo"></el-input>
              </td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="4">
                <el-input v-model="form1.bz"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveChange()">保存</el-button>
        <el-button @click="dialogTableVisible1 = false">放弃</el-button>
      </div>
    </el-dialog>

    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="dialogTableVisible2">
      <el-form ref="form" :model="form2">
        <table border class="tableList1">
          <tbody>
            <tr>
              <td style="text-align:center;" colspan="4">XX区当日新增滞汉外地人明细</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <el-input v-model="form2.detainedName"></el-input>
              </td>
              <td>身份证号</td>
              <td>
                <el-input v-model="form2.cardNumber"></el-input>
              </td>
            </tr>
            <tr>
              <td>电话</td>
              <td>
                <el-input v-model="form2.telephone"></el-input>
              </td>
              <td>当地居住地址</td>
              <td>
                <el-input v-model="form2.address"></el-input>
              </td>
            </tr>
            <tr>
              <td>滞留人员类型</td>
              <td>
                <el-select v-model="form2.DetainedPersonTypeCd" placeholder="请选择">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>诉求类型</td>
              <td>
                <el-select v-model="form2.appealTypeCd" placeholder="请选择">
                  <el-option v-for="item in Appeals" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>安置方式</td>
              <td>
                <el-input v-model="form2.resetMode"></el-input>
              </td>
              <td>目的城市</td>
              <td>
                <el-input v-model="form2.destCity"></el-input>
              </td>
            </tr>
            <tr>
              <td>详情</td>
              <td colspan="4">
                <el-input v-model="form2.detainedInfo"></el-input>
              </td>
            </tr>
            <tr>
              <td>备注</td>
              <td colspan="4">
                <el-input v-model="form2.bz"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveNew()">保存</el-button>
        <el-button @click="dialogTableVisible2 = false">放弃</el-button>
      </div>
    </el-dialog>
    <!-- 详情弹框 -->
    <el-dialog title="详情" :visible.sync="dialogTableVisible3">
      <table border class="tableList1">
        <tbody>
          <tr>
            <td style="text-align:center;" colspan="4">武汉区当日新增滞汉外地人明细</td>
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
            <td>{{info.detainedPersonTypeCd}}</td>
            <td>诉求类型</td>
            <td>{{info.appealChannelCd}}</td>
          </tr>
          <tr>
            <td>安置方式</td>
            <td>{{info.resetMode}}</td>
            <td>目的城市</td>
            <td>{{info.destCity}}</td>
          </tr>
          <tr>
            <td>详情</td>
            <td colspan="4">{{info.detainedInfo}}</td>
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
      value: '', //记录状态
      options: [], //记录状态

      tableData: [], //数据列表
      multipleSelection: [],
      dialogTableVisible1: false, //修改
      dialogTableVisible2: false, //新增
      dialogTableVisible3: false, //详情
      info: {}, //详情信息
      form: {},
      form1: {
        detainedName: "",
        cardNumber: "",
        telephone: "",
        address: "",
        resetMode: "",
        destCity: "",
        detainedInfo: "",
        bz: "",
        appealTypeCd: '', //诉求类型
        DetainedPersonTypeCd: '', //滞留类型
      },
      form2: {
        detainedName: "",
        cardNumber: "",
        telephone: "",
        address: "",
        resetMode: "",
        destCity: "",
        detainedInfo: "",
        bz: "",
        appealTypeCd: '', //诉求类型
        DetainedPersonTypeCd: '', //滞留类型
      },

      Appeals: [{
        value: 1,
        label: '需要离汉'
      }, {
        value: 2,
        label: '生活困难'
      }, {
        value: 3,
        label: '救助居住'
      }, {
        value: 4,
        label: '求助就医买药'
      }, {
        value: 5,
        label: '就业意向'
      }, {
        value: 6,
        label: '其他诉求'
      }],

      types: [{
        value: 0,
        label: '全部'
      }, {
        value: 1,
        label: '学生'
      }, {
        value: 2,
        label: '务工经商人员'
      }, {
        value: 3,
        label: '旅游'
      }, {
        value: 4,
        label: '投亲靠友'
      }, {
        value: 5,
        label: '来汉就医'
      }, {
        value: 6,
        label: '居无定所'
      }, {
        value: 7,
        label: '其他人员'
      }],
    }
  },
  created() {
    this.recordStatus();
    this.getData();
  },
  components: {
  },
  methods: {
    //修改
    handleUpdate() {
      this.dialogTableVisible1 = true;
      let form = {
        detainedName: "",
        cardNumber: "",
        telephone: "",
        address: "",
        resetMode: "",
        destCity: "",
        detainedInfo: "",
        bz: "",
        appealTypeCd: '',
        DetainedPersonTypeCd: '',
      }
      this.form1 = this.multipleSelection.length ? this.multipleSelection[0] : form
    },
    // 查询
    search() {
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
      })
    },

    //详情
    toDetail(id) {
      this.dialogTableVisible3 = true;
      this.$http({
        url: this.$http.adornUrl('/dataInto/info/' + id),
        method: 'get',

      }).then(res => {
        // console.log(res)
        this.info = res.data.t01DetainedPersonInfo;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    ///修改保存按钮
    saveChange() {
      this.$http({
        url: this.$http.adornUrl('/dataInto/updateInfo'),
        method: 'post',
        data: this.$http.adornData(this.form1)
      }).then(res => {
        if (!res.code) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogTableVisible1 = false
          this.form1 = JSON.parse(JSON.stringify(this.form))
          this.getData();
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          });
        }
      })
    },

    //新增保存按钮
    saveNew() {
      this.$http({
        url: this.$http.adornUrl('/dataInto/save'),
        method: 'post',
        data: this.$http.adornData(this.form2)
      }).then(res => {
        if (!res.code) {
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.dialogTableVisible2 = false
          this.form2 = JSON.parse(JSON.stringify(this.form))
          this.getData();
        } else {
          this.$message({
            message: '新增失败',
            type: 'error'
          });
        }
      })
    },
    //提交
    submit() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: '请选择一条数据',
          type: 'info'
        });
      } else {
        this.$http({
          url: this.$http.adornUrl(`/dataInto/updateStatus/${this.multipleSelection[0].id}?keepStatusCd=${this.multipleSelection[0].keepStatusCd}`),
          method: 'post'
        }).then(res => {
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.getData();
        })
      }
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.form1))

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
.el-date-editor.el-input, .el-date-editor.el-input__inner {
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
