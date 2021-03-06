import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { AlbumComponent } from './components/album/album.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CustomMaterialModule } from '../custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AlbumConproComponent } from './components/album-conpro/album-conpro.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    AlbumComponent,
    PhotoListComponent,
    PhotoComponent,
    LoginComponent,
    NotFoundComponent,
    AlbumConproComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule
  ]
})
export class UiModule { }
