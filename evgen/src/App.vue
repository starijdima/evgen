<template>
  <div id="app">
    <vHeader></vHeader>
    <router-view/>
  </div>
</template>

<script>

  import './assets/style.scss'

  import vHeader from './components/v-header'

  export default {
    name: 'Home',
    components: {
      vHeader
    }
  }
</script>

