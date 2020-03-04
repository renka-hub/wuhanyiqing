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
      <el-button type="primary" @click="dialogTableVisible2 = true">新增</el-button>
      <el-button type="primary">数据导入</el-button>
      <el-button type="primary">数据导出</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
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
        <el-table-column prop="telephone" label="电话" width="110">
        </el-table-column>
        <el-table-column prop="cardNumber" label="身份证号">
        </el-table-column>
        <el-table-column prop="placeAreaCd" label="户籍地">
        </el-table-column>
        <el-table-column prop="address" label="当地居住地址" show-overflow-tooltip width="110">
        </el-table-column>
        <el-table-column prop="detainedPersonTypeDesc" label="滞留人员类型" width="110">
        </el-table-column>
        <el-table-column prop="resetMode" label="安置方式">
        </el-table-column>
        <el-table-column prop="salveAmount" label="救助金额">
        </el-table-column>
        <el-table-column prop="salveDateStat" label="救助开始日期" width="105">
        </el-table-column>
        <el-table-column prop="salveDateEnd" label="救助结束日期" width="105">
        </el-table-column>
        <el-table-column prop="reviewUser" label="经办人">
        </el-table-column>
        <el-table-column prop="orderName" label="负责人">
        </el-table-column>
        <el-table-column prop="keepstatusDesc" label="记录状态">
        </el-table-column>
        <!-- <el-table-column prop="bz" label="操作">
          <a href="">详细</a>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">详细</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      </el-table>
    </div>
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="dialogTableVisible1">
      <el-form ref="form" :model="form1">
        <table border class="tableList1">
          <tbody>
            <tr>
              <td style="text-align:center;" colspan="4">滞汉外地人修改</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <el-input v-model="form1.detainedName"></el-input>
              </td>
              <td>身份证号</td>
              <td>
                <el-input v-model="form1.cardNumber" @blur="checkIdCard(form1.cardNumber)"></el-input>
              </td>
            </tr>
            <tr>
              <td>电话</td>
              <td>
                <el-input v-model="form1.telephone" @blur="phoneNumber(form1.telephone)"></el-input>
              </td>
              <td>当地居住地址</td>
              <td>
                <el-input v-model="form1.address"></el-input>
              </td>
            </tr>
            <tr>
              <td>滞留人员类型</td>
              <td>
                <el-select v-model="form1.detainedPersonTypeDesc" placeholder="请选择">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>安置方式</td>
              <td>
                <el-input v-model="form1.resetMode"></el-input>
              </td>
            </tr>
            <tr>
              <td>救助开始日期</td>
              <td>
                <el-date-picker v-model="form1.salveDateStat" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
              </td>
              <td>救助结束日期</td>
              <td>
                <el-date-picker v-model="form1.salveDateEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
              </td>
            </tr>
            <tr>
              <td>救助金额</td>
              <td>
                <el-input v-model="form1.salveAmount" @blur="isRealNum(form1.salveAmount)"></el-input>
              </td>
              <td>户籍地</td>
              <td>
                <el-select v-model="form1.placeAreaCd" placeholder="请选择">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>经办人</td>
              <td>
                <el-input v-model="form1.reviewUser"></el-input>
              </td>
              <td>负责人</td>
              <td>
                <el-input v-model="form1.orderName"></el-input>
              </td>
            </tr>
            <tr>
              <td>行政区</td>
              <td colspan="4">
                <el-select v-model="form1.areaDesc" placeholder="请选择">
                  <el-option v-for="item in areaArr" :key="item.orgId" :label="item.name" :value="item.orgId">
                  </el-option>
                </el-select>
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
              <td style="text-align:center;" colspan="4">滞汉外地人新增</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>
                <el-input v-model="form2.detainedName"></el-input>
              </td>
              <td>身份证号</td>
              <td>
                <el-input v-model="form2.cardNumber" @blur="checkIdCard(form2.cardNumber)"></el-input>
              </td>
            </tr>
            <tr>
              <td>电话</td>
              <td>
                <el-input v-model="form2.telephone" @blur="phoneNumber(form2.telephone)"></el-input>
              </td>
              <td>当地居住地址</td>
              <td>
                <el-input v-model="form2.address"></el-input>
              </td>
            </tr>
            <tr>
              <td>滞留人员类型</td>
              <td>
                <el-select v-model="form2.detainedPersonTypeDesc" placeholder="请选择">
                  <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>安置方式</td>
              <td>
                <el-input v-model="form2.resetMode"></el-input>
              </td>
            </tr>
            <tr>
              <td>救助开始日期</td>
              <td>
                <el-date-picker v-model="form2.salveDateStat" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
              </td>
              <td>救助结束日期</td>
              <td>
                <el-date-picker v-model="form2.salveDateEnd" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
              </td>
            </tr>
            <tr>
              <td>救助金额</td>
              <td>
                <el-input v-model="form2.salveAmount" @blur="isRealNum(form2.salveAmount)"></el-input>
              </td>
              <td>户籍地</td>
              <td>
                <el-select v-model="form2.placeAreaCd" placeholder="请选择">
                  <el-option v-for="item in cityArr" :key="item.areaCd" :label="item.areaDesc" :value="item.areaCd">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>经办人</td>
              <td>
                <el-input v-model="form2.reviewUser"></el-input>
              </td>
              <td>负责人</td>
              <td>
                <el-input v-model="form2.orderName"></el-input>
              </td>
            </tr>
            <tr>
              <td>行政区</td>
              <td colspan="4">
                <el-select v-model="form2.areaDesc" placeholder="请选择">
                  <el-option v-for="item in areaArr" :key="item.orgId" :label="item.name" :value="item.orgId">
                  </el-option>
                </el-select>
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
            <td>{{info.placeAreaCd}}</td>
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
            <td>{{info.reviewUser}}</td>
            <td>负责人</td>
            <td>{{info.orderName}}</td>
          </tr>
          <tr>
            <td>审核人</td>
            <td>{{info.orderName}}</td>
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
        salveDateStat: "",
        salveDateEnd: "",
        salveAmount: "",
        placeAreaCd: "",
        orderName: "",
        areaCd: "",
        bz: "",
        detainedPersonTypeDesc: '', //滞留类型
      },
      form2: {
        detainedName: "",
        cardNumber: "",
        telephone: "",
        address: "",
        resetMode: "",
        salveDateStat: "",
        salveDateEnd: "",
        salveAmount: "",
        placeAreaCd: "",
        orderName: "",
        areaCd: "",
        bz: "",
        detainedPersonTypeDesc: '', //滞留类型
      },

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
      cityArr: [], //户籍
      areaArr: [], //区域
    }
  },
  created() {
    this.recordStatus();
    this.getData();
    this.getCity();
    this.areaDesc();
  },
  components: {
  },
  methods: {
    //修改
    handleUpdate(val) {
      // console.log(val)
      this.dialogTableVisible1 = true;
      let form = {
        detainedName: "",
        cardNumber: "",
        telephone: "",
        address: "",
        resetMode: "",
        salveDateStat: "",
        salveDateEnd: "",
        salveAmount: "",
        placeAreaCd: "",
        orderName: "",
        areaCd: "",
        bz: "",
        detainedPersonTypeDesc: '', //滞留类型
      }
      this.form1 = val
    },
    // 查询
    search() {
      if (this.value != '' && this.value1 != '') {
        this.$http({
          url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.value}&submitDate=${this.value1}`),
          method: 'get',

        }).then(res => {
          console.log(res)
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
        this.value = this.options[0].keepStatusCd
      })
    },
    // 获取数据
    getData() {
      this.$http({
        url: this.$http.adornUrl(`/dataInto/pageList?keepStatusCd=${this.value}`),
        method: 'get',
      }).then(res => {
        console.log(res)
        this.tableData = res.data.page.list;
      })
    },

    //详情
    handleClick(id) {
      console.log(id)
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
        if (!res.data.code) {
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
      console.log(this.form2)

      if (this.form2.detainedName != "" && this.form2.cardNumber != "" && this.form2.telephone != "" && this.form2.address != "" && this.form2.resetMode != "") {
        this.$http({
          url: this.$http.adornUrl('/dataInto/save'),
          method: 'post',
          data: this.$http.adornData(this.form2)
        }).then(res => {
          if (!res.data.code) {
            this.$message({
              message: '新增成功',
              type: 'success'
            });
            // this.dialogTableVisible2 = false
            // this.form2 = JSON.parse(JSON.stringify(this.form))
            // this.getData();
          } else {
            this.$message({
              message: '新增失败',
              type: 'error'
            });
          }
        })
      } else {
        this.$message({
          message: '请完整填写表格',
          type: 'error'
        });
      }

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
    //户籍
    getCity() {
      this.$http({
        url: this.$http.adornUrl(`/base/area/getData`),
        method: 'get',
      }).then(res => {
        console.log(res)
        this.cityArr = res.data.data
      })
    },
    //区域
    areaDesc() {
      this.$http({
        url: this.$http.adornUrl(`/base/wuhanArea/getData`),
        method: 'get',
      }).then(res => {
        console.log(res)
        this.areaArr = res.data.data
      })
    },
    //身份证校验
    checkIdCard(idcard) {
      const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regIdCard.test(idcard)) {
        this.$message.error('身份证号填写有误');
        return false;
      } else {
        return true;
      }
    },
    //手机号校验
    phoneNumber(phone) {
      const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!regPhone.test(phone)) {
        this.$message.error('手机号填写有误');
        return false;
      } else {
        return true;
      }
    },
    //金额校验
    isRealNum(val) {
      const regPNum = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
      if (!regPNum.test(val)) {
        this.$message.error('金额格式有误');
        return false;
      } else {
        return true;
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
</style>
