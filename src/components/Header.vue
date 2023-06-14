<template>

<header class="banner">
      <div class="banner__contents">
        <h1 class="banner__title">Money Heist</h1>
        <div class="banner__buttons">
          <button class="banner__button">Play</button>
          <button class="banner__button">My List</button>
        </div>
        <h1 class="banner__description">
          To carry out the biggest heist in history, a mysterious man called The Professor recruits
          a band of eight robbers who have a single characteristic: n...
        </h1>
      </div>
      <div class="banner--fadeBottom"></div>
    </header>

</template>

<script lang="ts">

export default {
  name: 'Header',
}

</script>

<style scoped>

* {
    margin: 0;
    box-sizing: border-box;
}

.banner {
    background-image: url("../assets/images/banner.jpg");
    background-size: cover;
    background-position: center center;
    color: white;
    object-fit: contain;
    height: 500px;
}

.banner__contents {
    margin-left: 30px;
    padding-top: 140px;
    height: 190px;
}

.banner__title {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.3rem;
}

.banner__button {
    cursor: pointer;
    color: #fff;
    outline: none;
    border: none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: rgba(51, 51, 51, 0.5);
}

.banner__description {
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size: 0.8rem;
    max-width: 360px;
    height: 180px;
}

.banner--fadeBottom {
    margin-top: 192px;
    height: 7.4rem;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
}

h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

</style>