<template>
  <div>
    <list :list="list" :hot="hotCities" :letter="letter"></list>
    <alphabet :list="list" @change="handleLetterChange"></alphabet>
  </div>
</template>

<script>
import List from './components/List';
import Alphabet from './components/Alphabet';
export default {
  name: 'indexBar',
  components: {
    // Search,
    List,
    Alphabet
  },
  data() {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    };
  },
  methods: {
    handleLetterChange(letter) {
      this.letter = letter;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
