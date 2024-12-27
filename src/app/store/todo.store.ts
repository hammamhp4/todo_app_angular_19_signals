import {Store, StoreConfig,} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {ITodoState} from '../types/ITodoState';
import {filterTypes} from '../types/todo-filter.enum';


export function createInitialState(): ITodoState {
  return {
    todoList:[],
    todoListToDisplay: [],
    todoFilter: filterTypes.ALL
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends Store<ITodoState> {
  constructor() {
    super(createInitialState());
  }
}
