import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';

import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

import { initializeApp, provideFirebaseApp, FirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { inject, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
  apiKey: "AIzaSyC61dFW8zgMYDCi19fZ51zRPdonNhFhWcY",
  authDomain: "trade-up-470007.firebaseapp.com",
  projectId: "trade-up-470007",
  storageBucket: "trade-up-470007.firebasestorage.app",
  messagingSenderId: "926116080222",
  appId: "1:926116080222:web:4f1b400f76291c4df262cf",
  measurementId: "G-HZT076ZHF3"
    })),
    provideAuth(() => {
      const app = inject(FirebaseApp);
      return getAuth(app);
    }),
    provideFirestore(() => {
      const app = inject(FirebaseApp);
      return getFirestore(app);
    }),
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
});
