<template>
  <div class="table">
    <p>常规表格</p>
    <el-table
      :data="tableData" row-key="id">
      <el-table-column
        v-for="(item, index) of dropCol"
        :prop="dropCol[index].prop"
        :label="dropCol[index].label"
        :width="dropCol[index].width"
        :key="`column_${index}`"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="size"
      :total="tdata.length">
    </el-pagination>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, computed, unref, nextTick, ref } from 'vue';
  import { ElTable, ElTableColumn, ElPagination } from 'element-plus'

  import Sortable from 'sortablejs'

  export default defineComponent({
    name: 'dropTable',
    components: {ElTable, ElTableColumn, ElPagination},
    setup() {
          const size = ref(5);
          var dropCol = reactive([
            {
              label: "日期",
              prop: "date",
              width: "180"
            },
            {
              label: "姓名",
              prop: "name",
              width: "180"
            },
            {
              label: "地址",
              prop: "address",
              width: "250"
            }
          ])

          // 所有数据
          var tdata = reactive([
            {
              id: 1,
              date: '2016-05-02',
              name: '王小虎1',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              id: 2,
              date: '2016-05-04',
              name: '王小虎2',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              id: 3,
              date: '2016-05-01',
              name: '王小虎3',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 4,
              date: '2016-05-03',
              name: '王小虎4',
              address: '上海市普陀区金沙江路 1516 弄'
            }, {
              id: 5,
              date: '2016-05-01',
              name: '王小虎5',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 6,
              date: '2016-05-03',
              name: '王小虎6',
              address: '上海市普陀区金沙江路 1516 弄'
            }, {
              id: 7,
              date: '2016-05-01',
              name: '王小虎7',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 8,
              date: '2016-05-03',
              name: '王小虎8',
              address: '上海市普陀区金沙江路 1516 弄'
            }, {
              id: 9,
              date: '2016-05-01',
              name: '王小虎9',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 10,
              date: '2016-05-03',
              name: '王小虎10',
              address: '上海市普陀区金沙江路 1516 弄'
            }, {
              id: 11,
              date: '2016-05-01',
              name: '王小虎11',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 12,
              date: '2016-05-03',
              name: '王小虎12',
              address: '上海市普陀区金沙江路 1516 弄'
            }, {
              id: 13,
              date: '2016-05-01',
              name: '王小虎13',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 14,
              date: '2016-05-03',
              name: '王小虎14',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ])

          // 渲染数据
          var tableData = reactive<Array<any>>([])

          getList(1, size.value);

          function getList(page: number, size: number) {
            let end = page*size;
            tableData = tdata.slice(end-size, end>tableData.length?end:tableData.length)
            console.log(tableData)

          }

          // 点击分页
          function handleCurrentChange(val: number) {
            getList(val, size.value);
          }

          
      return {
        tableData,
        tdata,
        size,
        dropCol,
        handleCurrentChange,
      }
    },
  });
</script>
<style lang="scss" scoped>

</style>
