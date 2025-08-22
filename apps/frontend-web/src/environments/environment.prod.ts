export const environment = {
  production: true,
  apiUrl: 'https://api.buscamiperro.com/api',
  wsUrl: 'wss://api.buscamiperro.com',
  mapbox: {
    accessToken: 'your-production-mapbox-token'
  },
  oauth: {
    google: {
      clientId: 'your-production-google-client-id'
    },
    facebook: {
      appId: 'your-production-facebook-app-id'
    }
  },
  firebase: {
    apiKey: 'your-production-firebase-api-key',
    authDomain: 'buscamiperro.firebaseapp.com',
    projectId: 'buscamiperro',
    storageBucket: 'buscamiperro.appspot.com',
    messagingSenderId: '123456789',
    appId: 'your-production-app-id'
  }
};