import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosTitleComponent } from './todos-title.component';

describe('TodosTitleComponent', () => {
  let component: TodosTitleComponent;
  let fixture: ComponentFixture<TodosTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
