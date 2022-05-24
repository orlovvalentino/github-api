<template>
  <dl v-if="user">
    <template v-if="user.name">
      <dt>Name</dt>
      <dd>{{ user.name }}</dd>
    </template>
    <dt>Nickname</dt>
    <dd>{{ user.login }}</dd>
    <template v-if="user.location">
      <dt>Location</dt>
      <dd>{{user.location}}</dd>
    </template>
    <dt>Logo</dt>
    <dd>
      <img :src="user.avatar_url" :alt="user.login" width="40" height="40">
    </dd>
    <template v-if="repositories.length > 0">
    <dt>repositories</dt>
    <dd>
      <ul>
        <li v-for="repo in repositories" :key="repo.id">
          <a :href='repo.html_url' target="_blank">{{repo.name}}</a>
          <p>{{repo.description}}</p>
        </li>
      </ul>
    </dd>
    </template>
  </dl>
</template>

<script>
import fetchData from '@/api/list';

export default {
  name: 'User-View',
  data() {
    return {
      avatar_url: null,
      user: true,
      name: null,
      location: null,
      repositories: [],
    };
  },
  methods: {
    getUser() {
      return new Promise(() => {
        fetchData.fetchUser(this.$route.params.login)
          .then((response) => response.json())
          .then((data) => {
            this.user = data;
          });
      });
    },
    getRepositories() {
      return new Promise(() => {
        fetchData.fetchRepositories(this.$route.params.login)
          .then((response) => response.json())
          .then((data) => {
            this.repositories = data;
          });
      });
    },
  },
  mounted() {
    this.getUser();
    this.getRepositories();
  },
};
</script>
