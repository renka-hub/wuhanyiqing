<template>
    <div class="mod-user">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <div class="col-xs-4">
                <el-form-item>
                    <div class="block">
                        <el-date-picker
                                v-model="dataForm.statisticalDate"
                                type="date"
                                :clearable = "false"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="dataForm.riskLevel" clearable placeholder="请选择风险级别">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="col-xs-4">
                <el-form-item>
                    <el-select v-model="dataForm.street" @change="getCommunity()" clearable placeholder="请选择镇/街">
                        <el-option
                                v-for="item in opt1"
                                :key="item.adminUnitId"
                                :label="item.adminUnitName"
                                :value="item.adminUnitId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="dataForm.community" :disabled="itDisabled" clearable placeholder="请选择村/社区">
                        <el-option
                                v-for="item in opt2"
                                :key="item.adminUnitId"
                                :label="item.adminUnitName"
                                :value="item.adminUnitId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="dataForm.name" placeholder="姓名" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getDataList(dataForm.statisticalDate)" type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="download()" type="primary">导出数据</el-button>
                </el-form-item>
            </div>

        </el-form>
        <el-table
                :data="dataList"
                border
                v-loading="dataListLoading"
                @selection-change="selectionChangeHandle"
                style="width: 100%;">
            <el-table-column
                    prop="personId"
                    header-align="center"
                    align="center"
                    width="85"
                    label="编号">
            </el-table-column>
            <el-table-column
                    prop="personName"
                    header-align="center"
                    align="center"
                    width="80"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="certId"
                    header-align="center"
                    align="center"
                    label="身份证号">
            </el-table-column>
            <el-table-column
                    prop="gender"
                    header-align="center"
                    width="50"
                    align="center"
                    label="性别">
            </el-table-column>
            <el-table-column
                    prop="birthDate"
                    header-align="center"
                    align="center"
                    width="50"
                    label="年龄">
                <template slot-scope="scope">
                    {{Math.ceil((new Date()-new Date(scope.row.birthDate))/1000/60/60/24/365)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="mobilePhoneNum"
                    header-align="center"
                    align="center"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="adminTownName"
                    header-align="center"
                    align="center"
                    width="80"
                    label="镇/街">
            </el-table-column>
            <el-table-column
                    prop="adminVillageName"
                    header-align="center"
                    align="center"
                    width="80"
                    label="村/社区">
            </el-table-column>
            <el-table-column
                    prop="address"
                    header-align="center"
                    align="center"
                    label="常住地">
            </el-table-column>
            <el-table-column
                    prop="riskLevel"
                    header-align="center"
                    align="center"
                    width="80"
                    label="风险级别">
                <template slot-scope="scope">
                    <div v-if="scope.row.riskLevel == 0">低风险</div>
                    <div v-if="scope.row.riskLevel == 1">中风险</div>
                    <div v-if="scope.row.riskLevel == 2">高风险</div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="ruleDesc"
                    header-align="center"
                    align="center"
                    label="风险判断规则">
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
    import AddOrUpdate from './yqdata-add-or-update'

    export default {
        data() {
            return {
                options: [
                    {
                        value: -1,
                        label: '全部'
                    },
                    {
                        value: 0,
                        label: '低风险'
                    }, {
                        value: 1,
                        label: '中风险'
                    },
                    {
                        value: 2,
                        label: '高风险'
                    }
                ],
                dataForm: {
                    name: '',
                    community: '',
                    riskLevel: 2,
                    statisticalDate: '',
                    street: ''
                },
                opt1: [],
                opt2: [],
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                itDisabled: true
            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
        },
        mounted () {
            // var myDate = new Date();
            // this.dataForm.statisticalDate = myDate.getFullYear() + '-' + (myDate.getMonth() > 8 ? (myDate.getMonth()+1) : '0' + (myDate.getMonth()+1)) + '-' + (myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate())
            this.getMaxDate();
            this.selectList()
        },
        methods: {
            getMaxDate(){
                this.$http({
                    url: this.$http.adornUrl(`/risk/evaluate/getMaxDate`),
                    method: 'get',
                    params: this.$http.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataForm.statisticalDate = data.maxDate
                        this.getDataList(data.maxDate)
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
            },
            getCommunity() {
                this.dataForm.community = ''
                if (this.dataForm.street == '') {
                    this.itDisabled = true
                    return
                }
                this.$http({
                    url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                    method: 'get',
                    params: this.$http.adornParams({
                        superId: this.dataForm.street
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.itDisabled = false
                        this.opt2 = data.data
                    }
                    //this.dataListLoading = false
                });
            },
            download() {
                var base = process.env.VUE_APP_PROXY_TARGET + "/analyze/downloadExcel?personName=" + this.dataForm.name
                if (this.dataForm.community == null) {
                    base = base + "&village="
                } else {
                    base = base + "&village=" + this.dataForm.community
                }
                if (this.dataForm.riskLevel == null) {
                    base = base + "&riskLevel="
                } else {
                    base = base + "&riskLevel=" + this.dataForm.riskLevel
                }
                if (this.dataForm.statisticalDate == null) {
                    base = base + "&checkDate="
                } else {
                    base = base + "&checkDate=" + this.dataForm.statisticalDate
                }
                if (this.dataForm.street == null) {
                    base = base + "&townId="
                } else {
                    base = base + "&townId=" + this.dataForm.street
                }
                window.open(base, '_blank')
            },
            dateFormat(row) {
                return row.statisticalDate.substr(0, 10)
            },
            // 获取数据列表
            getDataList(date) {
                let paramsEntity = {};
                paramsEntity.page = this.pageIndex
                paramsEntity.limit = this.pageSize
                paramsEntity.checkDate = date
                paramsEntity.townId = this.dataForm.street
                paramsEntity.villageId = this.dataForm.community
                paramsEntity.riskLevel = this.dataForm.riskLevel == -1 ? '' : this.dataForm.riskLevel
                paramsEntity.personName = this.dataForm.name
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/analyze/list'),
                    method: 'post',
                    data: this.$http.adornData(paramsEntity
                    )
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.records
                        this.totalPage = data.page.total
                        if (data.page.records.length < 1) {
                            this.totalPage = 0
                        }
                    } else {
                        this.dataList = []
                        this.totalPage = 0
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 多选
            selectionChangeHandle(val) {
                this.dataListSelections = val
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
        }
    }
</script>
