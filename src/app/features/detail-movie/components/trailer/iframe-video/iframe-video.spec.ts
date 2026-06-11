import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IframeVideo } from './iframe-video';
import { MockDomSanitizer } from '@mocks';

const urlBase = 'https://www.youtube.com/embed';

describe('IframeVideo', () => {
  let fixture: ComponentFixture<IframeVideo>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ IframeVideo ],
      providers: [ MockDomSanitizer ]
    });

    fixture = TestBed.createComponent(IframeVideo);
  })

  it('Should display iframe video when videoKey input is provided and safeUrl signal contain a valid url', () => {
    fixture.componentRef.setInput('videoKey', 'gHlm5ZAW67u');
    fixture.detectChanges();
    const iframeElement = fixture.nativeElement.querySelector('iframe');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement.src).toBe(`${ urlBase }/gHlm5ZAW67u`);
  })
})
