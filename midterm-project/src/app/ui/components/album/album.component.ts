import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/my-service.service';
import { IAlbum, IUser } from 'src/app/data';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {

  constructor(public router: Router, public service: MyService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token'))
    this.router.navigate(['']);
    this.getUsers();
  }

  albums: IAlbum[] = [];
  users: IUser[] = [];
  firstPhotoOfAlbum: any = [];
  getUsers() {
    this.service
      .subscribeForUsers()
      // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
      .subscribe((users) => {
        this.users = users;
      });
  }
  getAlbumsOfThisUser(userId: number) {
    this.service.subscribeForAlbumsOfThisUser(userId).subscribe((albums) => {
      this.albums = albums;
      this.getFirstPhotoOfAlbum();
    });
  }
  getFirstPhotoOfAlbum() {
    this.firstPhotoOfAlbum = [];
    this.albums.forEach(a => {
      this.service.subscribeForPhotosOfCurrentAlbum(a.id).subscribe((photos) => {
        this.firstPhotoOfAlbum.push({
          albumId: a.id,
          photo: photos.pop()
        })
      });
    })
    console.log(this.firstPhotoOfAlbum)
  }
  more(albumId: number) {
    this.router.navigate([`albums/${albumId}/photos`])
  }

}
