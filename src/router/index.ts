import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tvshows',
      name: 'tvshows',
      component: () => import('../views/TvShowsView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue')
    },
    {
      path: '/recentlyadded',
      name: 'recentlyadded',
      component: () => import('../views/RecentlyAddedView.vue')
    },
    {
      path: '/myfavorites',
      name: 'myfavorites',
      component: () => import('../views/MyFavoritesView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/kids',
      name: 'kids',
      component: () => import('../views/KidsView.vue')
    },
    {
      path: '/dvd',
      name: 'dvd',
      component: () => import('../views/DvdView.vue')
    },
    {
      path: '/comicdetails',
      name: 'comicdetails',
      component: () => import('../views/ComicDetailsView.vue')
    },
  ]
})

export default router
