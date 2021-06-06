<template>
    <div v-if="this.role === 'admin'" class="lk">
        <h2>Личный кабинет</h2>
        <div class="lk-container-item__max">
            <form action="" class="lk-container-item__max-form">
                <h2>Инофрмация о заявке</h2>
                <label for="title">Заголовок*</label>
                <input disabled id="title" name="title" type="text">
                <label for="description">Подробное описание*</label>
                <textarea disabled id="description" name="description"></textarea>
                <div class="selected-container">
                    <div class="selected-container__item">
                        <label for="category">Категория*</label>
                        <select disabled name="category" id="category">
                            <option value="1">Установка ПО</option>
                            <option value="2">Настройка принтеров/сканеров</option>
                            <option value="3">Замена техники</option>
                            <option value="4">Выдача новой техники</option>
                            <option value="5">Проблемы с учетной записью</option>
                            <option value="6">Выдача ноутбуков</option>
                            <option value="7">Выдача телефонов</option>
                            <option value="8">Интернет</option>
                            <option value="9">Корп. мобильная связь</option>
                        </select>
                    </div>
                    <div class="selected-container__item">
                        <label for="priority">Важность*</label>
                        <select disabled name="priority" id="priority">
                            <option value="1">Низкая</option>
                            <option value="2">Высокая</option>
                            <option value="3">Срочная</option>
                        </select>
                    </div>
                </div>
                <div class="send-btn__container">
                    <button @click.prevent="lockLook">Назад</button>
                </div>
            </form>
        </div>
        <div class="lk-container">
            <div class="lk-container-top">
                <p>Мои заявки</p>
                <div class="lk-container-top-plus">
                    <img :src="plus" alt="">
                </div>
            </div>
            <div class="lk-container__active">
                <p class="lk-container__type">Активные заявки</p>
                <div class="lk-container__active-scroll">
                    <div :id="job.id_issue" v-if="job.id_status!=='5' && job.id_status!=='7'" v-for="job in issue" class="lk-container-item">
                        <div class="lk-container-item-left">
                            <div class="lk-container-item-left__status">
                                <img v-if="job.id_status === '3'" :src="repair" alt="">
                                <img v-if="job.id_status === '4'" :src="load" alt="">
                                <img v-if="job.id_status === '2'" :src="que" alt="">
                                <img v-if="job.id_status === '6'" :src="vos" alt="">
                            </div>
                            <div class="lk-container-item-left__info">
                                <p>{{job.title}}</p>
                                <div class="lk-container-item-left__info-bottom">
                                    <p>Создана: {{job.create_date}}</p>
                                    <p v-if="job.id_status === '1'">Статус: новая</p>
                                    <p v-if="job.id_status === '2'">Статус: не подтверждена</p>
                                    <p v-if="job.id_status === '3'">Статус: в работе</p>
                                    <p v-if="job.id_status === '4'">Статус: ожидает решения</p>
                                    <p v-if="job.id_status === '5'">Статус: решена</p>
                                    <p v-if="job.id_status === '6'">Статус: повторное возникновение</p>
                                    <p v-if="job.id_status === '7'">Статус: закрыта</p>
                                </div>
                            </div>
                        </div>
                        <div @click="openLook" class="lk-container-item-right">
                            <p>i</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lk-container__done">
                <p class="lk-container__type">Завершенные заявки</p>
                <div class="lk-container__done-scroll">
                    <div :id="job.id_issue" v-if="job.id_status==='5' || job.id_status==='7'" v-for="job in issue" class="lk-container-item">
                        <div class="lk-container-item-left">
                            <div class="lk-container-item-left__status">
                                <img v-if="job.id_status === '3'" :src="repair" alt="">
                                <img v-if="job.id_status === '4'" :src="load" alt="">
                                <img v-if="job.id_status === '2'" :src="que" alt="">
                                <img v-if="job.id_status === '6'" :src="vos" alt="">
                            </div>
                            <div class="lk-container-item-left__info">
                                <p>{{job.title}}</p>
                                <div class="lk-container-item-left__info-bottom">
                                    <p>Создана: {{job.create_date}}</p>
                                    <p v-if="job.id_status === '1'">Статус: новая</p>
                                    <p v-if="job.id_status === '2'">Статус: не подтверждена</p>
                                    <p v-if="job.id_status === '3'">Статус: в работе</p>
                                    <p v-if="job.id_status === '4'">Статус: ожидает решения</p>
                                    <p v-if="job.id_status === '5'">Статус: решена</p>
                                    <p v-if="job.id_status === '6'">Статус: повторное возникновение</p>
                                    <p v-if="job.id_status === '7'">Статус: закрыта</p>
                                </div>
                            </div>
                        </div>
                        <div @click="openLook" class="lk-container-item-right">
                            <p>i</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import plus from '../assets/plus.svg'
    import mark from '../assets/mark.svg'
    import repair from '../assets/repair.svg'
    import load from '../assets/load.svg'
    import que from '../assets/que.svg'
    import vos from '../assets/vos.svg'

    export default {
        name: 'v-lk',
        components: {

        },
        data(){
            return{
                issue: [],
                role: '',
                plus, mark, repair, load, que, vos
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:issue').then(function(data){
                this.issue = JSON.parse(JSON.stringify(data.body));
                console.log(data.body);
            })
        },
        methods:{
            addRole(){
                this.role = localStorage.role
            },
            lockLook(e){
                let form = e.target.parentNode.parentNode.parentNode
                form.className = 'lk-container-item__max menu-out'
            },
            openLook(e){
                let form = document.querySelector('.lk-container-item__max')
                form.className = 'lk-container-item__max menu-to'

                let issue = this.issue

                let title = document.querySelector('#title')
                let description = document.querySelector('#description')
                let category = document.querySelector('#category')
                let options = category.querySelectorAll('option')
                let priority = document.querySelector('#priority')
                let prOptions = priority.querySelectorAll('option')

                let jobItem = e.target.parentNode.parentNode

                console.log(jobItem)

                for (let i=0; i<issue.length; i++){
                    if (issue[i].id_issue===jobItem.id){
                        title.value = issue[i].title
                        description.innerText = issue[i].description
                        if (issue[i].id_category==='1'){
                            options[0].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='2') {
                            options[1].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='3') {
                            options[2].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='4') {
                            options[3].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='5') {
                            options[4].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='6') {
                            options[5].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='7') {
                            options[6].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='8') {
                            options[7].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category==='9') {
                            options[8].setAttribute('selected', 'selected')
                        }

                        if (issue[i].priority==='низкий'){
                            prOptions[0].setAttribute('selected', 'selected')
                        }
                        if (issue[i].priority==='высокая'){
                            prOptions[1].setAttribute('selected', 'selected')
                        }
                        if (issue[i].priority==='срочная'){
                            prOptions[2].setAttribute('selected', 'selected')
                        }

                    }
                }



            }
        },
        mounted(){
            this.addRole()
        }
    }
</script>
