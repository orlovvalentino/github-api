<template>
  <div>
    <input type="text" v-model="search">
    <ul>
      <li v-for="user in filterUserByName" :key="user.id" ref="users">
        <router-link :to='{name:"user", params:{login:user.login}}'>
          <img :src="user.avatar_url" alt="user.login" width="30" height="30"/>
          {{ user.login }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import fetchData from '../api/list';

export default {
  name: 'UsersList',
  data() {
    return {
      users: [],
      since: 0,
      perPage: 30,
      lastElement:null,
      thisIsTheEnd: false,
      search:''
    };
  },
  methods: {
    getList() {
      return new Promise(() => {
        fetchData.fetchUsers({ since: this.since,per_page:this.perPage})
          .then((response) => response.json())
          .then((data) => {
            if(data.length < this.perPage){
              this.thisIsTheEnd = true;
            }
            this.users.push(...data);
            this.since = data[data.length - 1].id;
          });
      });
    },
    addIntersectionObserver() {
      const lastElement = this.$refs.users[this.$refs.users.length -1];
      const observer = new IntersectionObserver(entries => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && this.search.length===0) {
          this.getList();
          observer.unobserve(firstEntry.target)
        }
      });
      observer.observe(lastElement);
    },
  },
  computed:{
    filterUserByName(){
      if(this.search.length === 0 ){
        return this.users;
      }
      return this.users.filter(user => !user.login.indexOf(this.search))
    }
  },
  updated() {
    if(this.thisIsTheEnd){
      return;
    }
    if(this.search.length > 0 ){
      return;
    }
    this.addIntersectionObserver();
  },
  mounted() {
    this.getList();
  },
};
</script>
