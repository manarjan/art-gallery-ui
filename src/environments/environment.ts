// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const base_uri = '/art-gallery-api/v1';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
