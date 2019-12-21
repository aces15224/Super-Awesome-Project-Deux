import {Router} from 'express';
import {createUser} from 'auth.js';
import {checkIfAuthenticated} from './middlewares.js';
import {articles} from './data';

const router = Router();


router.post('/auth/signup', createUser);

router.get('/articles', checkIfAuthenticated, async (_, res) => {
  return res.send(articles);
});  

export default router;
const token = await firebase.auth.currentUser.getIdToken();
require("dotenv").config();import axios from 'axios';

import {auth} from './views/layouts/main.handlebars';


export const createUserAccount = (data) => {
  return axios.post('https://your-api-url/auth/signup', data)
    .then(res => res.data)
}


export const loginUser = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
}

export const getArticles = () => {
    const token = await auth.currentUser.getIdToken();
    
    return axios.get('https://your-api-url/articles', {headers:  
      { authorization: `Bearer ${token}` }})
      .then(res => res.data);
    }
