import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CastProfile } from './cast-profile';
import { ImageService } from '@services';
import { Cast, Department } from '@interfaces';

const mockCast: Cast = {
  adult: false,
  gender: 2,
  id: 1234,
  known_for_department: Department.Acting,
  name: 'Jhon Doe',
  original_name: 'Jhon Doe',
  popularity: 8,
  profile_path: '/images/no-profile.jpg',
  cast_id: 1234,
  character: 'Jhon Doe',
  credit_id: '1234',
  order: 1,
  department: Department.Acting,
  job: 'Acting'
}

describe('CastProfile', () => {
  let component: CastProfile;
  let fixture: ComponentFixture<CastProfile>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CastProfile ],
      providers: [{ provide: ImageService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastProfile);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the cast profile component', () => {
    fixture.componentRef.setInput('cast', mockCast);
    fixture.detectChanges();
    const imgElement = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    const spanElements = fixture.nativeElement.querySelectorAll('span') as NodeListOf<HTMLSpanElement>;
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockCast.profile_path);
    expect(imgElement).toHaveAttribute('srcset', '/images/no-profile.jpg 45w, /images/no-profile.jpg 185w, /images/no-profile.jpg 632w');
    expect(imgElement).toHaveAttribute('alt', mockCast.original_name);
    expect(spanElements.length).toBe(2);
    expect(spanElements[0].textContent).toContain(mockCast.original_name);
    expect(spanElements[1].textContent).toContain(mockCast.character);
  })
})
