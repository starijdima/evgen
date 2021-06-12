<template>
    <div class="users issues">
        <div class="content">
            <h2>Все заявки</h2>
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
                    <td>Категория</td>
                    <td>Заголовок</td>
                    <td>Приоритет</td>
                    <td>Дата создания</td>
                    <td>Дата завершения</td>
                    <td>Статус</td>
                    <td>Имя заявителя</td>
                    <td>Имя исполнителя</td>
                    <td>Организация</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="issue in filteredIssues">
                    <td>{{issue.id}}</td>
                    <td v-for="category in categories" v-if="category.id_category === issue.id_category">{{category.name_category}}</td>
                    <td>{{issue.title}}</td>
                    <td>{{issue.priority}}</td>
                    <td>{{issue.create_date}}</td>
                    <td>{{issue.resolve_date}}</td>
                    <td v-for="status in issueStatus" v-if="status.id_status === issue.id_status">{{status.name_status}}</td>
                    <td v-for="user in users" v-if="user.id === issue.id_user">{{user.name}}</td>
                    <td v-for="user in users" v-if="user.id === issue.is_admin">{{user.name}}</td>
                    <td v-for="group in groups" v-if="issue.id_group === group.id_group">{{group.name_group}}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>



    export default {
        name: 'v-issues',
        components: {

        },
        data(){
            return{
                issues: [],
                groups: [],
                categories: [],
                search: '',
                issueStatus: [],
                users: [],
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:issues').then(function(data){
                this.issues = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:tech_group').then(function(data){
                this.groups = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:category').then(function(data){
                this.categories = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:issue_status').then(function(data){
                this.issueStatus = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:users').then(function(data){
                this.users = JSON.parse(JSON.stringify(data.body));
            })
        },
        computed:{
            filteredIssues(){
                return this.issues.filter((issue)=>{
                    return issue.title.match(this.search)
                })
            }
        },
        methods:{

        }
    }
</script>
