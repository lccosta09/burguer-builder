import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-f72d4.firebaseio.com'
})

export default instance;