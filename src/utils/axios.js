import axios from 'axios';

const instance = token => axios.create({
  baseURL: `${process.env.REACT_APP_CLOUD_FUNCTIONS_REST_API}`,
  headers: { Authorization: `Bearer ${token}` }
});

export default instance;
