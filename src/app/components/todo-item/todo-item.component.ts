import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../interfaces/todo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() toggleCompleted = new EventEmitter<number>();
  @Output() updateTodo = new EventEmitter<{ id: number; title: string }>();

  editing = false;
  editedTitle = '';

  onDeleteTodo() {
    this.deleteTodo.emit(this.todo.id);
  }
  onToggleCompleted() {
    this.toggleCompleted.emit(this.todo.id);
  }

  startEdit() {
    this.editing = true;
    this.editedTitle = this.todo.title;
  }

  saveEdit() {
    if (this.editedTitle !== this.todo.title) {
      this.updateTodo.emit({ id: this.todo.id, title: this.editedTitle });
    }
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }
}
