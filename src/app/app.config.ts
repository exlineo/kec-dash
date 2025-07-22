import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideFirebaseApp(() => initializeApp({ projectId: "kec-proto-ab884", appId: "1:716159836450:web:70ad3a1f5ad7b62cf1457b", storageBucket: "kec-proto-ab884.firebasestorage.app", apiKey: "AIzaSyDL_qpI3O1lMGv6b95ZwaEODvF17sP0oaE", authDomain: "kec-proto-ab884.firebaseapp.com", messagingSenderId: "716159836450", measurementId: "G-ZCN0HER4ER" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())]
};
