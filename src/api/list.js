const fetchUsers = (params)=>{
  return fetch(`https://api.github.com/users?${new URLSearchParams(params  )}`);
}
const fetchUser = (login)=>{
  return fetch(`https://api.github.com/users/${login}`);
}
const fetchRepositories = (login)=>{
  return fetch(`https://api.github.com/users/${login}/repos`);
}
export default {
  fetchUsers,
  fetchUser,
  fetchRepositories,
}
