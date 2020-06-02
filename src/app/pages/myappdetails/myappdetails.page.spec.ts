import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyappdetailsPage } from './myappdetails.page';

describe('MyappdetailsPage', () => {
  let component: MyappdetailsPage;
  let fixture: ComponentFixture<MyappdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyappdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyappdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
