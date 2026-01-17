import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframeVideo } from './iframe-video';
import { MockDomSanitizer } from '@mocks';

const urlBase = 'https://www.youtube.com/embed';

describe('IframeVideo', () => {
  let component: IframeVideo;
  let fixture: ComponentFixture<IframeVideo>;
  let mockDomSanitizer: MockDomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ IframeVideo ],
      providers: [ MockDomSanitizer ]
    });

    fixture = TestBed.createComponent(IframeVideo);
    mockDomSanitizer = TestBed.inject(MockDomSanitizer);
    component = fixture.componentInstance;
  })

  it('Should display iframe video when videoKey input is provided and safeUrl signal contain a valid url', () => {
    fixture.componentRef.setInput('videoKey', 'gHlm5ZAW67u');
    fixture.detectChanges();
    const iframeElement = fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement.src).toBe(`${ urlBase }/gHlm5ZAW67u`);
  })

  it('Should not display iframe video when videoKey input is an empty string', () => {
    fixture.componentRef.setInput('videoKey', '');
    fixture.detectChanges();
    const iframeElement = fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).not.toBeInTheDocument();
  })

  it('Should not display iframe video when videoKey input is undefined', () => {
    fixture.componentRef.setInput('videoKey', undefined);
    fixture.detectChanges();
    const iframeElement = fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).not.toBeInTheDocument();
  })
})
