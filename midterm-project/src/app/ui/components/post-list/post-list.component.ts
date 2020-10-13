import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/my-service.service';
import { IUser, IPost, IComment } from 'src/app/data';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(public service: MyService, public router: Router) {
   }

  ngOnInit(): void {
    if(!localStorage.getItem('token')) this.router.navigate(['']);
    this.getUsers();
    this.getPosts();
    this.getComments();
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    // this.getUsersForPosts();
  }
  username = '';
  password = '';
  newPostTitle = '';
  newPostBody = '';
  posts: IPost[];
  users: IUser[];
  comments: IComment[];
  commentsOfOnePost: IComment[];
  showComment = [];
  usersForPosts: IUser[] = [];
  filterText = '';
  commentName = '';
  commentBody = '';
  commentsLength = 0;
  getUsers() {
    this.service
      .subscribeForUsers()
      // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
      .subscribe((users) => {
        this.users = users;
      });
  }

  getPosts() {
    this.service.subscribeForPosts().subscribe((posts) => {
      console.log('posts', posts);
      this.posts = posts;
    });
  }

  getComments() {
    this.service.subscribeForComments().subscribe((comments) => {
      console.log('comments', comments);
      this.comments = comments;
    });
  }
  getCommentsLength(postId: number) {
    this.commentsOfOnePost = [];
    if(this.comments && this.comments.length > 0) {
      this.commentsOfOnePost = this.comments.filter((c) => c.postId === postId);
      this.commentsLength = this.commentsOfOnePost.length;
    }
  }
  showCommentsOfThisPost(index: number, postId: number) {
    this.commentName = '';
    this.commentBody = '';
    console.log('filtering', postId)
    console.log('comments', this.comments);
    this.commentsOfOnePost = [];
    this.commentsOfOnePost = this.comments.filter((c) => c.postId === postId);
    console.log(this.commentsOfOnePost);
    this.showComment[index] = !this.showComment[index];
  }
  createAnArray() {
    this.showComment = [];
    const size = this.posts.length;
    let i = 0;
    while(i < size) {
      this.showComment.push(false);
    }
  }
  
  getUsersForPosts() {
    if(this.posts) {
      this.usersForPosts = [];
      this.posts.forEach(post => {
        const foundUser = this.users.find(u => u.id === post.userId);
        if(foundUser) this.usersForPosts.push(foundUser)
      });
    }
  }
  filterByAuthor() {
    const user = this.users.find(u => u.username === this.filterText)
    if(user) {
      this.service.subscribeForPostsOfUser(user.id).subscribe((posts) => {
        this.posts = posts;
      });
      this.getUsersForPosts();
      this.createAnArray;
    }
  }
  createPost() {
    const foundUser = this.users.find(u => u.username === this.username && u.password === this.password)
    let newPost: IPost;
    if(foundUser) {
      this.service.createPost(foundUser.id, this.newPostTitle, this.newPostBody).subscribe((data) => 
          {
            console.log('post created', data);
            window.location.reload();
          },
          error => console.log(error)
      );
    }
  }
  createComment(postId: number, index: number) {
    const foundUser = this.users.find(u => u.username === this.username && u.password === this.password)
    let newPost: IPost;
    if(foundUser) {
      this.service.createComment(postId, this.commentName, foundUser.email, this.commentBody).subscribe((data) => {
        console.log('comment created', data);
        window.location.reload();
      },
        error => console.log(error)
      );
    }
  }

}
