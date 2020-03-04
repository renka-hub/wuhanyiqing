<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <div class="col-xs-4">
        <el-form-item>
          <el-button @click="addOrUpdateHandle()" type="primary">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()" type="primary">查询</el-button>
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
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
              prop="startPlace"
              header-align="center"
              align="center"
              width="80"
              label="出发地区">
      </el-table-column>
      <el-table-column
        prop="startDate"
        header-align="center"
        align="center"
        width="80"
        label="出发日期">
      </el-table-column>
      <el-table-column
        prop="arrivePlace"
        header-align="center"
        align="center"
        label="到达地区">
      </el-table-column>
      <el-table-column
        prop="arriveDate"
        header-align="center"
        align="center"
        label="到达日期">
      </el-table-column>
      <el-table-column
        prop="transportation"
        header-align="center"
        align="center"
        label="交通工具">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">详情</el-button>
          <el-button  type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './trip-add-info'
  export default {
    data () {
      return {
          options: [
              {
                  value:'',
                  label:'全部'
              },
              {
                  value: '1',
                  label: '区域1'
              }, {
                  value: '2',
                  label: '区域2'
              },
              {
                  value: '3',
                  label: '区域3'
              }
          ],
        dataForm: {
            name: '',
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/hddata/trip/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
              'id':1
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
        // 删除
        deleteHandle (id) {
            var ids = id ? [id] : this.dataListSelections.map(item => {
                return item.userId
            })
            this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    url: this.$http.adornUrl('/trip/delete'),
                    method: 'post',
                    data: this.$http.adornData(ids, false)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1500,
                            onClose: () => {
                                this.getDataList()
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        }
    }
  }
</script>
