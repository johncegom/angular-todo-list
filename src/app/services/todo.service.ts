import { Injectable, signal } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList = signal<Todo[]>([
    { id: 1, title: 'Do Project 1', completed: false },
    { id: 2, title: 'Do Project 2', completed: false },
  ]);

  getTodoList() {
    return this.todoList;
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: this.todoList().length + 1,
      title,
      completed: false,
    };
    this.todoList.update((todoList) => [...todoList, newTodo]);
  }

  deleteTodo(id: number) {
    this.todoList.update((todoList) => {
      return todoList.filter((todo) => todo.id !== id);
    });
  }

  toggleCompleted(id: number) {
    this.todoList.update((todoList) => {
      return todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }

  updateTodo(id: number, title: string) {
    this.todoList.update((todoList) => {
      return todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: title };
        }
        return todo;
      });
    });
  }
}
