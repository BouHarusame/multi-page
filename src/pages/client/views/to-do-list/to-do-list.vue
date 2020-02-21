<template>
 <div class="todo">
   <!-- 23wwww -->
  <ToDoList class="todo"></ToDoList>
 </div>
</template>

<script>
import ToDoList from '@/components/to-do-list/to-do-list'
export default {
  name: 'to-do-list',
  components: {
    ToDoList
  }
}
</script>

<style lang="stylus" scoped>
.todo
  height 100%
</style>
