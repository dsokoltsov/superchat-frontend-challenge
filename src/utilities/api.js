import axios from 'axios';

const instance = axios.create();

export function fetchUserData(data) {
  return instance.get(`https://api.github.com/repos/${data.name}/${data.repo}`);
}

export function fetchContributorsData(data) {
  return instance.get(data);
}
