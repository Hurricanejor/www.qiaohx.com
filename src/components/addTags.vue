<template>
    <div>
        <Tag v-for="item in count" type="dot" :key="item" :name="item" closable @on-close="handleClose2">
            <input type="text" />
        </Tag>
        <Button icon="ios-add" type="dashed" @click="handleAdd">添加标签</Button>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                count: []
            }
        },
        methods: {
            handleAdd () {
                let len = this.count.length;
                if (len) {
                    this.count.push(this.count[len - 1] + 1);
                } else {
                    this.count.push(0);
                }
            },
            handleClose2 (event, name) {
                const index = this.count.indexOf(name);
                this.count.splice(index, 1);
            }
        }
    }
</script>
<style type="text/css">
    input {
        border: 0;
        outline: 0;
        background: transparent;
        width: 30px;
        min-width: 30px;
    }
</style>