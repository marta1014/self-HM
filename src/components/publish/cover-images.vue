<template>
  <div class="coverImage">
      <div class="item-image" @click="openDialog"
      v-for="(item,index) of list" :key="index" >
<img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 弹层 -->
      <el-dialog title="选择封面图片" @close="visible = false"
      :visible="visible">
    <!-- 素材库组件 -->
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      visible: false
    }
  },
  methods: {
    openDialog () {
      this.visible = true
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
