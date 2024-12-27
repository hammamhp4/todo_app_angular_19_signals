import {ITodo} from './ITodo';
import {filterTypes} from './todo-filter.enum';

export interface ITodoState {
  todoList: ITodo[];
  todoListToDisplay: ITodo[];
  todoFilter: filterTypes;
}
