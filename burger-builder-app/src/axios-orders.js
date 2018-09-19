import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-3584b.firebaseio.com/'
});

export default instance;
