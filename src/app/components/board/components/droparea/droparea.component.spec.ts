import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropareaComponent } from './droparea.component';

describe('DropareaComponent', () => {
  let component: DropareaComponent;
  let fixture: ComponentFixture<DropareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
