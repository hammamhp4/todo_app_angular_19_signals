import {Component, Input, signal} from '@angular/core';
import {ITodo} from '../../types/ITodo';
import {NgClass} from '@angular/common';
import {TodosService} from '../../services/todos.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AutofocusInputDirective} from '../../directives/autofocus-input.directive';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgClass,
    ReactiveFormsModule,
    AutofocusInputDirective
  ],
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {

  @Input(({required: true})) todoItem!: ITodo;
  hideClose = true
  showEditForm = signal(false);
  todoEditForm = new FormGroup({
    todoName: new FormControl('', [])
  });

  constructor(public todosService: TodosService) {
  }

  get todoNewName(): FormControl {
    return this.todoEditForm.get('todoName') as FormControl
  }

  keyPress(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.addTodo();
      this.disableEditMode();
    }
  }

  addTodo() {
    this.todosService.editTodoElement(this.todoItem, this.todoNewName.value)
  }


  showCloseButton() {
    this.hideClose = false;
  }

  hideCloseButton() {
    this.hideClose = true;
  }

  removeTodo() {
    this.todosService.removeTodo(this.todoItem)
  }

  todoItemClicked() {
    this.todosService.checkUncheckTodo(this.todoItem)
  }

  enableEditMode() {
    this.todoNewName.setValue(this.todoItem.name)
    this.showEditForm.set(true)
  }

  disableEditMode() {
    this.showEditForm.set(false)
  }

}
