<template>
    <div class="header">
        <div class="header-content">
            <div class="header-content-nav">
                <h1>Help Desk</h1>
                <router-link v-if="role==='admin'" to="/lk">Личный кабинет</router-link>
                <router-link v-if="role==='admin'" to="/users">Пользователи</router-link>
                <router-link v-if="role==='admin'" to="/issues">Все заявки</router-link>
                <router-link v-if="role==='admin'" to="/knowledge">База знаний</router-link>
                <router-link v-if="role==='admin'" to="/stat">Отчеты</router-link>
            </div>
            <div class="user-item">
                <p v-for="user in users" v-if="user.id === userid">Вы вошли как: <span>{{user.name}}</span></p>
                <button @click="clearUser" v-if="path!=='/'">Выход</button>
            </div>
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
                users: [],
                userid: '',
                role: '',
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:users').then(function(data){
                this.users = JSON.parse(JSON.stringify(data.body));
                console.log(data.body);
            })
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
            if (window.location.pathname!=='/' && localStorage.role !== 'admin' && localStorage.role !== 'user'){
                alert('В доступе отказано')
                window.location.pathname = '/'
            }
            this.userid = localStorage.userid
            this.role = localStorage.role
        }
    }
</script>
