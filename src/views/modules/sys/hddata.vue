<template>
    <div class="mod-user">
        <div v-if="mainVisible">
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
                        <el-select v-model="dataForm.street" @change = "getCommunity()"  clearable placeholder="请选择镇/街">
                            <el-option
                                    v-for="item in opt1"
                                    :key="item.adminUnitId"
                                    :label="item.adminUnitName"
                                    :value="item.adminUnitId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="dataForm.community" :disabled = "itDisabled"  clearable placeholder="请选择村/社区">
                            <el-option
                                    v-for="item in opt2"
                                    :key="item.adminUnitId"
                                    :label="item.adminUnitName"
                                    :value="item.adminUnitId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="col-xs-4">
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
                    <el-form-item>
                        <el-input v-model="dataForm.personName" placeholder="姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="dataForm.certId" placeholder="身份证号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getDataList(dataForm.statisticalDate)" type="primary">查询</el-button>
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
                        label="身份证">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        header-align="center"
                        width="50"
                        align="center"
                        label="性别">
                </el-table-column>
                <el-table-column
                        prop="mobilePhoneNum"
                        header-align="center"
                        align="center"
                        label="联系方式">
                </el-table-column>
                <el-table-column
                        prop="address"
                        header-align="center"
                        align="center"
                        label="常住地址">
                </el-table-column>
                <el-table-column
                        prop="resideType"
                        header-align="center"
                        align="center"
                        width="80"
                        label="居住类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.resideType*1 == 1">集体宿舍</div>
                        <div v-if="scope.row.resideType*1 == 2">租房</div>
                        <div v-if="scope.row.resideType*1 == 3">居家</div>
                        <div v-if="scope.row.resideType*1 == 4">其他</div>
                    </template>
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
                        prop="career"
                        header-align="center"
                        width="80"
                        align="center"
                        label="职业">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        header-align="center"
                        align="center"
                        width="60"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.personId)">详情
                        </el-button>
                    </template>
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
        </div>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="editorBack"></add-or-update>
    </div>
</template>

<script>
    import AddOrUpdate from './hxhdEditor'

    export default {
        data() {
            return {
                opt1: [
                ],
                opt2: [
                ],
                dataForm: {
                    statisticalDate:'',
                    personName: '',
                    certId: '',
                    adminUnitId: '',
                    community: '',
                    street: '',
                    riskLevel:''
                },
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
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                mainVisible: true,
                itDisabled:true
            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
        },
        mounted () {
            this.getMaxDate();
            this.selectList()
        },
        methods: {
            editorBack(){
                this.getDataList(this.dataForm.statisticalDate)
            },
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
            getCommunity(){
                this.dataForm.community = ''
               if(this.dataForm.street == ''){
                   this.itDisabled = true
                   return
               }
                this.$http({
                    url: this.$http.adornUrl(`/admin/getChildListByParentId`),
                    method: 'get',
                    params: this.$http.adornParams({
                        superId:this.dataForm.street
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.itDisabled = false
                        this.opt2 = data.data
                    }
                    //this.dataListLoading = false
                });
            },
            // 获取数据列表
            getDataList(date) {
                this.mainVisible = true
                this.addOrUpdateVisible = false
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/person/list'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'personName': this.dataForm.personName,
                        'townId':this.dataForm.street,
                        'villageId':this.dataForm.community,
                        'certId': this.dataForm.certId,
                        checkDate:date,
                        riskLevel:this.dataForm.riskLevel == -1 ? '' : this.dataForm.riskLevel
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.records
                        this.totalPage = data.page.total
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
                this.mainVisible = false
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
        }
    }
</script>
