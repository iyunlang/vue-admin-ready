<template>
  <div class="table">
    <p>可拖拽表格</p>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, computed, unref, nextTick } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus'

  import Sortable from 'sortablejs'

  export default defineComponent({
    name: 'DropTable',
    components: {ElTable, ElTableColumn},
    setup() {
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
          var tableData = reactive([
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
            rowDrop();
            // columnDrop();
          })

          function rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            Sortable.create(tbody, {
                animation: 150,
                onEnd: evt => {//拖动结束时触发，我在这里调用接口，改变后台的排序
                    if (evt.oldIndex !== evt.newIndex) {
                      const targetRow = tableData.splice(Number(evt.oldIndex), 1)[0];
                      tableData.splice(Number(evt.newIndex), 0, targetRow);
                      // 截止上面为止，数组已经进行了更换，但是会看到视图没有更新，所以就进行了数组清空重新赋值
                      const newArray = tableData.slice(0);
                      tableData = [];
                      nextTick(() => {
                        tableData = newArray;
                      });
                    }
                }
            });
          }
          //列拖拽
          function columnDrop() {
            const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
            Sortable.create(wrapperTr, {
              animation: 180,
              delay: 0,
              onEnd: evt => {
                let oldIndex = Number(evt.oldIndex)
                let newIndex = Number(evt.newIndex)
                const oldItem = dropCol[oldIndex];
                dropCol.splice(oldIndex, 1);
                dropCol.splice(newIndex, 0, oldItem);
                // 截止上面为止，数组已经进行了更换，但是会看到表格的头部label没有更新，所以就进行了数组清空重新赋值
                const newArray = dropCol.slice(0);
                dropCol = [];
                nextTick(() => {
                  dropCol = newArray;
                console.log(dropCol)
                });
              }
            });
          }
      return {
        tableData,
        rowDrop,
        dropCol,
      }
    },
  });
</script>
<style lang="scss" scoped>

</style>
