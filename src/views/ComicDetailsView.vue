<template>
  
  <div class="comic-details-page">

    <div class="parent">
      
      <div class="comic-thumbnail" v-if="comic">
        <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" :alt="comic.title" />
      </div>

      <div class="comic-details" v-if="comic">
        <h1>{{ comic.title }}</h1>
        <p>{{ comic.description }}</p>
        <p>Price: {{ comic.prices[0].price }}</p>
        <p>Series: {{ comic.series.name }}</p>
        <p>Characters: {{ getCharacters(comic) }}</p>
        <p>Creators: {{ getCreators(comic) }}</p>
      </div>
      
    </div>

  </div>

  
</template>
  
<script lang="ts">

import axios from 'axios';
import md5 from 'md5';

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
  name: 'ComicDetailsView',
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
    const comicId = this.$route.params.comicId;

    if (!comicId) {
      console.error('Invalid comic ID:', comicId);
      return;
    }

    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);
    const apiUrl = `https://gateway.marvel.com/v1/public/comics/${comicId}`;

    axios
      .get(apiUrl, {
        params: {
          ts: ts,
          apikey: publicKey,
          hash: hash,
        },
      })
      .then((response) => {
        this.comic = response.data.data.results[0];
      })
      .catch((error) => {
        console.error('Error fetching comic data:', error);
      });
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
  height: 100vh;
}

.parent {
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 1fr;
grid-column-gap: 64px;
grid-row-gap: 0px;
/* background-color: black; */

  /* glassmorphism start */
  background: rgb(0, 0, 39);
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  /* glassmorphism end */


border-radius: 1rem;
padding: 1rem;
}

.comic-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding-right: 4rem;
  
}

.comic-thumbnail {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  height:100%;
  border-radius: 1rem;

}
h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
}


</style>
  