export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000',
  mapbox: {
    accessToken: 'your-mapbox-token-here'
  },
  oauth: {
    google: {
      clientId: 'your-google-client-id'
    },
    facebook: {
      appId: 'your-facebook-app-id'
    }
  },
  firebase: {
    apiKey: 'your-firebase-api-key',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '123456789',
    appId: 'your-app-id'
  }
};