<template>
<div>
    <!-- PDF展示组件 -->
    <iframe :src="src" frameborder="0" class="iframe"></iframe>
</div>
</template>

<script>
export default {
    data() {
        return {
            src:'/static/pdf/web/viewer.html?file='+ this.$route.query.pdf_url
        };
    },
};
</script>

<style scoped lang="less">
.iframe{
    height:1000px;
    width: 100%;
}
</style>
