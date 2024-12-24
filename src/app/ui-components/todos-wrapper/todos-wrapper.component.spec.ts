import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosWrapperComponent } from './todos-wrapper.component';

describe('TodosWrapperComponent', () => {
  let component: TodosWrapperComponent;
  let fixture: ComponentFixture<TodosWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
