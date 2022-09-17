<template>
  <div id="app">
    <Autocomplete/>
  </div>
</template>

<script>
import Autocomplete from './components/Autocomplete/Autocomplete.vue'

export default {
  name: 'App',
  components: {
    Autocomplete
  }
}
</script>

<style>
body {
  font-size: 16px;
  font-family: Arial, sans-serif;
}

#app {
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>

