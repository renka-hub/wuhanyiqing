<template>
    <div class="mod-user">
        <h1 style="text-align: center">人员信息核定</h1>
        <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm"
                 @keyup.enter.native="dataFormSubmit()" id="formList">
            <div style="width: 100%;background-color: #d7d5d5;padding-left: 3%">
                <h3 style="line-height: 55px;">基本信息</h3>
                <el-row style="margin-top: -25px">
                    <el-col :span="9">
                        <el-form-item label="核定日期：" prop="checkDate">
                            <el-date-picker
                                    v-model="dataForm.checkDate"
                                    type="datetime"
                                    :clearable="false"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请选择日期"
                                    format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="镇/街：" prop="street">
                            <el-select v-model="dataForm.street" @change="getCommunity()" placeholder="请选择">
                                <el-option
                                        v-for="item in opt1"
                                        :key="item.adminUnitId"
                                        :label="item.adminUnitName"
                                        :value="item.adminUnitId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="村/社区：" prop="community">
                            <el-select v-model="dataForm.community" placeholder="请选择">
                                <el-option
                                        v-for="item in opt2"
                                        :key="item.adminUnitId"
                                        :label="item.adminUnitName"
                                        :value="item.adminUnitId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="姓名：" prop="personName">
                            <el-input v-model="dataForm.personName" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="身份证号：" placeholder="身份证号" prop="idCardNum">
                            <el-input v-model="dataForm.idCardNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="性别：" prop="gender">
                            <el-select v-model="dataForm.gender" placeholder="">
                                <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="出生日期：">
                            <el-date-picker
                                    v-model="dataForm.birthDate"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="请选出生日期"
                                    format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="住址：" prop="address">
                            <el-input v-model="dataForm.address" placeholder="请填写住址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="居住类型：" prop="liveType">
                            <el-select v-model="dataForm.liveType" placeholder="">
                                <el-option
                                        v-for="item in options3"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="联系方式：" prop="phoneNumber">
                            <el-input v-model="dataForm.phoneNumber" placeholder="请填写联系方式"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="职业：" prop="professional">
                            <el-input v-model="dataForm.professional" placeholder="请填写职业"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div style="width: 100%;background-color: #d7d5d5;padding-left: 3%">
                <h3 style="line-height: 55px;">健康信息</h3>
                <el-row style="margin-top: -25px">
                    <el-col :span="24">
                        <el-checkbox v-model="checked1">咳嗽</el-checkbox>
                        <el-checkbox v-model="checked2">胸闷</el-checkbox>
                        <el-checkbox v-model="checked3">乏力</el-checkbox>
                        <el-checkbox v-model="checked4">气促</el-checkbox>
                        <el-checkbox v-model="checked5">其他呼吸道症状</el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="体温：">
                            <el-input v-model="dataForm.temperature" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item label="其他症状：">
                            <el-input v-model="dataForm.otherSymptoms" placeholder="" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="感染情况：">
                            <el-radio v-model="radio" label="0">未感染</el-radio>
                            <el-radio v-model="radio" label="1">确诊</el-radio>
                            <el-radio v-model="radio" label="2">疑似</el-radio>
                            <el-radio v-model="radio" label="3">已出院</el-radio>
                            <el-radio v-model="radio" label="4">无症状感染</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="隔离情况：">
                            <el-radio v-model="radio1" label="1">未隔离</el-radio>
                            <el-radio v-model="radio1" label="2">居家观察</el-radio>
                            <el-radio v-model="radio1" label="3">集中隔离</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="隔离开始日期：">
                            <el-date-picker
                                    v-model="dataForm.startDate"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请选择隔离开始日期"
                                    format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="隔离解除日期：">
                            <el-date-picker
                                    v-model="dataForm.endDate"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="请选择隔离解除日期"
                                    format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="核酸检测情况：">
                            <el-radio v-model="radio2" label="1">未检测</el-radio>
                            <el-radio v-model="radio2" label="2">已检测</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div id="peoInfo" style="width: 100%;background-color: #d7d5d5;padding: 0 2% 2% 2%;">
                <h3 style="line-height: 55px;">来长人员信息</h3>
                <el-row style="margin-top: -25px">
                    <el-col :span="24" id="province">
                        <el-form-item label="曾经暴露的高风险地区：" prop="riskRegion">
                            <el-select v-model="dataForm.provinceId" @change="getCity()" placeholder="请选择省">
                                <el-option
                                        v-for="item in options0"
                                        :key="item.adminUnitId"
                                        :label="item.adminUnitName"
                                        :value="item.adminUnitId">
                                </el-option>
                            </el-select>
                            <el-select v-model="dataForm.riskRegion" :disabled="itDisabled" placeholder="请选择市"
                                       style="margin-left: 3%">
                                <el-option
                                        v-for="item in options11"
                                        :key="item.adminUnitId"
                                        :label="item.adminUnitName"
                                        :value="item.adminUnitId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="暴露地区住址：" prop="riskAddress">
                            <el-input v-model="dataForm.riskAddress" placeholder="请填写住址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="15">
                        <el-form-item label="来长交通工具：">
                            <el-input v-model="dataForm.vehicle" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <div id="btn">
                <el-form-item>
                    <el-button @click="dataFormSubmit()" type="primary">保存</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="giveUp()" type="warning">放弃</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dataForm: {
                    checkDate: '',
                    street: '',
                    community: '',
                    adminUnitId: '',
                    personName: '',
                    idCardNum: '',
                    gender: '',
                    birthDate: '',
                    address: '',
                    liveType: '',
                    phoneNumber: '',
                    professional: '',

                    startDate: '',
                    endDate: '',
                    otherSymptoms: '',
                    temperature: '',
                    provinceId: '',
                    riskRegion: '',
                    riskAddress: '',
                    vehicle: ''
                },
                dataRule: {
                    street: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    community: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    liveType: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    phoneNumber: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    provinceId: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    riskRegion: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    riskAddress: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    checkDate: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    personName: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    idCardNum: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    gender: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                    professional: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                    ],
                },
                checked1: false,
                checked2: false,
                checked3: false,
                checked4: false,
                checked5: false,
                radio: '',
                radio1: '',
                radio2: '',
                dataList: [],
                opt1: [],
                opt2: [],
                options0: [],
                options11: [],
                options2: [
                    {
                        value: '男',
                        label: '男'
                    },
                    {
                        value: '女',
                        label: '女'
                    }
                ],
                options3: [
                    {
                        value: '1',
                        label: '集体宿舍'
                    },
                    {
                        value: '2',
                        label: '租房'
                    },
                    {
                        value: '3',
                        label: '居家'
                    },
                    {
                        value: '4',
                        label: '其他'
                    }
                ],
                personId: '',
                dataListLoading: false,
                addOrUpdateVisible: false,
                itDisabled: true
            }
        },
        components: {},
        activated() {

        },
        mounted() {
            this.selectList()
        },
        methods: {
            getCity() {
                this.itDisabled = false
                this.$http({
                    url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                    method: 'get',
                    params: this.$http.adornParams({
                        superId: this.dataForm.provinceId
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.options11 = data.data
                    }
                });
            },
            getProvince(id) {
                this.itDisabled = false
                this.$http({
                    url: this.$http.adornUrl(`/admin/getParentIdById`),
                    method: 'get',
                    params: this.$http.adornParams({
                        id: id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        if (data.entity == null) {
                            this.dataForm.riskRegion = ''
                            this.dataForm.provinceId = ''
                        } else {
                            this.dataForm.provinceId = data.entity.superAdminUnit
                        }
                    } else {
                        this.dataForm.riskRegion = ''
                    }
                    //this.dataListLoading = false
                });
            },
            getCommunity() {
                this.dataForm.community = ''
                this.$http({
                    url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                    method: 'get',
                    params: this.$http.adornParams({
                        superId: this.dataForm.street
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.opt2 = data.data
                    }
                    //this.dataListLoading = false
                });
            },
            getStreet(id) {
                this.$http({
                    url: this.$http.adornUrl(`/admin/getParentIdById`),
                    method: 'get',
                    params: this.$http.adornParams({
                        id: id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        if (data.entity == null) {
                            this.dataForm.street = ''
                            this.dataForm.community = ''
                        } else {
                            this.dataForm.street = data.entity.superAdminUnit
                        }
                    } else {
                        this.dataForm.community = ''
                    }
                    //this.dataListLoading = false
                });
            },
            selectList() {
                this.$http({
                    url: this.$http.adornUrl(`/admin/getTownList`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.opt1 = data.data
                    }
                    //this.dataListLoading = false
                });
                this.$http({
                    url: this.$http.adornUrl(`/admin/getVillageList`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.opt2 = data.data
                    }
                    //this.dataListLoading = false
                });
                this.$http({
                    url: this.$http.adornUrl(`/admin/getAdminUnitByLevel/0`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.options0 = data.data
                    }
                    //this.dataListLoading = false
                });
                this.$http({
                    url: this.$http.adornUrl(`/admin/getAdminUnitByLevel/1`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.options11 = data.data
                    }
                    //this.dataListLoading = false
                });
            },
            init(id) {
                this.personId = id;
                this.$http({
                    url: this.$http.adornUrl(`/person/info/${id}`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        var lists = data.entity
                        if (lists == null) {
                            return
                        }
                        this.dataForm.checkDate = lists.checkDate
                        this.getStreet(lists.adminUnitId)
                        this.dataForm.community = lists.adminUnitId
                        this.dataForm.personName = lists.personName
                        this.dataForm.idCardNum = lists.certId
                        this.dataForm.address = lists.address
                        this.dataForm.gender = lists.gender
                        this.dataForm.birthDate = lists.birthDate
                        this.dataForm.liveType = lists.resideType + ''
                        this.dataForm.phoneNumber = lists.mobilePhoneNum
                        this.dataForm.professional = lists.career
                        this.dataForm.provinceId = lists.epidemicUnitId
                    }
                    //this.dataListLoading = false
                });
                this.$http({
                    url: this.$http.adornUrl(`/risk/evaluate/info/${id}`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        var lists = data.addition_info
                        if (lists == null) {
                            return
                        }
                        this.checked1 = lists.isCough > 0 ? true : false
                        this.checked2 = lists.isChestTight > 0 ? true : false
                        this.checked3 = lists.isWeak > 0 ? true : false
                        this.checked4 = lists.isDyspnea > 0 ? true : false
                        this.checked5 = lists.isOtherSymptom > 0 ? true : false
                        this.dataForm.temperature = lists.bodyTemperature
                        this.dataForm.otherSymptoms = lists.otherSympotom
                        this.radio = lists.diagnoseStatus + ''
                        this.radio1 = lists.quarantineType + ''
                        this.dataForm.startDate = lists.quarStartDate
                        this.dataForm.endDate = lists.quarFinishDate
                        this.radio2 = lists.isRnaTest + ''
                        this.dataForm.provinceId = this.getProvince(lists.epidemicUnitId)
                        this.dataForm.riskRegion = lists.epidemicUnitId
                        this.dataForm.riskAddress = lists.riskAreaAddress
                        this.dataForm.vehicle = lists.vehicle

                        if(lists.epidemicUnitId!=null&&lists.epidemicUnitId!=0){
                            var isProvince = false
                            this.options0.forEach(pObj=>{
                                if(lists.epidemicUnitId==pObj.adminUnitId){
                                    this.dataForm.provinceId = pObj.adminUnitId
                                    isProvince = true
                                    this.$http({
                                        url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                                        method: 'get',
                                        params: this.$http.adornParams({
                                            superId: pObj.adminUnitId
                                        })
                                    }).then(({data}) => {
                                        if (data && data.code === 0) {
                                            this.options11 = data.data
                                        }
                                    });

                                }
                            })
                            if(!isProvince){
                                this.options0.forEach(pObj=>{

                                    this.$http({
                                        url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                                        method: 'get',
                                        params: this.$http.adornParams({
                                            superId: pObj.adminUnitId
                                        })
                                    }).then(({data}) => {
                                        if (data && data.code === 0) {
                                            var checkedCity = false
                                            data.data.forEach(cityOBj=>{
                                                if(lists.epidemicUnitId==cityOBj.adminUnitId){
                                                    this.dataForm.riskRegion = cityOBj.adminUnitId
                                                    this.dataForm.provinceId = cityOBj.superAdminUnit
                                                    checkedCity = true
                                                }

                                            })
                                            if(checkedCity){
                                                this.options11 = data.data
                                            }
                                        }
                                    });

                                })


                            }
                        }

                    }
                })
            },
            dataFormSubmit() {
                var that = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        //来长信息省份&市
                        this.$http({
                            url: this.$http.adornUrl(`/person/update`),
                            method: 'post',
                            data: this.$http.adornData({
                                personId: this.personId,
                                checkDate: this.dataForm.checkDate,
                                adminUnitId: this.dataForm.community,
                                personName: this.dataForm.personName,
                                certId: this.dataForm.idCardNum,
                                address: this.dataForm.address,
                                gender: this.dataForm.gender,
                                birthDate: this.dataForm.birthDate,
                                resideType: this.dataForm.liveType,
                                mobilePhoneNum: this.dataForm.phoneNumber,
                                career: this.dataForm.professional
                            })
                        }).then(({data}) => {
                            if (data.code == 0) {
                                that.addInfo1()
                            }
                        });
                    }
                })
            },
            addInfo1() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        var selectprovinceId = this.dataForm.provinceId;
                        var selectriskRegion = this.dataForm.riskRegion;
                        var epidemic_unit_id = null
                        if(selectriskRegion&&selectriskRegion!=''){
                            epidemic_unit_id = selectriskRegion
                        }else if(selectprovinceId&&selectprovinceId!=''){
                            epidemic_unit_id = selectprovinceId

                        }

                        this.$http({
                            url: this.$http.adornUrl(`/risk/evaluate/update`),
                            method: 'post',
                            data: this.$http.adornData({
                                personId: this.personId,
                                isCough: this.checked1 == false ? 0 : 1,
                                isChestTight: this.checked2 == false ? 0 : 1,
                                isWeak: this.checked3 == false ? 0 : 1,
                                isDyspnea: this.checked4 == false ? 0 : 1,
                                isOtherSymptom: this.checked5 == false ? 0 : 1,
                                bodyTemperature: this.dataForm.temperature,
                                otherSympotom: this.dataForm.otherSymptoms,
                                diagnoseStatus: this.radio,
                                quarantineType: this.radio1,
                                quarStartDate: this.dataForm.startDate,
                                mobilePhoneNum: this.dataForm.phoneNumber,
                                quarFinishDate: this.dataForm.endDate,
                                isRnaTest: this.radio2,
                                riskAreaAddress: this.dataForm.riskAddress,
                                epidemicUnitId: epidemic_unit_id,
                                checkDate: this.dataForm.checkDate,
                                vehicle: this.dataForm.vehicle,

                            })
                        }).then(({data}) => {
                            if (data.code == 0)
                                this.$emit('refreshDataList')
                        });
                    }
                })
            },
            giveUp() {
                this.$emit('refreshDataList')
            },
        }
    }
</script>
<style lang="scss" scoped>
    /deep/ #formList {
        .el-form-item {
            width: 100%;
        }
        .el-form-item--medium .el-form-item__content {
            width: 70%;
        }
        .el-checkbox {
            line-height: 80px;
            margin-left: 9%;
        }
        .el-input--medium .el-input__inner {
            height: 30px;
            line-height: 30px;
        }
        .el-form-item__label {
            width: 110px;
        }
        #peoInfo {
            .el-form-item__label {
                width: 180px;
            }
        }
        #btn {
            display: flex;
            margin-left: 75%;
            margin-top: 3%;
            .el-form-item {
                width: auto;
                margin-left: 10%;
            }
        }
    }
</style>