<template>
  <div class="comics-page">
    <h1>Comics</h1>
    <div class="comics-list">
      <div v-for="comic in comics" :key="comic.id" class="comic-item">
        <div class="comic-thumbnail">
          <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" :alt="comic.title" />
        </div>
        <div class="comic-details">
          <h2 class="comic-title">{{ comic.title }}</h2>
          <p class="comic-description">{{ comic.description }}</p>
          <p class="comic-creators">
            <strong>Creators:</strong> {{ getCreators(comic) }}
          </p>
          <button @click="addToFavorites(comic)" class="favorite-button">
            <IconLove />
          </button>
        </div>
      </div>
    </div>
    <div class="favorites-badge">
      <span class="badge">{{ favoriteCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCounterStore } from '@/stores/store'
import axios from 'axios'
import md5 from 'md5'
import IconLove from '@/components/icons/IconLove.vue';

export default defineComponent({
  components: {
    IconLove,
  },
  computed: {
    comics() {
      return useCounterStore().comicsData
    },
    favoriteCount() {
      return useCounterStore().favoriteCount
    },
  },
  mounted() {
    this.fetchComicsData()
  },
  methods: {
    fetchComicsData() {
      const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;

      const ts = new Date().getTime().toString()
      const hash = md5(ts + privateKey + publicKey)
      const apiUrl = 'https://gateway.marvel.com/v1/public/comics'

      axios
        .get(apiUrl, {
          params: {
            ts: ts,
            apikey: publicKey,
            hash: hash,
          },
        })
        .then(response => {
          const comicsData = response.data.data.results.map(comic => ({
        ...comic,
        favorite: false, // Add the favorite property to each comic
      }))
          useCounterStore().updateComicsData(comicsData)
        })
        .catch(error => {
          console.error('Error fetching comics data:', error)
        })
    },
    addToFavorites(comic) {
      useCounterStore().addFavorite(comic)
    },
    getCreators(comic) {
      if (comic.creators && comic.creators.items.length > 0) {
        return comic.creators.items.map(creator => creator.name).join(', ')
      }
      return 'N/A'
    },
  },
})
</script>

<style scoped>
.comics-page {
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.comics-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.comic-item {
  width: 300px;
  margin: 20px;
  padding: 10px;
  background-color: #010040;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.comic-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.comic-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.comic-title {
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.comic-description {
  font-size: 14px;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.comic-creators {
  font-size: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.favorite-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}


.favorites-badge {
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: red;
  border-radius: 50%;
}

.badge {
  color: white;
  font-size: 12px;
}
</style>
