<template>
    <div v-if="role === 'admin' || role === 'user'" class="lk">
        <h2>Личный кабинет</h2>
        <div class="lk-container-item__new">
            <form action="" class="lk-container-item__new-form">
                <h2>Создать заявку</h2>
                <label for="title-new">Заголовок*</label>
                <input required id="title-new" name="title" type="text">
                <label for="description-new">Подробное описание*</label>
                <textarea required id="description-new" name="description"></textarea>
                <div class="selected-container">
                    <div class="selected-container__item">
                        <label for="category-new">Категория*</label>
                        <select required name="id_category" id="category-new">
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
                        <label for="priority-new">Важность*</label>
                        <select required name="priority" id="priority-new">
                            <option value="Низкая">Низкая</option>
                            <option value="Высокая">Высокая</option>
                            <option value="Срочная">Срочная</option>
                        </select>
                    </div>
                </div>
                <div class="send-btn__container">
                    <button @click.prevent="lockNew">Назад</button>
                    <button type="submit" @click="newIssue">Отправить</button>
                </div>
            </form>
        </div>
        <div class="lk-container-item__max">
            <form action="" class="lk-container-item__max-form">

                <div class="lk-container-item__max-form-top">
                    <h2>Информация о заявке</h2>
                    <p class="lk-container-item__max-form-top__date"></p>
                </div>
                <label for="title">Заголовок*</label>
                <input disabled id="title" name="title" type="text">
                <label for="user_mail">Почта заявителя</label>
                <input disabled id="user_mail" name="user_mail" type="text">
                <label for="admin_mail">Почта исполнителя</label>
                <input disabled id="admin_mail" name="admin_mail" type="text">
                <label for="description">Подробное описание*</label>
                <textarea disabled id="description" name="description"></textarea>
                <div class="selected-container">
                    <div class="selected-container__item">
                        <label for="id_category">Категория*</label>
                        <select disabled name="id_category" id="id_category">
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
                            <option value="Низкая">Низкая</option>
                            <option value="Высокая">Высокая</option>
                            <option value="Срочная">Срочная</option>
                        </select>
                    </div>

                </div>
                <label for="back_form">Последнее сообщение от исполнителя</label>
                <textarea disabled id="back_form" name="back_form"></textarea>
                <div class="send-btn__container">
                    <button type="button" @click="getChat" id="msg" v-if="isWork===true && jobStatus==='3'" class="stage-btn">
                        <img :src="msg" alt="">
                        написать
                    </button>
                    <button type="submit" @click="changeState" id="pause" v-if="isWork===true && jobStatus==='3'" class="stage-btn">
                        <img :src="pause" alt="">
                        приостановить
                    </button>
                    <button type="submit" @click="changeState" id="play" v-if="isWork===true && jobStatus==='4' || jobStatus==='4' || jobStatus==='2'" class="stage-btn">
                        <img :src="play" alt="">
                        возобновить
                    </button>
                    <button type="submit" @click="changeState" id="done" v-if="isWork===true" class="stage-btn">
                        <img :src="done" alt="">
                        завершить
                    </button>
                    <button v-if="role==='user' || role==='admin' && authorId === userId" @click="deleteIssue">Удалить</button>
                    <button v-if="role==='user' || role==='admin' && authorId === userId" @click="saveChanges">Сохранить</button>
                    <button @click="setAdmin" type="submit" v-if="role==='admin' && jobStatus==='1'">Взяться</button>
                    <button @click.prevent="lockLook">Назад</button>
                </div>
            </form>
            <div class="chat">
                <form action="" class="chat-form">
                    <label for="back_from">Обратная связь</label>
                    <textarea name="back_form" id="back_from" cols="30" rows="10"></textarea>
                    <button type="submit" @click="sendBack">Отправить</button>
                    <button @click.prevent="lockForm" class="chat-form__lock">
                        <img :src="lockChat" alt="">
                    </button>
                </form>
            </div>
        </div>
        <div class="lk-container">
            <div class="lk-container-top">
                <p>Мои заявки</p>
                <div @click="openNew" class="lk-container-top-plus">
                    <img :src="plus" alt="">
                </div>
            </div>
            <div class="lk-container__active">
                <p class="lk-container__type">Активные заявки</p>
                <div class="lk-container__active-scroll">
                    <div :id="job.id" v-if="role==='admin' && userId===job.id_user && job.id_status!=='5' || role==='admin' && userId===job.is_admin && job.id_status!=='5' || role==='admin' && job.is_admin===null && job.id_status!=='5' || role==='admin' && job.id_status==='4' && job.id_status!=='5'" v-for="job in issue" class="lk-container-item">
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
                                    <p v-for="user in users" v-if="user.id === job.id_user">Заявитель: {{user.name}} {{user.last_name}}</p>
                                </div>
                                <div class="lk-container-item-left__info-bottom">
                                    <p v-for="group in groups" v-if="group.id_group === job.id_group">Организация: {{group.name_group}}</p>
                                </div>
                            </div>
                        </div>
                        <div @click="openLook" class="lk-container-item-right">
                            <p>i</p>
                        </div>
                    </div>
<!-- ----------------------------------------------------------------------------   -->
                    <div :id="job.id" v-if="role==='user' && userId===job.id_user && job.id_status!=='5'" v-for="job in issue" class="lk-container-item">
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
                                    <p v-for="user in users" v-if="user.id === job.is_admin">Исполнитель: {{user.name}} {{user.last_name}}</p>
                                </div>
                                <div class="lk-container-item-left__info-bottom">
                                    <p v-for="group in groups" v-if="group.id_group === job.id_group">Организация: {{group.name_group}}</p>
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
                    <div :id="job.id" v-if="job.id_status==='5' && job.id_user===userId || job.id_status==='7' && job.id_user===userId || job.id_status==='5' && role==='admin' && job.is_admin===userId" v-for="job in issue" class="lk-container-item">
                        <div class="lk-container-item-left">
                            <div class="lk-container-item-left__status">
                                <img v-if="job.id_status === '5'" :src="mark" alt="">
                                <img v-if="job.id_status === '7'" :src="mark" alt="">
                            </div>
                            <div class="lk-container-item-left__info">
                                <p>{{job.title}}</p>
                                <div class="lk-container-item-left__info-bottom">
                                    <p>Завершена: {{job.resolve_date}}</p>
                                    <p v-if="job.id_status === '1'">Статус: новая</p>
                                    <p v-if="job.id_status === '2'">Статус: не подтверждена</p>
                                    <p v-if="job.id_status === '3'">Статус: в работе</p>
                                    <p v-if="job.id_status === '4'">Статус: ожидает решения</p>
                                    <p v-if="job.id_status === '5'">Статус: решена</p>
                                    <p v-if="job.id_status === '6'">Статус: повторное возникновение</p>
                                    <p v-if="job.id_status === '7'">Статус: закрыта</p>
                                    <p v-for="user in users" v-if="user.id === job.id_user">Заявитель: {{user.name}} {{user.last_name}}</p>
                                </div>
                                <div class="lk-container-item-left__info-bottom">
                                    <p v-for="group in groups" v-if="group.id_group === job.id_group">Организация: {{group.name_group}}</p>
                                </div>
                            </div>
                        </div>
                        <div @click="openLook" class="lk-container-item-right">
                            <p style="user-select: none">i</p>
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
    import pause from '../assets/pause.svg'
    import play from '../assets/play.svg'
    import done from '../assets/done.svg'
    import msg from '../assets/msg.svg'
    import lockChat from '../assets/lock_chat.svg'

    export default {
        name: 'v-lk',
        components: {

        },
        data(){
            return{
                issue: [],
                role: '',
                userId: '',
                jobStatus: '',
                isWork: '',
                maxId: '',
                users: [],
                groups: [],
                authorId: '',
                plus, mark, repair, load, que, vos, pause, play, done, msg, lockChat
            }
        },
        created() {
            this.$http.get('http://evgen-api.loc/api/get:all/from:issues').then(function(data){
                this.issue = JSON.parse(JSON.stringify(data.body));
                this.userId = localStorage.userid
            });
            this.$http.get('http://evgen-api.loc/api/get:all/from:users').then(function(data){
                this.users = JSON.parse(JSON.stringify(data.body));
            })
            this.$http.get('http://evgen-api.loc/api/get:all/from:tech_group').then(function(data){
                this.groups = JSON.parse(JSON.stringify(data.body));
                console.log(this.groups)
            })
        },
        methods:{
            addRole(){
                this.role = localStorage.role
            },
            lockLook(e){
                let form = e.target.parentNode.parentNode.parentNode
                form.className = 'lk-container-item__max menu-out'
                let title = document.querySelector('#title')
                let description = document.querySelector('#description')
                title.value = ''
                description.innerHTML = ''
                this.isWork = ''
            },
            lockNew(e){
                let form = e.target.parentNode.parentNode.parentNode
                form.className = 'lk-container-item__new menu-out'
                let title = document.querySelector('#title-new')
                let description = document.querySelector('#description-new')
                title.value = ''
                description.innerHTML = ''
            },
            openNew(e){
                let formnew = document.querySelector('.lk-container-item__new')
                formnew.className = 'lk-container-item__new menu-to'
            },
            openLook(e){
                let jobItem = ''
                if (e.target.className === 'lk-container-item-right'){
                    jobItem = e.target.parentNode
                }
                else{
                    jobItem = e.target.parentNode.parentNode
                }
                let form = document.querySelector('.lk-container-item__max')
                form.className = 'lk-container-item__max menu-to'
                let issue = this.issue
                let title = document.querySelector('#title')
                let description = document.querySelector('#description')
                let category = document.querySelector('#id_category')
                let options = category.querySelectorAll('option')
                let priority = document.querySelector('#priority')
                let prOptions = priority.querySelectorAll('option')
                let author = document.querySelector('#user_mail')
                let message = document.querySelector('#back_form')
                let adminMail = document.querySelector('#admin_mail')

                this.maxId = jobItem.id
                for (let i=0; i<issue.length; i++) {
                    if (issue[i].id === jobItem.id) {
                        title.value = issue[i].title
                        description.innerText = issue[i].description
                        author.value = issue[i].user_mail
                        message.innerText = issue[i].back_form
                        adminMail.value = issue[i].admin_mail

                        if (issue[i].id_category === '1') {
                            options[0].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '2') {
                            options[1].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '3') {
                            options[2].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '4') {
                            options[3].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '5') {
                            options[4].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '6') {
                            options[5].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '7') {
                            options[6].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '8') {
                            options[7].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_category === '9') {
                            options[8].setAttribute('selected', 'selected')
                        }
                        if (issue[i].id_status === '1') {
                            this.jobStatus = '1'
                        }
                        if (issue[i].id_status === '2') {
                            this.jobStatus = '2'
                        }
                        if (issue[i].id_status === '3') {
                            this.jobStatus = '3'
                        }
                        if (issue[i].id_status === '4') {
                            this.jobStatus = '4'
                        }
                        if (issue[i].id_status === '5') {
                            this.jobStatus = '5'
                        }
                        if (issue[i].id_status === '6') {
                            this.jobStatus = '6'
                        }
                        if (issue[i].id_status === '7') {
                            this.jobStatus = '7'
                        }


                        if (issue[i].is_admin === localStorage.userid && issue[i].id_status === '3') {
                            this.isWork = true
                        }
                        this.authorId = issue[i].id_user
                        if (this.role === 'user' || this.role === 'admin' && issue[i].id_user === this.userId) {
                            title.removeAttribute('disabled')
                            description.removeAttribute('disabled')
                            category.removeAttribute('disabled')
                            priority.removeAttribute('disabled')
                            author.removeAttribute('disabled')
                            message.removeAttribute('disabled')
                        }
                        if (issue[i].priority === 'Низкая') {
                            prOptions[0].setAttribute('selected', 'selected')
                        }
                        if (issue[i].priority === 'Высокая') {
                            prOptions[1].setAttribute('selected', 'selected')
                        }
                        if (issue[i].priority === 'Срочная') {
                            prOptions[2].setAttribute('selected', 'selected')
                        }
                    }
                }
            },
            newIssue(){
                let form = document.querySelector('.lk-container-item__new-form')
                let Data = new Date();
                let Year = Data.getFullYear();
                let Month = Data.getMonth();
                let Day = Data.getDate();
                Month+=''
                Day+=''
                if (Month.length===1){
                    Month = '0'+Month
                }
                if (Day.length===1){
                    Day = '0'+Day
                }
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)
                    formData.append('create_date', Year+'-'+Month+'-'+Day)
                    formData.append('id_issue', '')
                    formData.append('id', '')
                    formData.append('id_status', '1')
                    formData.append('id_user', localStorage.userid)
                    formData.append('id_group', localStorage.id_group)
                    let users = this.users
                    for (let i=0; i<users.length; i++){
                        if(users[i].id === this.userId){
                            formData.append('user_mail', users[i].email)
                        }
                    }
                    let response = await fetch('http://evgen-api.loc/api/new_issue', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Данные успешно отправлены')
                    window.location.pathname = '/lk'
                };
            },
            setAdmin(){
                let form = document.querySelector('.lk-container-item__max-form')
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)

                    formData.append('id', this.maxId)
                    formData.append('id_status', '3')
                    formData.append('is_admin', localStorage.userid)
                    formData.append('admin_mail', localStorage.admin_mail)
                    let response = await fetch('http://evgen-api.loc/api/change_req', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Данные успешно отправлены')
                    window.location.pathname = '/lk'
                };
            },
            changeState(e){
                let btn = e.target
                let form = document.querySelector('.lk-container-item__max-form')
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)

                    formData.append('id', this.maxId)
                    if (btn.id === 'pause'){
                        formData.append('id_status', '4')
                    }
                    if (btn.id === 'play'){
                        formData.append('id_status', '3')
                    }
                    if (btn.id === 'done'){
                        formData.append('id_status', '5')
                    }

                    formData.append('is_admin', localStorage.userid)
                    let response = await fetch('http://evgen-api.loc/api/change_req', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Данные обновлены')
                    window.location.pathname = '/lk'
                };
            },
            getChat(){
                let chat = document.querySelector('.chat')
                chat.style.display = 'flex'
            },
            lockForm(){
                let chat = document.querySelector('.chat')
                chat.style.display = 'none'
            },
            sendBack(){
                let form = document.querySelector('.chat-form')
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)
                    formData.append('id', this.maxId)
                    let response = await fetch('http://evgen-api.loc/api/send_mail', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Сообщение отправлено')
                    window.location.pathname = '/lk'
                };
            },
            saveChanges(){
                let form = document.querySelector('.lk-container-item__max-form')
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)
                    formData.append('id', this.maxId)
                    formData.delete('back_form')
                    let response = await fetch('http://evgen-api.loc/api/save_changes', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Данные успешно изменены')
                    window.location.pathname = '/lk'
                }
            },
            deleteIssue(){
                let form = document.querySelector('.lk-container-item__max-form')
                form.onsubmit = async (e) => {

                    e.preventDefault();
                    let formData = new FormData(form)
                    formData.append('id', this.maxId)
                    let response = await fetch('http://evgen-api.loc/api/delete_req', {
                        method: 'POST',
                        body: formData
                    });
                    alert('Заявка удалена')
                    window.location.pathname = '/lk'
                }
            }
        },
        mounted(){
            this.addRole()

        }
    }
</script>
