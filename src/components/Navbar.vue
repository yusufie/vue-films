<template>
  <nav class="navigation">
    <ul class="navigationContainer">
        <RouterLink to="/" class="navigationContainerLink">
          <img class="navigationContainerLogo" src="@/assets/images/netflix-logo.png " alt="logo" />
        </RouterLink>
        <RouterLink to="/" class="navigationContainerLink">Home</RouterLink>
        <RouterLink to="/tvshows" class="navigationContainerLink">TV Shows</RouterLink>
        <RouterLink to="/movies" class="navigationContainerLink">Movies</RouterLink>
        <RouterLink to="/recentlyadded" class="navigationContainerLink">Recently Added</RouterLink>
        <RouterLink to="/myfavorites" class="navigationContainerLink">My Favorites</RouterLink>
        <div class="navigationContainerLeft">
        <SearchIcon class="SearchIconLogo" />
        <input
          ref="searchInput"
          class="navigationContainerLeftInput"
          type="text"
          placeholder="Title, genres, people"
        />
        </div>
        <RouterLink to="/kids" class="navigationContainerLink">KIDS</RouterLink>
        <RouterLink to="/dvd" class="navigationContainerLink">DVD</RouterLink>
        <BellLogo class="navigationContainerBellLogo" />
        <DropdownContent />
    </ul>
  </nav>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import SearchIcon from '@/components/icons/IconSearch.vue';
import BellLogo from '@/components/icons/IconBell.vue';
import DropdownContent from '@/components/DropdownContent.vue';

export default {
  name: 'Navbar',
  components: {
    SearchIcon,
    BellLogo,
    DropdownContent,
    RouterLink,
  },
}

</script>

<style scoped>
.navigation {
  z-index: 2;
  grid-column: 1 / 13;
  position: fixed;
  width: 100%;
  height: 6rem;
  transition: all 1s;
  transition-timing-function: ease-in;
  top: 0;

  /* glassmorphism start */
  background: rgba( 24, 24, 24, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  /* glassmorphism end */
}

.navigationContainer {
  background-color: transparent;
  display: flex;
  height: 6.7rem;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
}

.navigationContainerLogo {
    /* margin-top: 0.5rem; */
    height: 4rem;
    padding-right: 1rem;
}

.navigationContainerLink {
  font-size: 1rem;
  color: rgb(221, 221, 221);
  text-decoration: none;
  margin-right: 2rem;
  transition: all 0.2s;
  cursor: pointer;
}

.navigationContainerLink:last-child {
  padding-right: 2.6rem;
}

.navigationContainerLink:hover {
  color: rgb(167, 167, 167);
}

.navigationContainerLeft {
    flex-grow: 1;
  color: #fff;
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
}

.SearchIconLogo {
    position: relative;
  left: 10px;
  bottom: 4px;
  transform: translateX(2.4rem) translateY(1rem);
  cursor: pointer;
}


.navigationContainerLeftInput {
font-size: 1.4rem;
  color: #ffffff;
  outline: none;
  width: 0px;
  padding: 10px;
  padding-right: 2rem;
  border: 1px solid #fff;
  cursor: pointer;
  opacity: 0;
  background: transparent;
  transition: all 0.5s;
}

.navigationContainerLeftInput:focus {
  padding-left: 4rem;
  width: 22rem;
  cursor: text;
  opacity: 1;
}

.navigationContainerBellLogo {
cursor: pointer;
  height: 64px;
  width: 64px;
  padding-right: 2.5rem;
}

/* .navigation.black {
  background-color: $color-background;
} */

</style>
