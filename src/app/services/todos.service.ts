import {computed, Injectable, signal, WritableSignal} from '@angular/core';
import {ITodo} from '../types/ITodo';
import {filterTypes} from '../types/todo-filter.enum';

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  todoList: WritableSignal<ITodo[]> = signal<ITodo[]>([]);
  todoListFilter: WritableSignal<filterTypes> = signal<filterTypes>(filterTypes.ALL);
  activeTodoList = computed<ITodo[]>(() => this.todoList().filter(item => !item.completed));
  completedTodoList = computed<ITodo[]>(() => this.todoList().filter(item => item.completed));
  activeTodoListLength = computed<number>(() => this.activeTodoList().length);
  todoListLength = computed<number>(() => this.todoList().length);
  todoListStatus = computed<boolean>(() => this.activeTodoList().some((todoIem) => !todoIem.completed));
  canCheckAllList = computed<boolean>(() => this.todoList().length > 0 && this.todoList().some((todoIem) => !todoIem.completed));
  todoListToDisplay = computed<ITodo[]>(() => {
    if (this.todoListFilter() == filterTypes.ACTIVE) {
      return this.activeTodoList()
    } else if (this.todoListFilter() == filterTypes.COMPLETED) {
      return this.completedTodoList();
    } else {
      return this.todoList()
    }
  })

  constructor() {
    // effect(() => {
    //   console.log(`The current count is: ${this.todoList()}`);
    // });
  }

  addTodo(todoName: string) {
    const todoToAdd: ITodo = {id: Date.now().toString(), name: todoName, completed: false}
    this.todoList.update(todos => [...todos, todoToAdd])
  }

  removeTodo(todoToRemove: ITodo) {
    this.todoList.update(todos => todos.filter(todo => todo.id != todoToRemove.id))
  }

  removeCompletedTodo() {
    this.todoList.update(todos => todos.filter(todo => !todo.completed))
  }

  checkUncheckAll() {
    this.todoList.update(todos => todos.map(todo => {
      return {
        ...todo,
        completed: this.todoListStatus()
      }
    }))
  }

  checkUncheckTodo(todoToEdit: ITodo) {
    this.todoList.update(todos => todos.map(todo => {
      if (todoToEdit.id == todo.id) {
        return {
          ...todo,
          completed: !todoToEdit.completed
        }
      } else {
        return todo

      }
    }))
  }

  editTodoElement(todoToEdit: ITodo, newName: string) {
    this.todoList.update(todos => todos.map(todo => {
      if (todoToEdit.id == todo.id) {
        return {
          ...todo,
          name: newName
        }
      } else {
        return todo
      }
    }))
  }

  setTodoFilter(filterType: filterTypes) {
    this.todoListFilter.set(filterType)
  }


}
