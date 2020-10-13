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
    this.getAlbums();
    this.getUsers();
  }

  albums: IAlbum[] = [];
  foundUser: IUser;
  users: IUser[];
  getAlbums() {
    this.service.subscribeForAlbums().subscribe((albums) => {
      this.albums = albums;
      console.log(this.albums, 'albums');
    });
  }
  getUser(album: IAlbum) {
    this.foundUser = this.users.find(u => u.id === album.userId);
  }
  getUsers() {
    this.service
      .subscribeForUsers()
      // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
      .subscribe((users) => {
        this.users = users;
      });
  }

}
