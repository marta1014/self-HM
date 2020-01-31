<template>
  <div class="coverImage">
      <div class="item-image" v-for="(item,index) of list" :key="index" >
<img :src="item ? item : defaultImg" alt="">
      </div>

  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  }

}
</script>

<style scoped lang="less">
.coverImage{
    margin: 20px 0 20px 100px;
    display: flex;
    .item-image{
        border: 1px solid #ccc;
        margin-left: -1px;
        height: 200px;
        width: 200px;
        padding: 6px;
        img{
          width: 100%;
          height: 100%;
        }
    }
}

</style>
