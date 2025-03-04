import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TodoItemComponent,
    TitleCasePipe,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todoForm: FormGroup;
  private todoService = inject(TodoService);
  todoList = this.todoService.getTodoList();

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  addTodo() {
    this.todoForm.value.title &&
      this.todoService.addTodo(this.todoForm.value.title);
    this.todoForm.reset();
  }
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleCompleted(id: number) {
    this.todoService.toggleCompleted(id);
  }

  updateTodo({ id, title }: { id: number; title: string }) {
    this.todoService.updateTodo(id, title);
  }
}
