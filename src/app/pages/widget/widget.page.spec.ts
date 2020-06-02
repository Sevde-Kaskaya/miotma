import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WidgetPage } from './widget.page';

describe('WidgetPage', () => {
  let component: WidgetPage;
  let fixture: ComponentFixture<WidgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
