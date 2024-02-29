import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSalesComponent } from './sidebar-sales.component';

describe('SidebarSalesComponent', () => {
  let component: SidebarSalesComponent;
  let fixture: ComponentFixture<SidebarSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
