const base_uri = '/art-gallery-api/v1';
export const environment = {
  production: true,
  api: {
    gallery: {
      photos: `${base_uri}/unsplash/photos`,
      favourites: `${base_uri}/favourites`,
    },
  },
  firebase: {
    apiKey: 'AIzaSyAWte_nktCAYiGhyrQQDqdeD4FtogOkO0U',
    authDomain: 'unart-gallery.firebaseapp.com',
    databaseURL: 'https://unart-gallery.firebaseio.com',
    projectId: 'unart-gallery',
    storageBucket: 'unart-gallery.appspot.com',
    messagingSenderId: '1078118238665',
    appId: '1:1078118238665:web:dc8cc63b8e179b1514c018',
    measurementId: 'G-BZKK4SYNV7',
  },
};
