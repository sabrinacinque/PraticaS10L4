import { PhotoService } from './../photo.service';
import { iPhoto } from './../Modules/iphotos';
import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  arrPhotos: iPhoto [] = [];
  arrFavorites: iPhoto [] = [];
  favoritesCount: number = 0;
  likesCount: number = 0;


  constructor(private photoSvc:PhotoService){}

  ngOnInit(){
    this.photoSvc.getAll().subscribe(photo => {
      this.arrPhotos = photo
    })

    this.photoSvc.likes$.subscribe(likesCount => {
      this.likesCount = likesCount;
     })
  }

  delete(id:number){
    this.photoSvc.delete(id).subscribe(()=>{

      this.arrPhotos = this.arrPhotos.filter(p => p.id != id)//dopo che il server ha eliminato la pizza, se non scompare devo procedere ad eliminarla manualmente dall'array, così che l'utente veda la schermata aggiornarsi

      console.log('pizza eliminata')
      //qui inserisco operazioni di notifica all'utente per fargli capire che l'operazione è andata a buon fine
    })
  }

  addToFavorites() {
    this.photoSvc.addLike();
  }


  updateCounts() {
    this.favoritesCount = this.photoSvc.getFavoritesCount();
    this.arrFavorites = this.photoSvc.getFavorites();

  }

}
