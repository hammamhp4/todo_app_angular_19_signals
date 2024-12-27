import {Component} from '@angular/core';
import {AsyncPipe, NgClass} from '@angular/common';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {ITodo} from '../../types/ITodo';
import {filterTypes} from '../../types/todo-filter.enum';
import {Observable} from 'rxjs';
import {TodoStoreService} from '../../store/todo.service';
import {TodoQuery} from '../../store/todo.query';


@Component({
  selector: 'app-todos-list',
  imports: [
    NgClass,
    AsyncPipe,
    TodoItemComponent
  ],
  standalone: true,
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})


export class TodosListComponent {
  todoList$: Observable<ITodo[]>;
  activeTodoListLength: Observable<number>;

  constructor( public todoStoreService: TodoStoreService,
              public todoQuery: TodoQuery
  ) {
    this.todoList$ = todoQuery.todoListToDisplay$
    this.activeTodoListLength = todoQuery.activeTodoListLength$
  }

  selectedFilter: string = ''
  filterTypes = filterTypes;

  changeFilterType(filterType: filterTypes) {
    this.selectedFilter = filterType
    this.todoStoreService.setTodoFilter(filterType)
  }

  clearCompleted() {
    this.todoStoreService.removeCompletedTodo()
  }


}
