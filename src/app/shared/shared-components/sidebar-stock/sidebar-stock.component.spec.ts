import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarStockComponent } from './sidebar-stock.component';

describe('SidebarStockComponent', () => {
  let component: SidebarStockComponent;
  let fixture: ComponentFixture<SidebarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarStockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
