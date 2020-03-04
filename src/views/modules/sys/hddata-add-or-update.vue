<template>
  <el-row>
    <el-dialog
            :title="!dataForm.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="核定日期" >
          <el-input v-model="dataForm.checkDate" placeholder="核定日期"></el-input>
        </el-form-item>
        <el-form-item label="行政区" >
          <el-input v-model="dataForm.adminUnitId" placeholder="行政区"></el-input>
        </el-form-item>

        <el-form-item label="姓名" >
          <el-input v-model="dataForm.personName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证" >
          <el-input v-model="dataForm.certId" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
        </el-form-item>
        <!--<el-form-item label="年龄" >
          <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
        </el-form-item>-->

        <el-form-item label="住址" >
          <el-input v-model="dataForm.address" placeholder="住址"></el-input>
        </el-form-item>
        <el-form-item label="居住类型" >
          <el-input v-model="dataForm.resideType" placeholder="居住类型"></el-input>
        </el-form-item>
        <el-form-item label="联系方法" >
          <el-input v-model="dataForm.mobilePhoneNum" placeholder="联系方法"></el-input>
        </el-form-item>
        <el-form-item label="职业" >
          <el-input v-model="dataForm.career" placeholder="职业"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update  ref="addOrUpdate" ></add-or-update>
  </el-row>
</template>

<script>
    import AddOrUpdate from './trip-add-info'
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        dataForm: {
            id:'',
            checkDate:'',
            adminUnitId:'',
            personName: '',
            certId:'',
            gender:'',
            address:'',
            resideType:'',
            mobilePhoneNum:'',
            career:'',
            //age:'',
        },

        dataRule: {

        }
      }
    },
      components: {
          AddOrUpdate
      },
    methods: {
      init (id) {
            this.dataForm.id = id || 0
            this.$http({
              url: this.$http.adornUrl(`/yqdata/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
                this.visible = true
              if (data && data.code === 0) {
                    this.dataForm.adminUnitId=data.entity.adminUnitId
                    this.dataForm.checkDate=data.entity.checkDate
                    this.dataForm.personName=data.entity.personName
                    this.dataForm.mobilePhoneNum=data.entity.mobilePhoneNum
                    //this.dataForm.age=data.entity.age
                    this.dataForm.gender=data.entity.gender
                    this.dataForm.certId=data.entity.certId
                    this.dataForm.address=data.entity.address
                    this.dataForm.resideType=data.entity.resideType
                    this.dataForm.career=data.entity.career
              }
            })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/yqdata/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                  id:this.dataForm.id || undefined,
                  //personName: this.dataForm.personName,
                  personName:this.dataForm.personName,
                  mobilePhoneNum:this.dataForm.mobilePhoneNum,
                  gender:this.dataForm.gender,
                  certId:this.dataForm.certId,
                  //age:this.dataForm.age,
                  address:this.dataForm.address,
                  resideType:this.dataForm.resideType,
                  career:this.dataForm.career
                  // statisticalDate:this.dataForm.statisticalDate,
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
