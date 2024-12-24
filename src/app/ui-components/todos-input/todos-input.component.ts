import {Component, Signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TodosService} from '../../services/todos.service';

@Component({
  selector: 'app-todos-input',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todos-input.component.html',
  standalone: true,
  styleUrl: './todos-input.component.scss'
})
export class TodosInputComponent {
  todoForm = new FormGroup({
    todoName: new FormControl('',[])
  })
  allItemsChecked:Signal<boolean>
  todoListLength:Signal<number>
  constructor(public todosService: TodosService) {
    this.allItemsChecked  = this.todosService.canCheckAllList
    this.todoListLength  = this.todosService.todoListLength
  }
  get todoName():FormControl{
    return this.todoForm.get('todoName') as FormControl
  }
  keyPress(event:KeyboardEvent){
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.addTodo()
    }
  }

  addTodo() {
    this.todosService.addTodo(this.todoName.value)
    this.todoName.reset()
  }

  selectUnselectAll() {
    this.todosService.checkUncheckAll()
  }

}
