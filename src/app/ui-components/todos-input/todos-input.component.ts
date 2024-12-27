import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TodoStoreService} from '../../store/todo.service';
import {TodoQuery} from '../../store/todo.query';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-todos-input',
  imports: [
    ReactiveFormsModule,
    AsyncPipe],
  templateUrl: './todos-input.component.html',
  standalone: true,
  styleUrl: './todos-input.component.scss'
})
export class TodosInputComponent {
  todoForm = new FormGroup({
    todoName: new FormControl('', [])
  })
  itemsChecked$: Observable<boolean>
  todoListLength$: Observable<number>

  constructor(public todoStoreService: TodoStoreService,
              public todoQuery: TodoQuery) {
    this.itemsChecked$ = this.todoQuery.allListIsChecked$
    this.todoListLength$ = this.todoQuery.todoListToDisplayLength$ || 0
  }

  get todoName(): FormControl {
    return this.todoForm.get('todoName') as FormControl
  }

  keyPress(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.addTodo()
    }
  }

  addTodo() {
    this.todoStoreService.addTodo(this.todoName.value)
    this.todoName.reset()
  }

  selectUnselectAll() {
    this.todoStoreService.checkUncheckAll()
  }

}
