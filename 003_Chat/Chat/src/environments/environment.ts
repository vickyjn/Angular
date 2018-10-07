// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCY4nXDh_ypK51DVlSIqlBdLnFkMrrBVCw",
    authDomain: "chatbot-d9f89.firebaseapp.com",
    databaseURL: "https://chatbot-d9f89.firebaseio.com",
    projectId: "chatbot-d9f89",
    storageBucket: "chatbot-d9f89.appspot.com",
    messagingSenderId: "103600184191"
  }
};



/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
