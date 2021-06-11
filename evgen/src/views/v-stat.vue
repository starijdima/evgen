<template>
    <div class="stat">
        <h2>Отчеты</h2>
        <h3>Краткая сводка</h3>
        <table>
            <thead>
                <tr>
                    <td>Кол-во заявок</td>
                    <td>Кол-во заявок в работе</td>
                    <td>Кол-во завершенных</td>
                    <td>Кол-во пользователей</td>
                    <td>Кол-во услуг</td>
                    <td>Кол-во обслуживаемых предприятий</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="tr"></td>
                    <td class="tr"></td>
                    <td class="tr"></td>
                    <td class="tr"></td>
                    <td class="tr"></td>
                    <td class="tr"></td>
                </tr>
            </tbody>
        </table>
        <h3>Отчет по завершенным заявкам</h3>
        <table>
            <thead>
            <tr>
                <td>Id</td>
                <td>Дата</td>
                <td>Исполнитель</td>
                <td>Категория</td>
                <td>Тема</td>
                <td>Длительность исполнения</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="issue.id_status === '5'" v-for="issue in issues">
                <td class="tr">{{issue.id}}</td>
                <td class="tr">{{issue.create_date}}</td>
                <td class="tr" v-for="user in users" v-if="issue.is_admin === user.id">{{user.name}} {{user.last_name}}</td>
                <td class="tr" v-for="category in categories" v-if="issue.id_category === category.id_category">{{category.name_category}}</td>
                <td class="tr">{{issue.title}}</td>
                <td v-if="issue.time_diff !== null" class="tr">{{issue.time_diff}}</td>
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
                groups: 0,
                jobs: [],
                categories: 0,
                issueStatus: [],
                users: 0,
                test: [],
                usersTest: [],
                issueStatuses: [],


                countDone: 0,
                countWork: 0,
                countCategories: 0,
                countUsers: 0,
                countIssues: 0,
                countGroups: 0,
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:issues').then(function(data){
                this.issues = JSON.parse(JSON.stringify(data.body));

                let issuess = this.issues
                this.countWork = 0
                this.countDone = 0
                this.countIssues = 0
                console.log(this.countWork)
                for (let i=0; i<issuess.length; i++){
                    this.countIssues++
                    localStorage.setItem('countIssues', this.countIssues)
                    if(issuess[i].id_status === '3'){
                        this.countWork++
                        localStorage.setItem('countWork', this.countWork)
                    }
                    if(issuess[i].id_status === '5'){
                        this.countDone++
                        localStorage.setItem('countDone', this.countDone)
                    }

                }
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:tech_group').then(function(data){
                this.groups = JSON.parse(JSON.stringify(data.body));
                let newGroups = this.groups
                this.countGroups = 0
                for (let i=0; i<newGroups.length; i++){
                    this.countGroups++
                    localStorage.setItem('countGroups', this.countGroups)
                }
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:issue').then(function(data){
                this.jobs = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:category').then(function(data){
                this.categories = JSON.parse(JSON.stringify(data.body));
                let newCategories = this.categories
                this.countCategories = 0
                for (let i=0; i<newCategories.length; i++){
                    this.countCategories++
                    localStorage.setItem('countCategories', this.countCategories)
                }
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:issue_status').then(function(data){
                this.issueStatus = JSON.parse(JSON.stringify(data.body));
                this.issueStatus = this.issueStatus.length
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:users').then(function(data){
                this.users = JSON.parse(JSON.stringify(data.body));
                let newUsers = this.users
                this.countUsers = 0
                for (let i=0; i<newUsers.length; i++){
                    this.countUsers++
                    localStorage.setItem('countUsers', this.countUsers)
                }
            })
        },
        methods:{

        },
        mounted() {
            let trs = document.querySelectorAll('.tr')
            trs[0].innerText = localStorage.countIssues
            trs[1].innerText = localStorage.countWork
            trs[2].innerText = localStorage.countDone
            trs[3].innerText = localStorage.countUsers
            trs[4].innerText = localStorage.countCategories
            trs[5].innerText = localStorage.countGroups
        }
    }
</script>
