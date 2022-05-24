const fetchUsers = (params) => fetch(`https://api.github.com/users?${new URLSearchParams(params)}`)
  .then((response) => response.json());

const fetchUser = (login) => fetch(`https://api.github.com/users/${login}`)
  .then((response) => response.json());

const fetchRepositories = (login) => fetch(`https://api.github.com/users/${login}/repos`)
  .then((response) => response.json());

const searchUser = (q, params) => fetch(`https://api.github.com/search/users?q=${q}&${new URLSearchParams(params)}`)
  .then((response) => response.json());
export default {
  fetchUsers,
  fetchUser,
  fetchRepositories,
  searchUser,
};
