import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const comicsData = ref([])
  const favoriteCount = ref(0)

  function increment() {
    count.value++
  }

  function updateComicsData(data) {
    comicsData.value = data
  }

  function addFavorite(comic) {
    if (comic.favorite) {
      favoriteCount.value--
    } else {
      favoriteCount.value++
    }
    comic.favorite = !comic.favorite
    // You can add your logic to store the favorite comic here
  }

  return { count, doubleCount, comicsData, favoriteCount, increment, updateComicsData, addFavorite }
})
