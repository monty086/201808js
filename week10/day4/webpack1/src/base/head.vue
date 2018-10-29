<template>
    <div class='header'>
        {{title}}
        <slot></slot>
    </div>
</template>
<script>
    export default{
        props:['title']
    }
</script>

<style scoped lang='less'>
    .header{
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        background: rgb(212, 165, 102);
        font-size:20px;
    }
</style>

