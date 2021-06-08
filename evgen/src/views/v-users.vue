<template>
    <div class="users">
        <div class="content">
            <h2>Пользователи</h2>
            <input
                    placeholder="Поиск"
                    class="search"
                    type="search"
                    v-model="search"
            >
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Предприятие</td>
                    <td>Имя</td>
                    <td>Фамилия</td>
                    <td>Телефон</td>
                    <td>Почта</td>
                    <td>Роль</td>

                </tr>
                </thead>
                <tbody>
                <tr v-for="user in filteredUsers">
                    <td>{{user.id}}</td>
                    <td v-for="group in groups" v-if="user.id_group === group.id_group">{{group.name_group}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.last_name}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.role}}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>



    export default {
        name: 'v-users',
        components: {

        },
        data(){
            return{
                users: [],
                groups: [],
                search: ''
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:users').then(function(data){
                this.users = JSON.parse(JSON.stringify(data.body));
                console.log(data.body);
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:tech_group').then(function(data){
                this.groups = JSON.parse(JSON.stringify(data.body));
                console.log(this.groups)
            })
        },
        computed:{
            filteredUsers(){
                return this.users.filter((user)=>{
                    return user.name.match(this.search)
                })
            }
        },
        methods:{

        }
    }
</script>
