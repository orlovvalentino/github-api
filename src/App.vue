<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link :to="{name:'list'}">LIst</router-link> |
    </nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>

</style>
