<template>
  <div class="comics-page">
    <h1 class="movieShowcase__heading">Comics</h1>

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
          >
          <!-- @click="selectComic(comic)" -->

        <div class="comic-thumbnail">

          <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" :alt="comic.title" />

          <button
              @click="addToFavorites(comic)"
              class="favorite-button"
              :class="{ 'is-favorite': comic.favorite }"
            >
              <IconLovePink v-if="!comic.favorite" />
              <IconLove v-if="comic.favorite" />
            </button>


                  
          <div class="comic-details">
              <h2 class="comic-title">{{ comic.title }}</h2>
              <p class="comic-description">{{ comic.description }}</p>
              <p class="comic-creators">
                <strong>Creators:</strong> {{ getCreators(comic) }}
              </p>
          </div> 

        </div>


    </div>
      </div>

      <!-- Add Swiper pagination -->
      <div class="swiper-pagination"></div>

      <!-- Add Swiper navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

    </div>
    <!-- swiper ends -->
    <!-- 
    <div class="favorites-badge">
      <span class="badge">{{ favoriteCount }}</span>
    </div>
     -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import md5 from 'md5';
import IconLove from '@/components/icons/IconLove.vue';
import IconLovePink from '@/components/icons/IconLovePink.vue';
import { useCounterStore } from '@/stores/store';

import Swiper from 'swiper';

import { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper-bundle.css';
 
import type { SwiperOptions } from 'swiper/types';

Swiper.use([Pagination, Navigation]);

interface CustomSwiperOptions extends SwiperOptions {
  slidesPerView?: number;
}

export default defineComponent({
  components: {
    IconLove,
    IconLovePink,
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
      // Optional parameters
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
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 1,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 1,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 1,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 1,
        },
        1280: {
          slidesPerView: 6,
          spaceBetween: 1,
        },
        1536: {
          slidesPerView: 7,
          spaceBetween: 1,
        },
        1920: {
          slidesPerView: 8,
          spaceBetween: 1,
        },
      },
    } as CustomSwiperOptions );

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
    isActive(itemId: any) {
      return this.hoveredItemId === itemId;
    },
    isHovered(itemId: any) {
      return this.hoveredItemId !== null && this.hoveredItemId !== itemId;
    },
    setHovered(itemId: any) {
      this.hoveredItemId = itemId;
    },
  },
})
</script>

<style scoped>

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
  opacity: 0.5;
  transition: all 0.5s ease-in-out;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
    z-index: 10;
    color: white;
  }

  .swiper-button-prev:hover {
    scale: 1.2;
    transition: all 0.5s ease-in-out;
  }

  .swiper-button-next:hover {
    scale: 1.2;
    transition: all 0.5s ease-in-out;
  }
  
  .comic-thumbnail {
  position: relative;
  padding: 0.2rem;
}

.comic-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.comic-details {
  opacity: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: auto;
  width: auto;
  bottom: 0;
  margin-right: 0.2rem;
  padding: 1rem;
  color: white;
  transition: opacity 0.4s ease-in-out;

  /* glassmorphism start */
  background: rgba( 24, 24, 24, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  /* glassmorphism end */
}

.comic-details h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

.comic-details p {
  font-size: 14px;
  margin-bottom: 10px;
}

.comic-details strong {
  font-weight: bold;
}

.comic-details .comic-creators {
  margin-bottom: 15px;
}

.comic-details .favorite-button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 1; /* Ensure the button appears above the details */
}

.comic-details:hover {
  opacity: 1;
}

.comic-details .favorite-button svg {
  width: 16px;
  height: 16px;
  fill: white;
}

.swiper-slide:hover .comic-details {
  /* display: block;  */
  opacity: 1;
}

  .comics-page {
  text-align: center;
  width: 100%; 
  overflow: hidden;
  margin-bottom: 3rem;
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
  top: 10px;
  right: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.favorite-button:hover {
  transform: scale(1.2);
  transition: all 0.5s ease-in-out;
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
