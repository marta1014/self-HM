<template>
  <div class="coverImage">
      <div class="item-image" @click="openDialog(index)"
      v-for="(item,index) of list" :key="index" >
<img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 弹层 -->
      <el-dialog @close="visible = false"
      :visible="visible">
    <!-- 素材库组件 -->
    <select-image @selectimg="receiveUrl"></select-image>
    <!-- 监听触发的selectimg事件 获取到传递的数据 -->
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      visible: false,
      seleceIndex: -1// 用来 存储点击图片的下标
    }
  },
  methods: {
    openDialog (index) {
      this.visible = true
      this.seleceIndex = index // 记录点击的图片下标
    },
    receiveUrl (url) { // 获取到传递的数据
    // URL来源于list 而list来源于prop传递 而prop是只读 只能通知publish组件改
    // 故继续子传父
      // console.log(url, this.seleceIndex)
      this.$emit('selectimg1', url, this.seleceIndex)
      this.visible = false
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
