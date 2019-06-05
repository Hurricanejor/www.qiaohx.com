<template>
        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="../assets/images/lazy-pig.jpg" alt="" @click="fn" class="img-circle img-photo">
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#">设置</a></li>
                    <li class="divider"></li>
                    <li><a href="#" @click="logOut">退出</a></li>
                </ul>
            </li>
        </ul>
</template>

<script>
export default {
    name: 'UserOperation',
    methods: {
        fn() {
            this.$store.state.isEditing = false;
            this.$router.push('/')
        },
        logOut() {
            this.$store.commit('REMOVE_COUNT', this.$store.state.token);
            this.$router.push('/Login')
        }
    }
}
</script>
<style scoped>
    .img-photo {width: 24px; height: 24px;}
</style>

