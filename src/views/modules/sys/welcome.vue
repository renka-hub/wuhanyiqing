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
      <el-button type="primary" @click="dialogTableVisible2 = true">新增</el-button>
      <!-- <el-button type="primary">数据导入</el-button> -->
     <el-upload
        class="upload-demo"
        action="http://10.192.72.34:8080/wuhanyiqing-api/outsider/excel/import"
        :headers="{'token':mate.cookie.get('token')}"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleSuccess"
        multiple
        :limit="3"
        :on-exceed="handleExceed">
  <el-button size="small" type="primary">数据导入</el-button>
</el-upload>
      <el-button type="primary" @click="exportData">数据导出</el-button>
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
        <el-table-column prop="cardNumber" label="身份证号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="placeAreaDesc" label="户籍地">
        </el-table-column>
        <el-table-column prop="address" label="当地居住地址" show-overflow-tooltip width="110">
        </el-table-column>
        <el-table-column prop="detainedPersonTypeDesc" label="滞留人员类型" width="110">
        </el-table-column>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">详细</el-button>
            <el-button type="text" size="small" @click="handleUpdate(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="totalCount">
    </el-pagination>
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
                <el-select v-model="form1.detainedPersonTypeCd" placeholder="请选择">
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
                  <el-option v-for="item in cityArr" :key="item.areaCd" :label="item.areaDesc" :value="item.areaCd">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <!-- <td>经办人</td>
              <td>
                <el-input v-model="form1.submitUser"></el-input>
              </td> -->
              <td>负责人</td>
              <td colspan="4">
                <el-input v-model="form1.orderName"></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td>行政区</td>
              <td colspan="4">
                <el-select v-model="form1.areaCd" placeholder="请选择">
                  <el-option v-for="item in areaArr" :key="item.orgId" :label="item.name" :value="item.orgId">
                  </el-option>
                </el-select>
              </td>
            </tr> -->
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
                <el-select v-model="form2.detainedPersonTypeCd" placeholder="请选择">
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
              <!-- <td>经办人</td>
              <td>
                <el-input v-model="userInfo.username" disabled></el-input>
              </td> -->
              <td>负责人</td>
              <td colspan="4">
                <el-input v-model="form2.orderName"></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td>行政区</td>
              <td colspan="4">
                <template v-if="userInfo.orgIdCode !==420101000000">
                  <el-select v-model="userInfo.orgIdCode" placeholder="请选择" disabled>
                    <el-option v-for="item in areaArr" :key="item.orgId" :label="item.name" :value="item.orgId">
                    </el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-input value="武汉市" disabled></el-input>
                </template>
              </td>
            </tr> -->
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
      mate: Vue,
      value1: '', //填报日期
      valuel: 1, //记录状态
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
        detainedPersonTypeCd: '', //滞留类型
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
        detainedPersonTypeCd: '', //滞留类型
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
      currentPage: 1, //页数
      pageSize: 10, //条数
      pageIndex: 1, //页码
      totalCount: 0,
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
      if (val.keepStatusCd !== '2') {
        this.dialogTableVisible1 = true;
        val.areaCd = parseInt(val.areaCd)
        val.detainedPersonTypeCd = parseInt(val.detainedPersonTypeCd)
        this.form1 = val
      } else {
        this.$message('不能修改提交状态的数据');
      }
    },
    // 查询
    // search() {
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
        this.valuel = this.options[0].keepStatusCd
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
    handleClick(id) {
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
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
      if (this.form2.detainedName != "" && this.form2.cardNumber != "" && this.form2.telephone != "" && this.form2.address != "" && this.form2.resetMode != "") {
        // this.form2.submitUser = this.userInfo.username
        // this.form2.areaCd = this.userInfo.orgIdCode
        // console.log(this.userInfo)
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
          url: this.$http.adornUrl(`/dataInto/updateStatus/${this.multipleSelection[0].id}?keepStatusCd=${2}`),
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
    //数据导出
    exportData() {
      this.$http({
        url: this.$http.adornUrl(`/outsider/excel/export`),
        method: 'get',
        responseType: 'blob',
      }).then(res => {
        // console.log(res.data)
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel"
        }); // 2.获取请求返回的response对象中的blob 设置文件类型，这里以excel为例
        let url = window.URL.createObjectURL(blob); // 3.创建一个临时的url指向blob对象
        // 4.创建url之后可以模拟对此文件对象的一系列操作，例如：预览、下载
        let a = document.createElement("a");
        a.href = url;
        a.download = "滞汉外地人清单.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      }, err => {
        resolve(err.response);
      })
    },
    //数据导入
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(){
      this.$message.success('提交成功');
    },
    //户籍
    getCity() {
      this.$http({
        url: this.$http.adornUrl(`/base/area/getData`),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.cityArr = res.data.data
      })
    },
    //区域
    areaDesc() {
      this.$http({
        url: this.$http.adornUrl(`/base/wuhanArea/getData`),
        method: 'get',
      }).then(res => {
        // console.log(res)
        this.areaArr = res.data.data
        this.areaArr.push({ orgId: 420101000000, name: '武汉市' })
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
  computed: {
    userInfo() {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.userInfo))
      user.orgIdCode = parseInt(user.orgId)
      return user
    }
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
  .upload-demo {
    display: inline-block;
    .el-button {
      height: 36px;
      margin: 0 10px;
    }
    /deep/ .el-upload-list{
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
</style>
