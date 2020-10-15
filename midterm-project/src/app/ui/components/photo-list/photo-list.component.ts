import { Component, OnInit, Input } from '@angular/core';
import { IAlbum, IPhoto, IUser } from 'src/app/data';
import { MyService } from 'src/app/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  albumId: number;
  photos: IPhoto[] = [];
  user: IUser;
  album: IAlbum;
  constructor(public service: MyService, private route: ActivatedRoute) {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.albumId)
   }
  getUser() {
    this.service.subscribeForAlbums().subscribe((albums) => {
      this.album = albums.find(a => a.id === this.albumId);
      this.service.subscribeForUsers().subscribe((users) => {
        this.user = users.find(u => u.id === this.album.userId)
      })
    })
  }

  ngOnInit(): void {
    this.getPhotosOfThisAlbum();
    this.getUser();
  }
  getPhotosOfThisAlbum() {
    this.service.subscribeForPhotosOfCurrentAlbum(this.albumId).subscribe((photos) => {
      this.photos = photos;
    })
  }

}
