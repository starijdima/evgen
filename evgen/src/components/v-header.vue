<template>
    <div class="header">
        <div class="header-content">
            <h1>Help Desk</h1>
            <button @click="clearUser" v-if="this.path!=='/'">Выход</button>
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
            },
            clearUser(){
                localStorage.setItem('userid', '')
                localStorage.setItem('role', '')
                window.location.pathname = '/'
            }
        },
        mounted(){
            this.thisPath()
            if (window.location.pathname!=='/' && localStorage.role !== 'admin'){
                alert('В доступе отказано')
                window.location.pathname = '/'
            }
        }
    }
</script>
