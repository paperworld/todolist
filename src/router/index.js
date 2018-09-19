import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/todolist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList
    }
  ]
})
