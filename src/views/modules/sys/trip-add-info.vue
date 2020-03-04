<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="出发地区" >
        <el-select v-model="dataForm.startPlace" placeholder="请选择出发地">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出发日期" >
        <el-date-picker
                v-model="dataForm.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择出发日期"
                format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="出发地区住址" >
        <el-input v-model="dataForm.startAddress" placeholder="出发地区住址"></el-input>
      </el-form-item>

      <el-form-item label="到达地区" >
        <el-select v-model="dataForm.arrivePlace" placeholder="请选择出发地">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="到达日期" >
        <el-date-picker
                v-model="dataForm.arriveDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择到达日期"
                format="yyyy 年 MM 月 dd 日">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到达地区住址" >
        <el-input v-model="dataForm.arriveAddress" placeholder="到达地区住址"></el-input>
      </el-form-item>

      <el-form-item label="同行人" >
        <el-input v-model="dataForm.partner" placeholder="多个同行人之间使用逗号分隔"></el-input>
      </el-form-item>
      <el-form-item label="停留地点" >
        <el-input v-model="dataForm.stayAddress" placeholder="中途停留地，多个地点之间使用逗号分隔"></el-input>
      </el-form-item>
      <el-form-item label="交通工具" >
        <el-input v-model="dataForm.transportation" placeholder="需提供航班班次、火车车次信息"></el-input>
      </el-form-item>
      <el-form-item label="旅行原因" >
        <el-input v-model="dataForm.travelReason" placeholder="街道"></el-input>
      </el-form-item>
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
            startPlace: '',
            startDate:'',
            startAddress:'',
            arrivePlace: '',
            arriveDate:'',
            arriveAddress:'',
            partner:'',
            stayAddress:'',
            transportation:'',
            travelReason:'',
        },
        dataRule: {

        }
      }
    },
    methods: {
      init (id) {
            this.dataForm.id = id || 0
            this.$http({
              url: this.$http.adornUrl(`/hddata/trip/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
                this.visible = true
              if (data && data.code === 0) {
                    this.dataForm.id = data.entity.id
                    this.dataForm.startPlace=data.entity.startPlace
                    this.dataForm.startDate=data.entity.startDate
                    this.dataForm.startAddress=data.entity.startAddress

                    this.dataForm.arrivePlace=data.entity.arrivePlace
                    this.dataForm.arriveDate=data.entity.arriveDate
                    this.dataForm.arriveAddress=data.entity.arriveAddress

                    this.dataForm.partner=data.entity.partner
                    this.dataForm.stayAddress=data.entity.stayAddress
                    this.dataForm.transportation=data.entity.transportation
                    this.dataForm.travelReason=data.entity.travelReason
              }
            })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/hddata/trip/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                  id:this.dataForm.id || undefined,
                  startDate:this.dataForm.startDate,
                  startAddress:this.dataForm.startAddress,
                  arrivePlace:this.dataForm.arrivePlace,
                  arriveDate:this.dataForm.arriveDate,
                  arriveAddress:this.dataForm.arriveAddress,
                  partner:this.dataForm.partner,
                  stayAddress:this.dataForm.stayAddress,
                  transportation:this.dataForm.transportation,
                  travelReason:this.dataForm.travelReason
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
