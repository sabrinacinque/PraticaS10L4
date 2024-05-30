import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPhoto } from './Modules/iphotos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl:string = 'https://jsonplaceholder.typicode.com/photos';
  arrFavorites: iPhoto[] = [];

  constructor(private http:HttpClient) { }

  getAll():Observable<iPhoto[]>{
    return this.http.get<iPhoto[]>(this.apiUrl);
  }


  delete(id:number):Observable<iPhoto>{
    return this.http.delete<iPhoto>(`${this.apiUrl}/${id}`)
  }

  addToFavorites(photo: iPhoto) {
    this.arrFavorites.push(photo);
    alert("prodotto aggiunto ai favoriti")

  }


  getFavoritesCount(): number {
    return this.arrFavorites.length;
  }

  getFavorites(): iPhoto[] {
    return this.arrFavorites;
  }
}
