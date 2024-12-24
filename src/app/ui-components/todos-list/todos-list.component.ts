import {Component, Signal} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {TodosService} from '../../services/todos.service';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {ITodo} from '../../types/ITodo';
import {filterTypes} from '../../types/todo-filter.enum';


@Component({
  selector: 'app-todos-list',
  imports: [
    NgClass, CommonModule, TodoItemComponent
  ],
  standalone: true,
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})


export class TodosListComponent {
  todoList: Signal<ITodo[]>;
  activeTodoListLength: Signal<number>;

  constructor(public todoService: TodosService) {
    this.todoList = todoService.todoListToDisplay
    this.activeTodoListLength = todoService.activeTodoListLength
  }

  selectedFilter: string = ''
  filterTypes = filterTypes;

  changeFilterType(filterType: filterTypes) {
    this.selectedFilter = filterType
    this.todoService.setTodoFilter(filterType)
  }

  clearCompleted() {
    this.todoService.removeCompletedTodo()
  }


}
