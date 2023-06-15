<template>
  <div class="comics-page">
    <h1 class="movieShowcase__heading">Netflix Originals</h1>

    <!-- swiper starts -->
      <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
        v-for="comic in comics"
        :key="comic.id"
          class="swiper-slide"
          :class="{ 'swiper-slide-active': isActive(comic.id), 'swiper-slide-hovered': isHovered(comic.id) }"
          @mouseenter="setHovered(comic.id)"
          @mouseleave="setHovered(null)"
          @click="selectComic(comic)"
        >

        <div class="comic-thumbnail">
          <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" :alt="comic.title" />

          <button @click="addToFavorites(comic)" class="favorite-button">
            <IconLove />
          </button>
        </div>
<!--         <div class="comic-details">
          <h2 class="comic-title">{{ comic.title }}</h2>
          <p class="comic-description">{{ comic.description }}</p>
          <p class="comic-creators">
            <strong>Creators:</strong> {{ getCreators(comic) }}
          </p>
          <button @click="addToFavorites(comic)" class="favorite-button">
            <IconLove />
          </button>
        </div> -->


    </div>
      </div>

      <!-- Add Swiper pagination -->
      <div class="swiper-pagination"></div>

      <!-- Add Swiper navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

    </div>
    <!-- swiper ends -->

    <div class="favorites-badge">
      <span class="badge">{{ favoriteCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import md5 from 'md5';
import IconLove from '@/components/icons/IconLove.vue';
import { useCounterStore } from '@/stores/store';

import Swiper, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

Swiper.use([Pagination, Navigation]);

/* import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/navigation/navigation.scss'; */

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
  data() {
    return {
      hoveredItemId: null,
    };
  },

  mounted() {
    this.fetchComicsData();

    // Initialize Swiper
    new Swiper('.swiper-container', {
      slidesPerView: 5,
      spaceBetween: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true, // Enable infinite loop
    });

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
          const comicsData = response.data.data.results.map((comic: any) => ({
        ...comic,
        favorite: false, // Add the favorite property to each comic
      }))
          useCounterStore().updateComicsData(comicsData)
        })
        .catch(error => {
          console.error('Error fetching comics data:', error)
        })
    },
    addToFavorites(comic: any) {
      useCounterStore().addFavorite(comic)
    },
    getCreators(comic: any) {
      if (comic.creators && comic.creators.items.length > 0) {
        return comic.creators.items.map((creator: { name: any; }) => creator.name).join(', ')
      }
      return 'N/A'
    },
    isActive(itemId) {
      return this.hoveredItemId === itemId;
    },
    isHovered(itemId) {
      return this.hoveredItemId !== null && this.hoveredItemId !== itemId;
    },
    setHovered(itemId) {
      this.hoveredItemId = itemId;
    },
  },
})
</script>

<style scoped>
/*
@import '~swiper/swiper.scss';
@import '~swiper/components/pagination/pagination.scss';
@import '~swiper/components/navigation/navigation.scss';
*/

.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%; /* Added */
  overflow: hidden; /* Added */
}

.swiper-wrapper {
  display: flex;
  padding: 1rem;
}

.swiper-slide {
  flex-shrink: 0;
  width: 20%;
  margin: 1rem;
  box-sizing: border-box;
  transition: transform 0.4s ease-in-out;
}

.swiper-slide:hover {
  transform: scale(1.2);
  z-index: 2;
}

.swiper-slide-hovered {
  opacity: 0.6;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
    /* width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10; */
  }
/*
  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  } */


  
  .comic-thumbnail {
  position: relative;
  padding: 0.2rem;
}

.comic-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}


  .comics-page {
  text-align: center;
  width: 100%; 
  overflow: hidden; 
}

.movieShowcase__heading {
    font-weight: 600;
    text-align: start;
    margin-top: 1rem;
    padding-left: 2rem;
    color: white;
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
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}


.favorites-badge {
  position: fixed;
  top: 100px;
  right: 100px;
  padding: 5px 10px;
  background-color: red;
  border-radius: 50%;
}

.badge {
  color: white;
  font-size: 12px;
}
</style>
