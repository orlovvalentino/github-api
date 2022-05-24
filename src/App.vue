<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <nav class="navbar navbar-expand-lg">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item ">
                <router-link :to="{name:'list'}" class="nav-link">LIst</router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<style>
@import'~bootstrap/dist/css/bootstrap.css';
</style>
