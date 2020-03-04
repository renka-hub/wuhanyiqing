<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="姓名" >
        <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证" >
        <el-input v-model="dataForm.idCard" placeholder="身份证"></el-input>
      </el-form-item>
      <el-form-item label="手机号" >
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="年龄" >
        <el-input v-model="dataForm.age" placeholder="年龄"></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-input v-model="dataForm.sex" placeholder="性别"></el-input>
      </el-form-item>
      <el-form-item label="街道" >
        <el-input v-model="dataForm.street" placeholder="街道"></el-input>
      </el-form-item>
      <el-form-item label="社区" >
        <el-input v-model="dataForm.community" placeholder="社区"></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="dataForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="风险级别" >
        <el-input v-model="dataForm.riskLevel" placeholder="风险级别"></el-input>
      </el-form-item>
      <el-form-item label="风险原因类型" >
        <el-input v-model="dataForm.riskReasonType" placeholder="风险原因类型"></el-input>
      </el-form-item>
      <el-form-item label="风险原因类型描述" >
        <el-input v-model="dataForm.riskReasonTypeDesc" placeholder="风险原因类型描述"></el-input>
      </el-form-item>
      <!--<el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        dataForm: {
            id:'',
            name: '',
            community:'',
            riskLevel:'',
            statisticalDate:'',
            mobile:'',
            street:'',
            age:'',
            sex:'',
            idCard:'',
            address:'',
            riskReasonType:'',
            riskReasonTypeDesc:''
        },

        dataRule: {

        }
      }
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
                          this.dataForm.name=data.entity.name
                          this.dataForm.community=data.entity.community
                          this.dataForm.riskLevel=data.entity.riskLevel
                          this.dataForm.statisticalDate=data.entity.statisticalDate
                          this.dataForm.mobile=data.entity.mobile
                          this.dataForm.street=data.entity.street
                          this.dataForm.age=data.entity.age
                          this.dataForm.sex=data.entity.sex
                          this.dataForm.idCard=data.entity.idCard
                          this.dataForm.address=data.entity.address
                          this.dataForm.riskReasonType=data.entity.riskReasonType
                          this.dataForm.riskReasonTypeDesc=data.entity.riskReasonTypeDesc
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
                  name: this.dataForm.name,
                  community:this.dataForm.community,
                  riskLevel:this.dataForm.riskLevel,
                  mobile:this.dataForm.mobile,
                  street:this.dataForm.street,
                  age:this.dataForm.age,
                  sex:this.dataForm.sex,
                  idCard:this.dataForm.idCard,
                  address:this.dataForm.address,
                  riskReasonType:this.dataForm.riskReasonType,
                  riskReasonTypeDesc:this.dataForm.riskReasonTypeDesc
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
