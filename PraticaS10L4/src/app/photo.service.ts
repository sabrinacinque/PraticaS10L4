import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPhoto } from './Modules/iphotos';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl:string = 'https://jsonplaceholder.typicode.com/photos';
  arrFavorites: iPhoto[] = [];
  likesCount : number = 0
  likesSubject = new Subject<number>();
  likes$ = this.likesSubject.asObservable();

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

  addLike(){
    this.likesCount++;
    this.likesSubject.next(this.likesCount);
  }


  getFavoritesCount(): number {
    return this.arrFavorites.length;
  }

  getFavorites(): iPhoto[] {
    return this.arrFavorites;
  }
}
