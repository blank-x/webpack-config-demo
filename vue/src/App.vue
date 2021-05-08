<template>
  <div>
    <div @click="add">212111211112aaa12</div>
    <router-link :to="{name:'home'}">sdsd</router-link>
    <router-link :to="{name:'home2'}">home2</router-link>
    <router-link :to="{name:'home3'}">home3</router-link>
    <img :src="require('./assets/a.jpeg')" class="img1"  alt="">
    <img :src="require('./assets/b.jpg')" alt="">
    <i class="fa fa-camera-retro"></i>
    <textarea :id="tinymceId" >Hello, World!</textarea>
    <router-view></router-view>
  </div>

</template>

<script>
  import {add} from './utils'
  export default {
    name: "sdsdsdsd",
    data(){
      return {
        tinymceId: this.id || 'vue-tinymce-' + +new Date()

      }
    },
    methods:{
      add(){
        add()
      }
    },
    created() {
      console.log('create app');
    },
    mounted() {

      window.tinymce.init({
        selector: `#${this.tinymceId}`
      })
    }
  }
</script>

<style scoped>
  .img1{
    width: 200px;
  }
</style>
