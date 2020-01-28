<template>
  <el-card class="publish">
    <breadCrumb slot="header">
      <template slot="title">发布文章</template>
    </breadCrumb>
    <el-form label-width="100px">
        <el-form-item label="标题">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" rows="10"></el-input>
        </el-form-item>
        <el-form-item label="封面">
            <el-radio-group>
                <el-radio>单图</el-radio>
                <el-radio>三图</el-radio>
                <el-radio>无图</el-radio>
                <el-radio>自动</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
            <el-select>
                <el-option></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary">发表</el-button>
            <el-button >存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'publish'
}
</script>

<style lang="less" scoped>
.publish {
    .el-form{
        margin-left: 50px;
        .el-input {
            width: 60%;
        }
    }
}
</style>
