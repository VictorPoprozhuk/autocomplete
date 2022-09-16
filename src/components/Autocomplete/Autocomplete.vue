<template>
    <div class="autocomplete-container">
        <label for="autocomplete">
            Label
        </label>
        <div class="input-container">
            <input type="text" placeholder="Search" id="autocomplete" v-model="searchQuery">
            <button class="clear-input" type="button">X</button>
            <ul class="options-list">
                <li class="option-item" v-for="option in filteredOptions" :key="option.id">{{option.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  import { options } from '../../constants'

  export default {
    data () {
      return {
        searchQuery: '',
        showOptions: 15,
        selectedOption: null,
      }
    },
    computed: {
      searchQueryLowerCase () {
        return this.searchQuery.toLowerCase()
      },
      filteredOptions () {
        if (!this.searchQuery) {
          return options.slice(0, this.showOptions)
        }
        return options.filter(option => option.title.toLowerCase().includes(this.searchQueryLowerCase)).slice(0, this.showOptions)
      }
    }
  }
</script>

<style scoped lang="scss" src="./Autocomplete.scss"></style>
