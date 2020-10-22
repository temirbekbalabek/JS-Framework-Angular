import { Component, OnInit, Input } from '@angular/core';
import { IAlbum } from 'src/app/data';

@Component({
  selector: 'app-album-conpro',
  templateUrl: './album-conpro.component.html',
  styleUrls: ['./album-conpro.component.scss']
})
export class AlbumConproComponent implements OnInit {

  @Input() album: IAlbum;

  constructor() { }

  ngOnInit(): void {
    console.log('content projection')
  }

}
