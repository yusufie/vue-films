<template>
  
  <div class="comic-details-page">

    <div class="comic-details" v-if="comic">
      <h1>{{ comic.title }}</h1>
      <p>{{ comic.description }}</p>
      <p>Price: {{ comic.prices[0].price }}</p>
      <p>Series: {{ comic.series.name }}</p>
      <p>Characters: {{ getCharacters(comic) }}</p>
      <p>Creators: {{ getCreators(comic) }}</p>
    </div>

    <div class="comic-thumbnail" v-if="comic">
      <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" :alt="comic.title" />
    </div>

  </div>

  
</template>
  
<script lang="ts">

interface Comic {
  title: string;
  description: string;
  prices: { price: number }[];
  series: { name: string };
  characters: { items: { name: string }[] };
  creators: { items: { name: string }[] };
  thumbnail: { path: string; extension: string };
}

export default {
  name: 'ComicDetails',
  data() {
    return {
      comic: null as Comic | null,
    };
  },
  created() {
    this.fetchComicData();
  },
  methods: {
    fetchComicData() {
      // Parse the comic data from the query parameter
      const comicData = this.$route.query.comicData;
      if (typeof comicData === 'string') {
        this.comic = JSON.parse(comicData);
      } else {
        console.error('Invalid comic data:', comicData);
      }
    },
    getCreators(comic: Comic) {
      if (comic.creators && comic.creators.items.length > 0) {
        return comic.creators.items.map((creator: any) => creator.name).join(', ');
      }
      return 'N/A';
    },
    getCharacters(comic: Comic) {
      if (comic.characters && comic.characters.items.length > 0) {
        return comic.characters.items.map((character: any) => character.name).join(', ');
      }
      return 'N/A';
    },
  },
};
</script>
  
<style scoped>
.comic-details-page {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 20px;
  margin-top: 6rem;

  /* glassmorphism start */
  background: rgba( 24, 24, 24, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  /* glassmorphism end */
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

img {
  width: 100%;
  max-width: 400px;
  margin-right: 20px;
}

p {
  font-size: 1.2rem;
}

.comic-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 2rem;
}

</style>
  