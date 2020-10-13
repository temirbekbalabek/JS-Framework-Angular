import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from 'src/app/data';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() photo: IPhoto;
  constructor() { }

  ngOnInit(): void {
  }

}
