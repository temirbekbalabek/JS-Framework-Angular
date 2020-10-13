import { Component, OnInit, Input } from '@angular/core';
import { IAlbum, IPhoto } from 'src/app/data';
import { MyService } from 'src/app/my-service.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  @Input() album: IAlbum;
  photos: IPhoto[] = [];
  constructor(public service: MyService) { }

  ngOnInit(): void {
    this.getPhotosOfThisAlbum();
  }
  getPhotosOfThisAlbum() {
    this.service.subscribeForPhotosOfCurrentAlbum(this.album.id).subscribe((photos) => {
      this.photos = photos;
    })
  }

}
