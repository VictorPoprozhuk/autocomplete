<template>
    <div class="autocomplete-container">
        <input
            v-model="searchQuery"
            class="query-input"
            type="text"
            placeholder="Choose a name"
            id="autocomplete"
            autocomplete="off"
            ref="input"
            @click="isListVisible = true"
            @blur="onBlur"
            @keydown="onKeyDown"
            @keydown.enter="onEnterKey"
            @keydown.esc="onEscKey"
        >

        <label for="autocomplete">
            Choose a name
        </label>

        <button
            v-if="searchQuery"
            class="clear-input"
            type="button"
            @mousedown="clearInput"
        >
            <img src="../../icons/icon-close.svg" />
        </button>

        <ul class="options-list" v-if="isListVisible" ref="optionsList">
            <li
                v-for="(option, index) in filteredOptions"
                :key="option.id"
                :class="{active: highlightedOptionIndex === index, selected: option === selectedOption}"
                class="option-item"
                @mouseenter="highlightedOptionIndex = index"
                @mousedown="selectOption(option)"
                ref="optionItem"
            >
                {{ option.title }}
            </li>
            <li class="observer" v-intersection="showMore"></li>
        </ul>
    </div>
</template>

<script>
  import { options, DEFAULT_NUMBER_OF_OPTIONS } from '../../utils/constants';

  const optionsWithLowerCase = options.map(option => ({
    ...option,
    lowerCaseTitle: option.title.toLowerCase()
  }));

  export default {
    data () {
      return {
        numberOfOptions: DEFAULT_NUMBER_OF_OPTIONS,
        searchQuery: '',
        isListVisible: false,
        selectedOption: null,
        highlightedOptionIndex: null
      }
    },
    computed: {
      searchQueryLowerCase () {
        return this.searchQuery.toLowerCase()
      },
      filteredOptions () {
        if (!this.searchQuery) {
          return optionsWithLowerCase.slice(0, this.numberOfOptions);
        }

        return optionsWithLowerCase
          .filter(option => option.lowerCaseTitle.includes(this.searchQueryLowerCase))
          .slice(0, this.numberOfOptions);
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
      onBlur() {
        this.isListVisible = false;
        this.searchQuery = this.selectedOption?.title  || "";
        this.highlightedOptionIndex = null;
      },
      onKeyDown(e) {
        const key = e.key;
        const arrowKeys = ["ArrowUp", "ArrowDown"];

        if (arrowKeys.includes(key)) {
          e.preventDefault();
          this.showList();
          this.onArrowKey(key);
          this.scrollToHighlightedOption();
        }
      },
      onArrowKey(key) {
        const isAnyOptionHighlighted = this.highlightedOptionIndex !== null;
        const isFirstOptionHighlighted = this.highlightedOptionIndex === 0;
        const isLastOptionHighlighted = this.highlightedOptionIndex === this.filteredOptions.length - 1;

        const selectFirstOption = () => this.highlightedOptionIndex = 0;
        const selectLastOption = () => this.highlightedOptionIndex = this.filteredOptions.length - 1;
        const selectPrevious = () => this.highlightedOptionIndex--;
        const selectNext = () => this.highlightedOptionIndex++;

        if (key === 'ArrowUp') {
          !isAnyOptionHighlighted || isFirstOptionHighlighted
            ? selectLastOption()
            : selectPrevious();
        }

        if (key === 'ArrowDown') {
          !isAnyOptionHighlighted || isLastOptionHighlighted
            ? selectFirstOption()
            : selectNext();
        }
      },
      onEnterKey() {
        const isListVisible = this.isListVisible;

        if (!isListVisible) {
          this.showList();
        }

        if (this.highlightedOptionIndex !== null && isListVisible) {
          this.selectOption(this.filteredOptions[this.highlightedOptionIndex]);
        }
      },
      onEscKey() {
        this.isListVisible = false;
      },
      showList() {
        if (this.isListVisible) return;

        this.isListVisible = true;
        this.highlightedOptionIndex = null;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.searchQuery = option.title;
        this.isListVisible = false;
        this.setInputFocus();
      },
      clearInput() {
        this.searchQuery = "";
        this.setInputFocus();
      },
      showMore() {
        this.numberOfOptions += DEFAULT_NUMBER_OF_OPTIONS;
      },
      setInputFocus() {
        setTimeout(() => this.$refs.input.focus(), 0);
      },
      scrollToHighlightedOption() {
        const option = this.$refs.optionItem[this.highlightedOptionIndex];

        option?.scrollIntoView({ block: "nearest" });
      }
    },
  }
</script>

<style scoped lang="scss" src="./Autocomplete.scss"></style>
