import { Component } from '@angular/core';
import { MyService } from './my-service.service';
import { IUser } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'midterm-project';

  users: IUser[];

  constructor(public myService: MyService) {}

  async ngOnInit() {
    // this.todos = await this.todoService.getTodos();

    this.myService
        .subscribeForUsers()
        // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
        .subscribe((users) => {
          console.log('myservice')
          this.users = users;
        });
  }

}
