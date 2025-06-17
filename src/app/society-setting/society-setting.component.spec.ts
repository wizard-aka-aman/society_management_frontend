import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietySettingComponent } from './society-setting.component';

describe('SocietySettingComponent', () => {
  let component: SocietySettingComponent;
  let fixture: ComponentFixture<SocietySettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietySettingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocietySettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
