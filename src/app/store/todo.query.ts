import {Query} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {ITodoState} from '../types/ITodoState';
import {TodoStore} from './todo.store';
import {filterTypes} from '../types/todo-filter.enum';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TodoQuery extends Query<ITodoState> {
  constructor(protected todoStore: TodoStore) {
    super(todoStore);
  }

  allState$ = this.select();
  todoListToDisplay$ = this.select(state => {
    if (state.todoFilter == filterTypes.ACTIVE) {
      return state.todoList.filter(todoItem => !todoItem.completed)
    } else if (state.todoFilter == filterTypes.COMPLETED) {
      return state.todoList.filter(todoItem => todoItem.completed)
    } else {
      return state.todoList
    }
  });
  todoList$ = this.select(state => state.todoList);
  activeTodoListLength$ = this.select(state => state.todoList.filter(todoItem => !todoItem.completed).length);
  todoListToDisplayLength$ = this.todoListToDisplay$.pipe(map(todoList => todoList.length));
  allListIsChecked$ = this.select(state => state.todoList.length > 0 && state.todoList.every((todoIem) => todoIem.completed));
  todoFilter$ = this.select(state => state.todoFilter);

  // Returns { name, age }
  multiProps$ = this.select(['todoListToDisplay', "todoList"]);
}
