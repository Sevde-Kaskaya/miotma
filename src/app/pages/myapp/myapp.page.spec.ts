import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyappPage } from './myapp.page';

describe('MyappPage', () => {
  let component: MyappPage;
  let fixture: ComponentFixture<MyappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
