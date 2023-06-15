<template>

  <div class="container">

    <Header />

    <div class="movieShowcase">
      <ComicsGenre />
    </div>

  </div>
  
</template>

<script lang="ts">

import ComicsGenre from '@/components/ComicsGenre.vue';
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
    ComicsGenre,
  },
};
</script>

<style>

</style>
