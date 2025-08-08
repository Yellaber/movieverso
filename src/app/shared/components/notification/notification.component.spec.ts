import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificationComponent } from "@shared/components/notification/notification.component";

describe('NotificationComponent', () => {
  let notificationComponent: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NotificationComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    notificationComponent = fixture.componentInstance;
  });

  it('Should create the component.', () => {
    expect(notificationComponent).toBeTruthy();
  });

  it('Should display the notification title and message correctly.', () => {
    fixture.componentRef.setInput('notificationTitle', 'Esto es un título');
    fixture.componentRef.setInput('message', 'Esto es un mensaje');
    fixture.detectChanges();
    const strongElement = fixture.nativeElement.querySelector('strong') as HTMLElement;
    const spanElement = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    expect(strongElement.textContent).toContain(notificationComponent.notificationTitle());
    expect(spanElement.textContent).toContain(notificationComponent.message());
  });
});
