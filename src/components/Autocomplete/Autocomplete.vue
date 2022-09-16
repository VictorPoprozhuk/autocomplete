<template>
    <div class="autocomplete-container">
        <label for="autocomplete">
            Label
        </label>
        <div class="input-container">
            <input
                class="query-input"
                type="text"
                placeholder="Search"
                id="autocomplete"
                v-model="searchQuery"
                @click="isListVisible = true"
                @blur="onBlur"
                @keydown="onKeyDown"
                autocomplete="off"
            >
            <button class="clear-input" type="button" aria-label="Clear input" @click="clearInput" v-if="searchQuery">
                <img src="../../icons/icon-close.svg" />
            </button>
            <ul class="options-list" v-if="isListVisible" ref="optionsList">
                <li class="option-item" @mouseenter="highlightedOption = index" :class="{active: highlightedOption === index, selected: option === selectedOption}" v-for="(option, index) in filteredOptions" :key="option.id" @mousedown="selectOption(option)">{{option.title}}</li>
<!--                <li class="observer" v-intersection="showMore"></li>-->
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
        isListVisible: false,
        highlightedOption: null
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
    },
    watch: {
      searchQuery(newValue) {
        if (!newValue) {
          this.selectedOption = null;
        }
      }
    },
    methods: {
      showMore() {
        this.showOptions += 15;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.searchQuery = option.title;
        this.isListVisible = false;
      },
      onBlur() {
        this.isListVisible = false;
        this.searchQuery = this.selectedOption?.title  || "";
        this.highlightedOption = null;
      },
      clearInput() {
        this.searchQuery = "";
        this.selectedOption = null;
      },
      onKeyDown({ key }) {
        if (key === 'ArrowUp') {
          if (this.highlightedOption !== null) {
            this.highlightedOption = this.highlightedOption === 0 ? this.filteredOptions.length - 1 : this.highlightedOption - 1;
          } else {
            this.highlightedOption = this.filteredOptions.length - 1;
          }
        } else if (key === 'ArrowDown') {
          if (this.highlightedOption !== null) {
            this.highlightedOption = this.filteredOptions.length - 1 === this.highlightedOption ? 0 : this.highlightedOption + 1;
          } else {
            this.highlightedOption = 0;
          }
        } else if (key === 'Enter') {
          if (this.highlightedOption) {
            this.selectOption(this.filteredOptions[this.highlightedOption]);
          }
        }
        this.$refs.optionsList.scrollTop = this.highlightedOption * 30;
      }
    },
  }
</script>

<style scoped lang="scss" src="./Autocomplete.scss"></style>
