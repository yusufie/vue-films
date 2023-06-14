<template>
  <div className="dropdownContainer">
    <div className="navigation__container--userLogo">
      <UserIcon class="UserIcon" />
      
      <div className="dropdownContent">

        <div>
          <div className="dropdownContent--user"></div>
          <p className="dropdownContent--user-text">Andres</p>
        </div>

        <div>
          <div className="dropdownContent--user dropdownContent--user-2"></div>
          <p className="dropdownContent--user-text">Tony</p>
        </div>

          <p className="dropdownContent-text">Manage Profiles</p>
          <p className="dropdownContent-textOutside">Account</p>
          <p className="dropdownContent-textOutside">Help Center</p>
          <p className="dropdownContent-textOutside">Sign out of Netflix</p>

      </div>

    </div>
  </div>
</template>


<script lang="ts">

import UserIcon from '@/components/icons/IconUser.vue';

export default {
  name: 'DropdownContent',
  components: {
    UserIcon
  },
}
</script>


<style scoped>

.dropdownContainer {
  height: 100%;
  justify-content: center;
  align-content: center;
  margin-right: 1rem;
}

.dropdownContainer:hover .dropdownContent {
  transition: all 0.4s;
  opacity: 1;
  visibility: visible;
}

.UserIcon {
  height: 2.5em;
  width: 2.5rem; 
}

.UserIcon:hover {
  border: 1px solid #fff;
  border-radius: 5px;
}

.navigation__container--userLogo {
  margin-top: 2rem;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  height: 3rem;
  width: 3rem;
  margin-right: 0.5rem;
}

.navigation__container--userLogo:hover > .dropdownContent {
  transition: all 0.4s;
  opacity: 1;
  visibility: visible;
}

.dropdownContent {
  display: flex;
  flex-direction: column;
  opacity: 0;
  color: #fff;
  transition-delay: 0.5s;
  padding-left: 1rem;
  padding-top: 1.8rem;
  visibility: hidden;
  height: 26rem;
  width: 12rem;
  transform: translateY(1rem) translateX(-9rem);
  
  /* glassmorphism start */
  background: rgba( 24, 24, 24, 0.4 );
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  /* glassmorphism end */
}

.dropdownContent--2 {
  height: 10rem;
}

.dropdownContent-text {

  /* padding-top: 1.2rem; */
  font-size: 1rem;
}

.dropdownContent-text:hover {
  border-bottom: 1px solid #fff;
}

.dropdownContent-textOutside {
  font-size: 1rem;
  padding-bottom: 1rem;
}

.dropdownContent--user {
  height: 3rem;
  width: 3rem;
  border-radius: 5px;
  /* background-color: rgb(64, 168, 228); */
  background-image: url('../assets/images/header-bg.jpg');

}

.dropdownContent--user-2 {
  /* background-color: rgb(230, 145, 48); */
}

.dropdownContent--user-text {
  width: 3rem;
  font-size: 1rem;
  transform: translateX(4rem) translateY(-2rem);
}

.dropdownContent--user-text:hover {
  border-bottom: 1px solid #fff;
  border-width: 100%;
}

</style>