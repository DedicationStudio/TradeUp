import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushService {


  constructor(private http: HttpClient) {}

  async subscribeUser() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      throw new Error('Push non supportate da questo browser');
    }
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Permesso negato');

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array("VAPID_PUBLIC_KEY"),
    });

    // Invia la subscription al backend per salvarla
    return this.http.post('/api/save-subscription', sub).toPromise();
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }
}
