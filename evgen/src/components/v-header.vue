<template>
    <div class="header">
        <div class="header-content">
            <h1>Help Desk</h1>
            <router-link to="/" v-if="this.path!=='/'">Выход</router-link>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src


    export default {
        name: 'v-header',
        components: {

        },
        data(){
            return{
                path: '',
            }
        },
        methods:{
            thisPath(){
                return this.path = window.location.pathname
            }
        },
        mounted(){
            this.thisPath()
        }
    }
</script>
