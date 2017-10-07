<style scoped>
    .c1{
        border:1px solid red;
        width:222px;
        text-align: center;
    }
</style>
<template>
    <div>
        <mt-swipe :auto="0" :show-indicators="false" class="c1">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
            <mt-swipe-item>4</mt-swipe-item>
            <mt-swipe-item>5</mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    import header1 from '../components/header.vue';
    import { Swipe, SwipeItem } from 'mint-ui';

</script>
