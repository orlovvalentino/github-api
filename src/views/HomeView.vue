<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-xs">
        <a class="btn btn-primary" :href="`https://github.com/login/oauth/authorize?scope=user:email&client_id=${clientId}`">Login with Github</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      clientId: '',
    };
  },
};
</script>
