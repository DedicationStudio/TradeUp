import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {
  
  private apiUrl = 'https://api-pcomnui6oa-uc.a.run.app';

  constructor(private http: HttpClient) {}

  getLevels(section: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/level/${section}`);
  }

  getSection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/section`);
  }

  getOptions(idMission: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/option/${idMission}`); 
  }

  getMissions(idMission: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mission/${idMission}`); 
  }

  getAllMissions(tags: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/allmission/by-tags`, {
      tags: tags
    }); 
  }

  getAnswer(idMission: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/answer/${idMission}`); 
  }

  updateStatus(id_user: string, id_level: string, status: string) {
    return this.http.post(`${this.apiUrl}/update-status`, {
      id_user,
      id_level,
      status
    });
  }

  getStatus(id_user: string, id_level: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id_user}/${id_level}`); 
  }

  zeroPhase(id_user: string, id_level: string): Observable<any> {
    console.log("fase resettata");
    return this.http.get(`${this.apiUrl}/reset-phase/${id_user}/${id_level}`);
  }

  updatePhase(id_user: string, id_level: string, value: string) {
    console.log(value);
    return this.http.post(`${this.apiUrl}/update-phase`, {
      id_user,
      id_level,
      value
    });
  }

  createAccount(email: string | null, age: string, userAnalytics?: any[], password?: string | null, username?: string | null, phone?: string) {
    return this.http.post(`${this.apiUrl}/create-account`, {
      email,
      age,
      password: password || "",
      username: username || "",
      phone: phone || "",
      userAnalytics: userAnalytics || []
    });
  }

  loginAccount(email: string | null, password: string | null) {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password: password
    });
  }

  getCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category`);
  }

  getUserById(id_user: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id_user}`);
  }

  updateUserMoney(id_user: string, money: number) {
    return this.http.post(`${this.apiUrl}/update-money`, {
      id_user,
      money
    });
  }

  updateUserLastPlayed(id_user: string) {
    return this.http.post(`${this.apiUrl}/update-lastplayed`, {
      id_user
    });
  }

  updateUserStreak(id_user: string, streak: number) {
    return this.http.post(`${this.apiUrl}/update-streak`, {
      id_user,
      streak
    });
  }/*

  constructor(private http: HttpClient) {}

  getLevels(section: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/level/${section}`);
  }

  getOptions(idMission: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/option/${idMission}`);  
  }

  getMissions(idMission: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/mission/${idMission}`);  
  }

  getAllMissions(tags: string[]): Observable<any>{
    
return this.http.post('http://localhost:3000/api/allmission/by-tags', {
    tags: tags
  });  

}
getAnswer(idMission: string): Observable<any> {
  return this.http.get(`http://localhost:3000/api/answer/${idMission}`);  
}

updateStatus(id_user: string, id_level: string, status: string) {
  
  return this.http.post('http://localhost:3000/api/update-status', {
    id_user,
    id_level,
    status
  });
}


getStatus(id_user: string, id_level: string){
  return this.http.get(`http://localhost:3000/api/status/${id_user}/${id_level}`);  
}

zeroPhase(id_user: string, id_level: string){
  console.log("fase resettata");
  return this.http.get(`http://localhost:3000/api/reset-phase/${id_user}/${id_level}`);
}

updatePhase(id_user: string, id_level: string, value: string){
  console.log(value)
  return this.http.post('http://localhost:3000/api/update-phase', {
    id_user,
    id_level,
    value
  });
}

createAccount(email: string | null, age: string, userAnalytics?: any[], password?: string | null, username?: string | null, phone?: string) {
  
  return this.http.post('http://localhost:3000/api/create-account', {
    email,
    age,
    password: password || "",
    username: username || "",
    phone: phone || "",
    userAnalytics: userAnalytics || []
  });
}

loginAccount(email: string | null, password: string | null) {
  
  return this.http.post('http://localhost:3000/api/login', {
    email,
    password: password
  });
}

getCategory(){
  return this.http.get('http://localhost:3000/api/category')
}

getUserById(id_user: string) {
  return this.http.get(`http://localhost:3000/api/user/${id_user}`);
}

updateUserMoney(id_user: string, money: number) {
  return this.http.post(`http://localhost:3000/api/update-money`, {
    id_user,
    money
  });
}

updateUserLastPlayed(id_user: string) {
  return this.http.post(`http://localhost:3000/api/update-lastplayed`, {
    id_user
  });
}

updateUserStreak(id_user: string, streak: number) {
  return this.http.post(`http://localhost:3000/api/update-streak`, {
    id_user,
    streak
  });
}

getSection(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/section`);
  }*/
}

