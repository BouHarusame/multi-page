<template>
  <div class="home">
    B
    <img alt="Vue logo" src="../assets/logo2.png" />
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    <CommonA></CommonA>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import CommonA from '@/common/CommonA.vue'
export default {
  name: 'home',
  components: {
    CommonA
    // HelloWorld
  }
}
</script>
