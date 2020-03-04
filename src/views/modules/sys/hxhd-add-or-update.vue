<template>
    <el-row>
        <el-dialog
                title="旅行信息"
                :close-on-click-modal="false"
                :visible.sync="visible"
                style="width: 110%;">
            <el-form :model="dataForm" id="dialogFrom" :rules="dataRule" ref="dataForm"
                     @keyup.enter.native="dataFormSubmit()"
                     label-width="100px">
                <div class="it_back">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="出发地区">
                                <el-select v-model="dataForm.origin" placeholder="">
                                    <el-option
                                            v-for="item in options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出发日期">
                                <el-date-picker
                                        v-model="dataForm.departDate"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择出发日期"
                                        format="yyyy 年 MM 月 dd 日">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="23">
                            <el-form-item label="出发地区住址">
                                <el-input v-model="dataForm.originAddress" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </div>
                <div class="it_back">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="到达地区">
                                <el-select v-model="dataForm.destination" placeholder="">
                                    <el-option
                                            v-for="item in options2"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="到达日期">
                                <el-date-picker
                                        v-model="dataForm.arriveDate"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="选择到达日期"
                                        format="yyyy 年 MM 月 dd 日">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="23">
                            <el-form-item label="到达地区住址">
                                <el-input v-model="dataForm.destinationAddress" placeholder=""></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <div class="it_back" style="padding-bottom: 1%">
                    <el-form-item label="同性人">
                        <el-input v-model="dataForm.resideType" placeholder="同行人姓名。多个同行人用逗号分隔"></el-input>
                    </el-form-item>
                    <el-form-item label="停留地点">
                        <el-input v-model="dataForm.mobilePhoneNum" placeholder="中途停留地。多个停留地用逗号分隔"></el-input>
                    </el-form-item>
                    <el-form-item label="交通工具">
                        <el-input v-model="dataForm.career" placeholder="需提供航班班次、火车车次信息"></el-input>
                    </el-form-item>
                    <el-form-item label="旅行原因">
                        <el-input v-model="dataForm.career" placeholder=""></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
        </el-dialog>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update ref="addOrUpdate"></add-or-update>
    </el-row>
</template>

<script>
    import AddOrUpdate from './trip-add-info'

    export default {
        data() {
            return {
                visible: false,
                roleList: [],
                dataForm: {
                    origin: '',
                    departDate: '',
                    originAddress: '',
                    destination: '',
                    arriveDate: '',
                    destinationAddress: '',
                    address: '',
                    resideType: '',
                    mobilePhoneNum: '',
                    career: '',
                    //age:'',
                },
                options1: [],
                options2: [],

            }
        },
        components: {
            AddOrUpdate
        },
        methods: {
            init(id) {
                this.dataForm.id = id || 0
                this.$http({
                    url: this.$http.adornUrl(`/yqdata/info/${this.dataForm.id}`),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({data}) => {
                    this.visible = true
                    if (data && data.code === 0) {
                        this.dataForm.adminUnitId = data.entity.adminUnitId
                        this.dataForm.checkDate = data.entity.checkDate
                        this.dataForm.personName = data.entity.personName
                        this.dataForm.mobilePhoneNum = data.entity.mobilePhoneNum
                        //this.dataForm.age=data.entity.age
                        this.dataForm.gender = data.entity.gender
                        this.dataForm.certId = data.entity.certId
                        this.dataForm.address = data.entity.address
                        this.dataForm.resideType = data.entity.resideType
                        this.dataForm.career = data.entity.career
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$emit('refreshDataList')
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .it_back {
        width: 100%;
        background-color: #d7d5d5;
        padding: 3% 2% 0% 2%;
        margin-top: 2%;
    }

    /deep/ #dialogFrom {
        .el-form-item__label {
            width: 100px;
        }
        .el-input--medium .el-input__inner{
            height: 30px;
            line-height: 30px;
        }
    }

</style>