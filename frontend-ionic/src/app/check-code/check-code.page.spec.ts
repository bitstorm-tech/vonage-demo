import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckCodePage } from './check-code.page';

describe('CheckCodePage', () => {
  let component: CheckCodePage;
  let fixture: ComponentFixture<CheckCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
