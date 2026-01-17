import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RelatedMovie } from './related-movie';
import { SeoFriendlyService, TmdbService } from '@services';
import { Categories } from '../categories/categories';
import { LoadRelated } from '../load-related/load-related';
import { Notification } from '../notification/notification';
import { MockActivedRoute, MockSeoFriendlyService, MockTmdbService, MockTranslatePipe, MockTranslateService, StubCategories, StubLoadRelated, StubNotification } from '@mocks';

describe('RelatedMovie', () => {
  let component: RelatedMovie;
  let fixture: ComponentFixture<RelatedMovie>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RelatedMovie ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivedRoute },
        { provide: SeoFriendlyService, useClass: MockSeoFriendlyService },
        { provide: TmdbService, useClass: MockTmdbService },
        { provide: TranslateService, useClass: MockTranslateService }
      ]
    })
    .overrideComponent(RelatedMovie, {
      remove: { imports: [ TranslatePipe, Categories, LoadRelated, Notification ] },
      add: { imports: [ MockTranslatePipe, StubCategories, StubLoadRelated, StubNotification ] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedMovie);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component when type input is recommendations', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'recommendations');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const linkElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories');
    const loadRelatedElement = fixture.nativeElement.querySelector('load-related');
    const notificationElement = fixture.nativeElement.querySelector('notification');
    expect(component.linkRelatedMovie()).toBe(`/movie/${component.idSlug()}/similar`);
    expect(component.movie.hasValue()).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(linkElement).toBeTruthy();
    expect(paragraphElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadRelatedElement).toBeTruthy();
    expect(notificationElement).toBeFalsy();
  }))

  it('Should render the component when type input is similar', fakeAsync(() => {
    fixture.componentRef.setInput('type', 'similar');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const linkElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories');
    const loadRelatedElement = fixture.nativeElement.querySelector('load-related');
    const notificationElement = fixture.nativeElement.querySelector('notification');
    expect(component.linkRelatedMovie()).toBe(`/movie/${component.idSlug()}/recommendations`);
    expect(component.movie.hasValue()).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(linkElement).toBeTruthy();
    expect(paragraphElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadRelatedElement).toBeTruthy();
    expect(notificationElement).toBeFalsy();
  }))

  it('Should render the component when type input is a string empty', fakeAsync(() => {
    fixture.componentRef.setInput('type', '');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const linkElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories');
    const loadRelatedElement = fixture.nativeElement.querySelector('load-related');
    const notificationElement = fixture.nativeElement.querySelector('notification');
    expect(component.linkRelatedMovie()).toBe(`/movie/${component.idSlug()}/similar`);
    expect(component.movie.hasValue()).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(linkElement).toBeTruthy();
    expect(paragraphElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadRelatedElement).toBeTruthy();
    expect(notificationElement).toBeFalsy();
  }))

  it('Should display notification when the idSlug is empty', fakeAsync(() => {
    fixture.componentRef.setInput('type', '');
    fixture.detectChanges();
    component.idSlug.set('');
    tick();
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('h3') as HTMLElement;
    const linkElement = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    const paragraphElement = fixture.nativeElement.querySelector('p') as HTMLParagraphElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories');
    const loadRelatedElement = fixture.nativeElement.querySelector('load-related');
    const notificationElement = fixture.nativeElement.querySelector('notification');
    expect(component.movie.hasValue()).toBeFalsy();
    expect(titleElement).toBeFalsy();
    expect(linkElement).toBeFalsy();
    expect(paragraphElement).toBeFalsy();
    expect(categoriesElement).toBeFalsy();
    expect(loadRelatedElement).toBeFalsy();
    expect(notificationElement).toBeTruthy();
  }))
})
