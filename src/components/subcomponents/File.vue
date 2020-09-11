<template>
<div>
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
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.iframe{
    height:525px;
    width: 100%;
}
</style>
