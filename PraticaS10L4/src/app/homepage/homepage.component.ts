import { PhotoService } from './../photo.service';
import { iPhoto } from './../Modules/iphotos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  arrPhotos: iPhoto[] = [];
  arrFavorites: iPhoto[] = [];
  likesCount: number = 0;

  constructor(private photoSvc: PhotoService) {}

  ngOnInit() {
    this.photoSvc.getAll().subscribe(photo => {
      this.arrPhotos = photo;
    });

    this.photoSvc.likes$.subscribe(likesCount => {
      this.likesCount = likesCount;
    });
  }

  delete(id: number) {
    this.photoSvc.delete(id).subscribe(() => {
      this.arrPhotos = this.arrPhotos.filter(p => p.id !== id);
      console.log('Foto eliminata');
    });
  }

  addToFavorites(photo: iPhoto) {
    if (this.isFavorite(photo.id)) {
      this.photoSvc.removeLike(photo.id);
      this.arrFavorites = this.arrFavorites.filter(fav => fav.id !== photo.id);
      console.log(this.arrFavorites,"tolgo dai favoriti")
    } else {
      this.photoSvc.addLike(photo);
      this.arrFavorites.push(photo);
      console.log(this.arrFavorites,"metto tra i favoriti")
    }
  }

  isFavorite(photoId: number): boolean {
    return this.arrFavorites.some(photo => photo.id === photoId);
  }
}
