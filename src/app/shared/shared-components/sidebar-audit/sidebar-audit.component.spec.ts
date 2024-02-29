import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAuditComponent } from './sidebar-audit.component';

describe('SidebarAuditComponent', () => {
  let component: SidebarAuditComponent;
  let fixture: ComponentFixture<SidebarAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
