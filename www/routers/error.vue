<style scoped lang="less">
</style>
<template>
    <div>{{error}}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                error: "",
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                const error = localStorage.getItem("error") || "";
                this.error = error;
            }
        }
    }
</script>