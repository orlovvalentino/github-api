<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <form>
          <div class="form-group">
            <label for="search">Search
              <input class="form-control form-control-lg"
                     name="search"
                     id=search type="text" v-model="search" v-on:input="debouncedHandler">
            </label>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
        <ul class="list-group">
          <li v-for="user in users" :key="user.id" ref="users" class="list-group-item">
            <router-link :to='{name:"user", params:{login:user.login}}'>
              <img :src="user.avatar_url" alt="user.login" width="30" height="30"/>
              {{ user.login }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import fetchData from '../api/list';

export default {
  name: 'UsersList',
  data() {
    return {
      users: [],
      since: 0,
      perPage: 30,
      thisIsTheEnd: false,
      search: '',
      page: 1,
      total_count: 0,
    };
  },
  methods: {
    addIntersectionObserver() {
      if (Object.prototype.hasOwnProperty.call(this.$refs, 'users') && this.$refs.users.length > 0) {
        const lastElementInList = this.$refs.users[this.$refs.users.length - 1];
        const observer = new IntersectionObserver((entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting) {
            if (this.total_count > this.users.length && this.search.length > 0) {
              this.getSearchUsers();
            }
            if (this.search.length === 0) {
              this.getList();
            }
            observer.unobserve(firstEntry.target);
          }
        });
        observer.observe(lastElementInList);
      }
    },
    getList() {
      if (this.since === 0) {
        this.users = [];
      }
      return new Promise(() => {
        fetchData.fetchUsers({
          since: this.since,
          per_page: this.perPage,
        })
          .then((data) => {
            if (data.length < this.perPage) {
              this.thisIsTheEnd = true;
            }
            this.users.push(...data);
            this.since = data[data.length - 1].id;
            this.page = 1;
            this.total_count = 0;
          });
      });
    },
    getSearchUsers() {
      return new Promise(() => {
        fetchData.searchUser(this.search, {
          per_page: this.perPage,
          page: this.page,
        })
          .then((data) => {
            if (data.items.length === 0) {
              this.thisIsTheEnd = true;
              return;
            }
            const filtered = data.items
              .filter((item1) => !this.users.find((item2) => item1.id === item2.id));
            this.users.push(...filtered);
            this.page += 1;
            this.total_count = data.total_count;
          });
      });
    },
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue.length === 0) {
        this.thisIsTheEnd = false;
        this.getList();
      }
      if (newValue !== oldValue) {
        this.users = [];
        this.page = 1;
        this.total_count = 0;
        this.since = 0;
      }
    },
  },
  created() {
    this.debouncedHandler = debounce(() => {
      if (this.search.length > 0) {
        this.getSearchUsers();
      }
    }, 500);
  },
  updated() {
    if (this.thisIsTheEnd) {
      return;
    }
    this.addIntersectionObserver();
  },
  mounted() {
    this.getList();
  },
};
</script>
