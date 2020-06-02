import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateappPage } from './createapp.page';

describe('CreateappPage', () => {
  let component: CreateappPage;
  let fixture: ComponentFixture<CreateappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
