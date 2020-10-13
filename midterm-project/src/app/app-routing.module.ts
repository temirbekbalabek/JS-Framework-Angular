
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './ui/components/post-list/post-list.component';
import { AlbumComponent } from './ui/components/album/album.component';
import { LoginComponent } from './ui/components/login/login.component';
import { NotFoundComponent } from './ui/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'posts', component:  PostListComponent},
  { path: 'albums', component:  AlbumComponent},
  { path: '', component:  LoginComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }