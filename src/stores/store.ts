
import { defineStore } from 'pinia'

interface Comic {
  id: number;
  favorite: boolean;
  title: string;
  thumbnail: {
    extension: string;
    path: string;
  };
  description: string;
}

interface CounterState {
  count: number;
  // doubleCount: number;
  comicsData: Comic[];
  favoriteCount: number;
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
    // doubleCount: 0,
    comicsData: [],
    favoriteCount: 0,
  }),
/*   getters: {
    doubleCount: state => state.count * 2,
  }, */
  actions: {
    increment() {
      this.count++
    },
    updateComicsData(data: Comic[]) {
      this.comicsData = data
    },
    addFavorite(comic: Comic) {
      if (comic.favorite) {
        this.favoriteCount--
      } else {
        this.favoriteCount++
      }
      comic.favorite = !comic.favorite
      // You can add your logic to store the favorite comic here
    },
  },
})
