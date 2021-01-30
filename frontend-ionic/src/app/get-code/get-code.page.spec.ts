import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetCodePage } from './get-code.page';

describe('GetCodePage', () => {
  let component: GetCodePage;
  let fixture: ComponentFixture<GetCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
