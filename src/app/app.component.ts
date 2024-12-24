import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodosInputComponent} from './ui-components/todos-input/todos-input.component';
import {TodosTitleComponent} from './ui-components/todos-title/todos-title.component';
import {TodosListComponent} from './ui-components/todos-list/todos-list.component';
import {TodosFooterComponent} from './ui-components/todos-footer/todos-footer.component';
import {TodosWrapperComponent} from './ui-components/todos-wrapper/todos-wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodosInputComponent,
    TodosTitleComponent,
    TodosListComponent,
    TodosFooterComponent,
    TodosWrapperComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-signals';
}
