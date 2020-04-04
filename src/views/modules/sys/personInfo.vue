<template>
  <div class="welcome-root">

    <div class="block">
      <el-button type="primary" @click="getData">查询</el-button>
      <el-button type="primary" @click="dialogTableVisible2 = true">新增</el-button>
      <el-upload class="upload-demo" action="http://10.192.72.34:8080/wuhanyiqing-api/leaveperson/excel/import" :headers="{'token':mate.cookie.get('token')}" :on-preview="handlePreview" :before-upload="beforeUpload" :data="uploadData" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="3" :on-exceed="handleExceed">
        <el-button size="small" type="primary">数据导入</el-button>
      </el-upload>
      <!-- <el-button type="primary" @click="exportData">数据导出</el-button> -->
      <el-button type="primary" @click="temDownload">模板下载</el-button>
    </div>
    <div class="box">
      <div class="block">
        <span class="tblable">姓名：</span>
        <el-input placeholder="请输入关键字" v-model="search1.name" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">手机：</span>
        <el-input placeholder="请输入关键字" v-model="search1.phone" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">证件类型：</span>
        <!-- <el-input placeholder="请输入关键字" v-model="search1.cardType" clearable ></el-input> -->
        <el-select v-model="search1.cardType" placeholder="请选择">
          <el-option v-for="item in types" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </div>
      <!-- <div class="block">
        <span>证件号码：</span>
        <el-input placeholder="请输入关键字" v-model="search1.name" clearable ></el-input>
      </div> -->

      <div class="block">
        <span class="tblable">滞汉居住方式：</span>
        <el-select v-model="search1.levLiveType" placeholder="请选择">
          <el-option v-for="item in levLiveType" :key="item.value" :label="item.value" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="tblable">户籍地：</span>
        <el-input placeholder="请输入关键字" v-model="search1.hj" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">滞汉居住地址：</span>
        <el-input placeholder="请输入关键字" v-model="search1.levLiveAddress" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">返回省份：</span>
        <el-input placeholder="请输入关键字" v-model="search1.backProvince" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">返回市：</span>
        <el-input placeholder="请输入关键字" v-model="search1.backCity" clearable></el-input>
      </div>
      <div class="block">
        <span class="tblable">返程方式：</span>
        <el-select v-model="search1.levBy" placeholder="请选择">
          <el-option v-for="item in levBy" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="tblable">离汉时间：</span>
        <el-date-picker v-model="search1.levTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>

      </div>
    </div>

    <div class="Detail">
      <p class="DetailTab">已离汉人员信息表</p>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column prop="id" label="序号">
        </el-table-column> -->
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="phone" label="手机">
        </el-table-column>
        <el-table-column prop="cardType" label="证件类型" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="cardNum" label="证件号码" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="hj" label="户籍地" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="levLiveType" label="滞汉居住方式" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="levLiveAddress" label="滞汉居住地址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="backProvince" label="返回省份" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="backCity" label="返回市" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="levTime" label="离汉时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="levBy" label="返程方式" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="totalCount">
    </el-pagination>

    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="dialogTableVisible2">
      <el-form :model="form2" :rules="rules" ref="form2">

        <el-form-item label="姓名：" prop="name">
          <el-input v-model="form2.name" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>
        <el-form-item label="手机：" prop="phone">
          <el-input v-model="form2.phone" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>

        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="form2.cardType" placeholder="请选择">
            <el-option v-for="item in types" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="cardNum">
          <el-input v-model="form2.cardNum" @blur="checkIdCard(form2.cardNum)" v-show="form2.cardType=='中华人民共和国居民身份证'"></el-input>
          <el-input v-model="form2.cardNum" v-show="form2.cardType!='中华人民共和国居民身份证'"></el-input>
        </el-form-item>

        <el-form-item label="户籍地">
          <el-input v-model="form2.hj" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>
        <el-form-item label="滞汉居住方式" prop="levLiveType">
          <!-- <el-input v-model="form2.backCity" placeholder="请输入内容" size="small "></el-input> -->
          <el-select v-model="form2.levLiveType" placeholder="请选择">
            <el-option v-for="item in levLiveType" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="滞汉居住地址" prop="levLiveAddress">
          <el-input v-model="form2.levLiveAddress" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>
        <el-form-item label="返回省份" prop="backProvince">
          <el-input v-model="form2.backProvince" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>
        <el-form-item label="返回市" prop="backCity">
          <el-input v-model="form2.backCity" placeholder="请输入内容" size="small "></el-input>
        </el-form-item>
        <el-form-item label="离汉时间" prop="levTime">
          <el-date-picker v-model="form2.levTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item label="返程方式" prop="levBy">
          <el-select v-model="form2.levBy" placeholder="请选择">
            <el-option v-for="item in levBy" :key="item.label" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="dialog-footer" style="text-align: right;">
          <el-button type="primary" @click="saveNew('form2')">保存</el-button>
          <el-button @click="dialogTableVisible2 = false">放弃</el-button>
        </div>
      </el-form>

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
      tableData: [], //数据列表
      multipleSelection: [],
      search: '',  //搜索
      info: {}, //详情信息
      form: {},
      form1: {
        name: "",
        phone: "",
        cardType: "",
        cardNum: "",
        levTime: "",
        backCity: "",
        levBy: "",
        hj: "",
        levLiveType: "",
        levLiveAddress: "",
        backProvince: "",

      },
      form2: {
        name: "",
        phone: "",
        cardType: "",
        cardNum: "",
        levTime: "",
        backCity: "",
        levBy: "",
        hj: "",
        levLiveType: "",
        levLiveAddress: "",
        backProvince: "",

      },

      //证件类型
      types: [{
        label: '中华人民共和国居民身份证'
      }, {
        label: '外籍护照'
      }, {
        label: '港澳居民来往内地通行证'
      }, {
        label: '台湾居民来往大陆通行证'
      }, {
        label: '其他'
      }],
      //返程方式
      levBy: [{
        label: '集中统一接送'
      }, {
        label: '自驾'
      }, {
        label: '铁路'
      }, {
        label: '飞机'
      }, {
        label: '公路客运'
      }],
      //滞汉居住方式
      levLiveType: [{
        value: '集体宿舍'
      }, {
        value: '自有住房'
      }, {
        value: '自住酒店'
      }, {
        value: '自行租房'
      }, {
        value: '亲友家暂住'
      }, {
        value: '政府集中安置点'
      }, {
        value: '其他'
      }],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/, message: '手机号填写有误' }
        ],
        cardType: [
          { required: true, message: '请选择证件类型', trigger: 'blur' },
        ],
        cardNum: [
          { required: true, message: '请输入证件号码', trigger: 'blur' },
          // { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '证件号码错误' }
        ],
        levTime: [
          { required: true, message: '请选择离汉时间', trigger: 'blur' },
        ],
        backCity: [
          { required: true, message: '请输入返回市', trigger: 'blur' },
        ],
        levBy: [
          { required: true, message: '请选择返程方式', trigger: 'blur' },
        ],
        levLiveType: [
          { required: true, message: '请选择居住方式', trigger: 'blur' },
        ],
        levLiveAddress: [
          { required: true, message: '请输入居住地址', trigger: 'blur' },
        ],
        backProvince: [
          { required: true, message: '请输入返回省份', trigger: 'blur' },
        ],
      },
      search1: {
        backCity: "",
        backProvince: "",
        cardType: "",
        hj: "",
        levBy: "",
        levLiveAddress: "",
        levLiveType: '',
        levTime: "",
        name: "",
        pageIndex: 1,
        pageSize: 20,
        phone: "",
        zoneCd: ""
      },
      dialogTableVisible2: false, //新增
      currentPage: 1, //页数
      pageSize: 20, //条数
      pageIndex: 1, //页码
      totalCount: 0,
      uploadData: null,
    }
  },
  created() {
    this.getData();
    this.form2.cardType = this.types[0].label
  },
  components: {
  },
  methods: {

    // 获取数据
    getData() {
      this.search1.zoneCd = this.userInfo.username
      this.$http({
        url: this.$http.adornUrl(`/levPerson/pageList`),
        method: 'post',
        data: this.$http.adornData(this.search1)
      }).then(res => {
        // console.log(res)
        this.tableData = res.data.page.list;
        this.pageSize = res.data.page.pageSize
        this.totalCount = res.data.page.totalCount
        this.search1 = { brand_right: 0 }
      })
    },
    handleSizeChange(val) {
      this.search1.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.getData();
    },
    handleCurrentChange(val) {
      this.search1.pageIndex = val;
      // console.log(`当前页: ${val}`);
      this.getData();
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    //新增保存按钮
    saveNew(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form2.zoneCd = this.userInfo.username
          this.$http({
            url: this.$http.adornUrl('/levPerson/save'),
            method: 'post',
            data: this.$http.adornData(this.form2)
          }).then(res => {
            // console.log(res)
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
          console.log('error submit!!');
          return false;
        }
      });


    },
    //模板下载
    temDownload() {
      this.$http({
        url: this.$http.adornUrl(`/leaveperson/excel/exportExcelTemplate`),
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
        a.download = "已离汉人员信息模板表.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      }, err => {
        resolve(err.response);
      })
    },
    //数据导出
    exportData() {
      this.$http({
        url: this.$http.adornUrl(`/leaveperson/excel/export`),
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
        a.download = "已离汉人员信息表.xlsx";
        a.click();
        // 5.释放这个临时的对象url
        window.URL.revokeObjectURL(url);
      }, err => {
        resolve(err.response);
      })
    },
    //数据导入
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(res) {
      // console.log(res);
      this.$message.info(res.msg);
    },
    beforeUpload(file) {

      this.uploadData = { username: this.userInfo.username };

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

    // //手机号校验
    // phoneNumber(phone) {
    //   const regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    //   if (!regPhone.test(phone)) {
    //     this.$message.error('手机号填写有误');
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },

  },
  computed: {
    userInfo() {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.userInfo))
      user.orgIdCode = parseInt(user.orgId)
      return user
    },
    // tables: function () {
    //   var search = this.search;
    //   if (search) {
    //     return this.tableData.filter(function (dataNews) {
    //       return Object.keys(dataNews).some(function (key) {
    //         return String(dataNews[key]).toLowerCase().indexOf(search) > -1
    //       })
    //     })
    //   }
    //   return this.tableData
    // }
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
.box {
  .block {
    margin-top: 20px;
    // width: 18%;
    .tblable {
      width: 100px;
      display: inline-block;
      text-align: right;
    }
    .el-input,
    .el-select {
      width: 65%;
    }
    .el-date-editor {
      width: 62%;
    }
  }
}
</style>
