import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}


  getCandlestickData(symbol: string, start: number, end: number) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=5m&startTime=${start}&endTime=${end}&limit=1000`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(kline => ({
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        time: Math.floor(new Date(kline[0]).getTime() / 1000)
      })))
    );
  }
  
  private convertToDateParts(date: Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,  // Mese da 0 a 11
      day: date.getDate(),
      hour: date.getHours(),      // Ora (0-23)
      minute: date.getMinutes()   // Minuti (0-59)
    };
  }

  private correctUrl = '../assets/correct.json';  // Percorso al file correct.json
  private wrongUrl = '../assets/wrong.json';      // Percorso al file wrong.json

  // Metodo per ottenere i dati da correct.json
  getCorrectData(): Observable<{title: string;description: string}[]> {
    return this.http.get<{title: string;description: string;}[]>(this.correctUrl);
  }

  // Metodo per ottenere i dati da wrong.json
  getWrongData(): Observable<{title: string;description: string}[]> {
    return this.http.get<{title: string;description: string;}[]>(this.wrongUrl);
  }
}
