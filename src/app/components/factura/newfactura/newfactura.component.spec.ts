import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfacturaComponent } from './newfactura.component';

describe('NewfacturaComponent', () => {
  let component: NewfacturaComponent;
  let fixture: ComponentFixture<NewfacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewfacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
