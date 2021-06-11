<template>
    <div class="stat">
        <h2>Отчеты</h2>

        <table>
            <thead>
            <tr>
                <td>Id</td>
                <td>Дата</td>
                <td>Исполнитель</td>
                <td>Категория</td>
                <td>Тема</td>
                <td>Длительность исполнения</td>
                <td>Закрыто</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="issue in issues">

            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>



    export default {
        name: 'v-stat',
        components: {

        },
        data(){
            return{
                issues: [],
                categories: [],
                issueStatus: [],
                users: []
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:issues').then(function(data){
                this.issues = JSON.parse(JSON.stringify(data.body));
                console.log(this.issues)
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
        methods:{

        },
        mounted() {

        }
    }
</script>
