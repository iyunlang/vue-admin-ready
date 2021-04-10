<template>
  <div class="table">
    <p>
      <el-button size="mini" type="danger" @click="handleDeleteSelection">批量删除</el-button>
      <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
    </p>
    <el-table
      ref="multipleTable"
      :data="tableData" row-key="id"
      @selection-change="handleSelectionChange"
      >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of dropCol"
        :prop="dropCol[index].prop"
        :label="dropCol[index].label"
        :width="dropCol[index].width"
        :key="`column_${index}`"
      >
        <template #default="scope">
          <template v-if="scope.row.edit && dropCol[index].editable">
            <el-input v-if="dropCol[index].prop==='address'" size="mini" v-model="editInput.address" placeholder="请输入"></el-input>
            <el-input v-else-if="dropCol[index].prop==='name'" size="mini" v-model="editInput.name" placeholder="请输入"></el-input>
          </template>
          <div v-else>{{scope.row[dropCol[index].prop]}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="prop">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template #default="scope">
          <div>
            <el-button v-if="!scope.row.edit" size="mini" @click="handleEdit(scope.$index, scope.row)">行内编辑</el-button>
            <el-button v-else size="mini" type="primary" @click="handleEditSubmit(scope.$index, scope.row)">确定编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="新增"
      v-model="isAdd">
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="地点">
            <el-input type="textarea" v-model="formData.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="isAdd = !isAdd">取消</el-button>
          </el-form-item>
        </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, computed, unref, nextTick, ref, getCurrentInstance } from 'vue';
  import { ElTable, ElTableColumn, ElMessage, ElMessageBox } from 'element-plus';

  interface addressType {
    id: number,
    date: String,
    name: String,
    address: String,
    edit?: boolean,
  }

  export default defineComponent({
    name: 'EditTable',
    components: {ElTable, ElTableColumn},
    setup(props, context) {
          const isAdd = ref(false);
          const formData = reactive({
            name: "",
            address: ""
          })
          const multipleTable = ref(null)
          const search = ref(null)
          const editInput = reactive<addressType>({
                id: 0,
                date: "",
                name: "",
                address: "",
          })
          var dropCol = reactive([
            {
              label: "日期",
              prop: "date",
              width: "180",
            },
            {
              label: "姓名",
              prop: "name",
              width: "180",
              editable: true,
            },
            {
              label: "地址",
              prop: "address",
              width: "250",
              editable: true,
            }
          ])
          var tableData = reactive<Array<addressType>>([
            {
              id: 1,
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              id: 2,
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              id: 3,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 4,
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ])

          onMounted(()=> {

          })

          function getList() {
            tableData.map(v => {
              v.edit = false
              return v
            })
          }

          getList()

          let deleteIds: Number[] = []

          function handleSelectionChange(val: Array<addressType>) {
            console.log(val)
            deleteIds = val.map(v => v.id)
          }

          function handleDeleteSelection() {
            ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 提示：提交请求
              // 此处合并数据虚拟提交
              console.log(deleteIds)
              // let newArr = reactive<Array<addressType>>([])
              // for(let i = 0; i < tableData.length; i++) {
              //   !deleteIds.includes(tableData[i].id) && newArr.push(tableData[i])
              //   tableData.splice(i, 1)
              //   deleteIds.splice(0, 1)
              // }
              // console.log(deleteIds)
              // toggleSelection([])
              ElMessage({
                type: 'success',
                message: '删除成功! 删除:'+deleteIds.join(",")
              });
            }).catch(() => {
              ElMessage({
                type: 'info',
                message: '已取消删除'
              });
            });
          }

          function handleEdit(index: number, row: any) {
            if(editInput.id) {
              ElMessage({
                type: 'info',
                message: '请完成其他行的编辑，再编辑此行'
              });
              return
            }
            console.log(index, row);
            tableData[index].edit = true
            Object.assign( editInput, row );
          }

          function handleAdd() {
            Object.assign( formData, {
              name: "",
              address: ""
            });
            isAdd.value = true
          }

          function onSubmit() {
            tableData.push({
              id: tableData.length +1,
              date: "2022-10-01",
              ...formData
            })
            ElMessage({
              type: 'success',
              message: '提交成功'
            });
          }

          function handleEditSubmit(index: number, row: any) {
            console.log(index, row);
            // 提示：提交请求
            // 此处合并数据虚拟提交
            Object.assign( tableData[index], editInput );

            tableData[index].edit = false
            editInput.id = 0
            getList()
          }

          function handleDelete(index: number, row: any) {
            console.log(index, row);
            // 提示：提交请求
            // 此处合并数据虚拟提交
            tableData.splice(index, 1)
          }

          function toggleSelection(rows: Array<any>[]) {
              if (rows) {
                rows.forEach(row => {
                  multipleTable.value.toggleRowSelection(row);
                });
              } else {
                multipleTable.value.clearSelection();
              }
          }

          
      return {
        isAdd,
        multipleTable,
        tableData,
        dropCol,
        editInput,
        handleSelectionChange,
        handleDeleteSelection,
        handleAdd,
        toggleSelection,
        handleEdit,
        handleEditSubmit,
        handleDelete,
        search,
        onSubmit,
        formData,
      }
    },
  });
</script>
<style lang="scss" scoped>

</style>
