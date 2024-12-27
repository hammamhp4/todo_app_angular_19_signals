import {Injectable} from '@angular/core';
import {ITodo} from '../types/ITodo';
import {TodoStore} from './todo.store';
import {filterTypes} from '../types/todo-filter.enum';

@Injectable({providedIn: 'root'})
export class TodoStoreService {
  constructor(private todoStore: TodoStore) {
  }

  addTodo(todoName: string) {
    const todoToAdd: ITodo = {id: Date.now().toString(), name: todoName, completed: false}
    this.todoStore.update(state => ({
      todoList: [...state.todoList, todoToAdd]
    }));
  }

  removeTodo(todoToRemove: ITodo) {
    this.todoStore.update(state => (
        {todoList: state.todoList.filter(todo => todo.id != todoToRemove.id)}
      )
    )
  }

  removeCompletedTodo() {
    this.todoStore.update(state => (
        {
          ...state,
          todoList: state.todoList.filter(todo => !todo.completed)
        }
      )
    )
  }

  checkUncheckAll() {
    this.todoStore.update(state => (
        {
          todoList: state.todoList.map(todo => {
            return {
              ...todo,
              completed: state.todoList.some(todoItem => !todoItem.completed)
            }
          })
        }
      )
    )
  }

  checkUncheckTodo(todoToEdit: ITodo) {
    this.todoStore.update(state => (
        {
          ...state,
          todoList: state.todoList.map(todo => {
            if (todoToEdit.id == todo.id) {
              return {
                ...todo,
                completed: !todoToEdit.completed
              }
            } else {
              return todo
            }
          })
        }
      )
    )
  }

  editTodoElement(todoToEdit: ITodo, newName: string) {
    this.todoStore.update(state => (
        {
          ...state,
          todoList: state.todoList.map(todo => {
            if (todoToEdit.id == todo.id) {
              return {
                ...todo,
                name: newName
              }
            } else {
              return todo
            }
          })
        }
      )
    )
  }

  setTodoFilter(filterType: filterTypes) {
    this.todoStore.update(state => ({
      ...state,
      todoFilter: filterType
    }))
  }
}
