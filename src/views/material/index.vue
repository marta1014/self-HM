<template>
<el-card>
    <breadCrumb slot="header">
    <template slot="title">素材管理</template>
    </breadCrumb>
    <el-tabs v-model="activeName">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="收藏" name="collect"></el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'// tab栏默认选中
    }
  }

}
</script>

<style>

</style>
