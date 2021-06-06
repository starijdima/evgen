<template>
  <div class="home">
    <form action="">
      <h2>Авторизация</h2>
      <label for="login">E-mail</label>
      <input id="login" name="login" type="text">
      <label for="pass">Пароль</label>
      <input id="pass" name="pass" type="password">
      <button @click.prevent="enter">ВХОД</button>
      <div class="error-block">
      </div>
    </form>

  </div>
</template>

<script>



export default {
  name: 'Home',
  components: {

  },
  data(){
    return{
      users: [],
    }
  },
  created() {
    this.$http.get('http://evgen-api.loc//api/get:all/from:users').then(function(data){
      this.users = JSON.parse(JSON.stringify(data.body));
      console.log(data.body);
    })
  },
  methods:{
    enter(e){
      let inputs = e.target.parentNode.querySelectorAll('input')
      let usersArray = this.users
      let errorBlock = e.target.parentNode.querySelector('.error-block')
      for (let i=0; i<usersArray.length; i++){
        if (usersArray[i].email===inputs[0].value && usersArray[i].pass===inputs[1].value){
          localStorage.setItem('userid', usersArray[i].id)
          localStorage.setItem('role', usersArray[i].role)
          errorBlock.innerHTML = ''
          window.location.pathname = '/lk'
        }
        else{

          errorBlock.innerHTML = ''
          errorBlock.insertAdjacentHTML('beforeend', '<p>Неверный логин или пароль</p>')
        }
      }
    }
  }
}
</script>
