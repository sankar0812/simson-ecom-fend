import axios from "axios";

const baseURLs = {
  development: 'http://192.168.29.66:8083/', // API server url (Development)
  production: 'https://dev.api.simsongarments.com/', // API server url (Production)
  staging: 'https://dev.admin.simsongarments.com/',  // API server url (Staging)


  // --------- Production----------------
  // production: 'https://dev.api.simsongarments.com/', // API server url (Production)
  // staging: 'https://admin.justclickin.in/',  // API server url (Staging)
};


const environment = process.env.NODE_ENV || 'development'
// const environment = 'production'
console.log(environment, 'environment');


export const baseRequest = axios.create({
  baseURL: baseURLs[environment],

  // headers: {
  //   'X-Requested-With': 'XMLHttpRequest',
  // }, 

});

export const IMG_BASE_URL = baseURLs[environment];




