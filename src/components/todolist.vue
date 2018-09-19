<template>
  <div class="todolist">
    <Card>
      <div class="topad">
        <p>任务计划表</p>
      </div>
      <div class="main">
        <div class="addlist">
          <p class="text">添加任务</p>
          <Input type="text" v-model="todo" placeholder="请输入待办事项" style="width: 90%;"></Input>
          <Button @click="addTodo(todo)">添加</Button>
        </div>
        <div class="detaillist">
          <ButtonGroup class="taskcount" v-show="list.length">
            <p class="task text">共添加了{{ todoLength }}个任务</p>
            <Button @click="ChangeList(1)">所有任务</button>
            <Button @click="ChangeList(2)">待完成任务</Button>
            <Button @click="ChangeList(3)">已完成任务</Button>
          </ButtonGroup>
        </div>
      </div>
      <div class="tasklist">
        <span class="notask text" v-if="!list.length">还未添加任何事项</span>
        <div class="tasks text" v-else>{{listname}}</div>
        <ul class="listview" v-show="list.length">
          <li v-for="item in filterList">
            <div class="view">
              <input type="checkbox" v-model="item.isfinished" >
              <label v-show="!item.editable" 
              :class="item.isfinished ? 'taskitem' : 'text'">{{item.title}}</label>
              <Input type="text" class="editor" v-model="item.title"
               v-show="item.editable"
               @on-blur="editTodoed(item)" @on-enter="editTodoed(item)">
              </Input>
              <Icon type="edit" @click="editTodo(item)"></Icon>
              <Icon type="trash-b" @click="deleteTodo(item)"></Icon>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Todolist',
  data () {
    return {
      list: [],
      listname: '',
      value: 1,
      todo: ''
    }
  },
  computed: {
    filterList () {
      if (this.value === 2) {
        this.listname = '待完成任务'
        return this.list.filter(item => !item.isfinished)
      } else if (this.value === 3) {
        this.listname = '已完成任务'
        return this.list.filter(item => item.isfinished)
      } else {
        this.listname = '所有任务'
        return this.list
      }
    },
    todoLength () {
      return this.list.length
    }
  },
  methods:{
    ChangeList: function (value) {
      this.value = value
    },
    addTodo: function (todo) {
        // 向list中添加一项任务事件,处理函数中的this指向的是当前这个根实例
      if (todo === '') {
        this.$Message.warning('输入内容不能为空！');
      } else {
          this.list.push({
          title: this.todo,
          isfinished: false,
          editable: false
        })
        this.todo=''  // 数据更新视图
      }
    },
    deleteTodo: function (todo) {  // 删除任务
      var index = this.list.indexOf(todo)
      this.list.splice(index,1)
    },
    editTodo: function (todo) {  // 编辑任务
      todo.editable = true
    },
    editTodoed: function (todo) {  // 编辑任务成功
      todo.editable = false
    }
  }
}
</script>

<style scoped lang="less">
@import '../assets/css/todolist.less';
</style>
