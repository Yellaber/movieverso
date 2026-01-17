import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Category } from './category';
import { ContentCategory } from './content-category/content-category';
import { Categories } from '../categories/categories';
import { LoadCategory } from '../load-category/load-category';
import { SeoFriendlyService } from '@services';
import { MockSeoFriendlyService, StubCategories, StubContentCategory, StubLoadCategory } from '@mocks';

describe('Category.', () => {
  let component: Category;
  let fixture: ComponentFixture<Category>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Category ],
      providers: [{ provide: SeoFriendlyService, useClass: MockSeoFriendlyService }]
    })
    .overrideComponent(Category, {
      remove: { imports: [ ContentCategory, Categories, LoadCategory ] },
      add: { imports: [ StubContentCategory, StubCategories, StubLoadCategory ] },
    })
    .compileComponents();

    fixture = TestBed.createComponent(Category);
    component = fixture.componentInstance;
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('Should render the component correctly when name input is "upcoming"', () => {
    fixture.componentRef.setInput('name', 'upcoming');
    fixture.detectChanges();
    const contentCategoryElement = fixture.nativeElement.querySelector('content-category') as HTMLElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const loadCategoryElement = fixture.nativeElement.querySelector('load-category') as HTMLElement;
    expect(contentCategoryElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadCategoryElement).toBeTruthy();
    expect(component.menuItems()).toEqual([ 'now-playing', 'popular', 'top-rated', 'trending' ]);
    expect(component.titlePage()).toEqual('routes.upcoming');
    expect(component.paragraphPage()).toEqual('upcoming.paragraph');
    expect(component.endPoint()).toEqual('movie/upcoming');
  })

  it('Should render the component correctly when name input is "now-playing"', () => {
    fixture.componentRef.setInput('name', 'now-playing');
    fixture.detectChanges();
    const contentCategoryElement = fixture.nativeElement.querySelector('content-category') as HTMLElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const loadCategoryElement = fixture.nativeElement.querySelector('load-category') as HTMLElement;
    expect(contentCategoryElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadCategoryElement).toBeTruthy();
    expect(component.menuItems()).toEqual([ 'upcoming', 'popular', 'top-rated', 'trending' ]);
    expect(component.titlePage()).toEqual('routes.nowPlaying');
    expect(component.paragraphPage()).toEqual('nowPlaying.paragraph');
    expect(component.endPoint()).toEqual('movie/now_playing');
  })

  it('Should render the component correctly when name input is "popular"', () => {
    fixture.componentRef.setInput('name', 'popular');
    fixture.detectChanges();
    const contentCategoryElement = fixture.nativeElement.querySelector('content-category') as HTMLElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const loadCategoryElement = fixture.nativeElement.querySelector('load-category') as HTMLElement;
    expect(contentCategoryElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadCategoryElement).toBeTruthy();
    expect(component.menuItems()).toEqual([ 'upcoming', 'now-playing', 'top-rated', 'trending' ]);
    expect(component.titlePage()).toEqual('routes.popular');
    expect(component.paragraphPage()).toEqual('popular.paragraph');
    expect(component.endPoint()).toEqual('movie/popular');
  })

  it('Should render the component correctly when name input is "top-rated"', () => {
    fixture.componentRef.setInput('name', 'top-rated');
    fixture.detectChanges();
    const contentCategoryElement = fixture.nativeElement.querySelector('content-category') as HTMLElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const loadCategoryElement = fixture.nativeElement.querySelector('load-category') as HTMLElement;
    expect(contentCategoryElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadCategoryElement).toBeTruthy();
    expect(component.menuItems()).toEqual([ 'upcoming', 'now-playing', 'popular', 'trending' ]);
    expect(component.titlePage()).toEqual('routes.topRated');
    expect(component.paragraphPage()).toEqual('topRated.paragraph');
    expect(component.endPoint()).toEqual('movie/top_rated');
  })

  it('Should render the component correctly when name input is "trending"', () => {
    fixture.componentRef.setInput('name', 'trending');
    fixture.detectChanges();
    const contentCategoryElement = fixture.nativeElement.querySelector('content-category') as HTMLElement;
    const categoriesElement = fixture.nativeElement.querySelector('categories') as HTMLElement;
    const loadCategoryElement = fixture.nativeElement.querySelector('load-category') as HTMLElement;
    expect(contentCategoryElement).toBeTruthy();
    expect(categoriesElement).toBeTruthy();
    expect(loadCategoryElement).toBeTruthy();
    expect(component.menuItems()).toEqual([ 'upcoming', 'now-playing', 'popular', 'top-rated' ]);
    expect(component.titlePage()).toEqual('routes.trending');
    expect(component.paragraphPage()).toEqual('trending.paragraph');
    expect(component.endPoint()).toEqual('trending/movie/day');
  })
})
