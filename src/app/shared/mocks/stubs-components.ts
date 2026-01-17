import { Component, input, ResourceRef } from '@angular/core';
import { CarouselConfig, Cast, DataSectionMovie, DetailMovie, Genre, Keyword, Movie, MovieCredit, PaginatedMovies, ProductionCompany, SpokenLanguage } from '@interfaces';

@Component({
  selector: 'banner-detail',
  template: `<li>StubBannerDetail</li>`
})
export class StubBannerDetail {
  movieDetail = input.required<DetailMovie>();
}

@Component({
  selector: 'banner-detail-skeleton',
  template: `<li>StubBannerDetailSkeleton</li>`
})
export class StubBannerDetailSkeleton {}

@Component({
  selector: 'side-detail-skeleton',
  template: `<li>StubSideDetailSkeleton</li>`
})
export class StubSideDetailSkeleton {}

@Component({
  selector: 'carousel-movies-skeleton',
  template: `<li>StubCarouselMoviesSkeleton</li>`
})
export class StubCarouselMoviesSkeleton {}

@Component({
  selector: 'carousel-credit-skeleton',
  template: `<li>StubCarouselCreditSkeleton</li>`
})
export class StubCarouselCreditSkeleton {}

@Component({
  selector: 'carousel',
  template: `<li>StubCarousel</li>`
})
export class StubCarousel {
  totalCard = input.required<number>();
  widthCardContainer = input.required<number>();
  bgControl = input.required<string>();
}

@Component({
  selector: 'carousel-title',
  template: `<li>StubCarouselTitle</li>`
})
export class StubCarouselTitle {
  carouselTitle = input.required<string>();
}

@Component({
  selector: 'carousel-movies',
  template: '<li>StubCarouselMovies</li>'
})
export class StubCarouselMovies {
  carouselConfig = input.required<CarouselConfig>();
}

@Component({
  selector: 'card-movie-skeleton',
  template: `<li>StubCardMovieSkeleton</li>`
})
export class StubCardMovieSkeleton {}

@Component({
  selector: 'carousel-credits',
  template: '<li>StubCarouselCredits</li>'
})
export class StubCarouselCredits {
  credit = input.required<MovieCredit>();
}

@Component({
  selector: 'credits',
  template: '<li>StubCredits</li>'
})
export class StubCredits {
  idMovie = input.required<number>();
}

@Component({
  selector: 'poster-movie',
  template: `<li>StubPosterMovie</li>`
})
export class StubPosterMovie {
  movie = input.required<Movie>();
}

@Component({
  selector: 'footer-poster',
  template: `<li>StubFooterPoster</li>`
})
export class StubFooterPoster {
  movie = input.required<Movie>();
}

@Component({
  selector: 'cast-profile',
  template: `<li>StubCastProfile</li>`
})
export class StubCastProfile {
  cast = input.required<Cast>();
}

@Component({
  selector: 'control',
  template: `<li>StubControl</li>`
})
export class StubControl {
  direction = input.required<string>();
  bgButton = input.required<string>();
}

@Component({
  selector: 'navigation',
  template: '<li>StubNavigation</li>'
})
export class StubNavigation {
  menuItems = input.required<string[]>();
}

@Component({
  selector: 'tag',
  template: '<li>StubTag</li>'
})
export class StubTag {
  text = input.required<string>();
  type = input<string>();
}

@Component({
  selector: 'rating',
  template: '<li>StubRating</li>'
})
export class StubRating {
  type = input.required<'popularity' | 'vote_average' | 'vote_count'>();
  value = input.required<number>();
}

@Component({
  selector: 'badge-list',
  template: '<li>StubBadgeList</li>'
})
export class StubBadgeList {
  badgeList = input.required<Genre[] | Keyword[] | SpokenLanguage[]>();
}

@Component({
  selector: 'filter-genre',
  template: '<li>StubFilterGenre</li>'
})
export class StubFilterGenre {
  genresIdSelected = input.required<string>();
}

@Component({
  selector: 'filter-sort-by',
  template: '<li>StubFilterSortBy</li>'
})
export class StubFilterSortBy {
  sortBy = input.required<string>();
}

@Component({
  selector: 'form-filter',
  template: '<li>StubFormFilter</li>'
})
export class StubFormFilter {}

@Component({
  selector: 'categories',
  template: '<li>StubCategories</li>'
})
export class StubCategories {
  menuItems = input.required<string[]>();
}

@Component({
  selector: 'load-related',
  template: '<li>StubLoadRelated</li>'
})
export class StubLoadRelated {
  movieId = input.required<number>();
  type = input.required<'recommendations' | 'similar'>();
}

@Component({
  selector: 'notification',
  template: '<li>StubNotification</li>'
})
export class StubNotification {
  notificationTitle = input.required<string>();
  message = input.required<string>();
}

@Component({
  selector: 'infinite-scroll',
  template: '<li>StubInfiniteScroll</li>'
})
export class StubInfiniteScroll {
  paginatedMovies = input.required<ResourceRef<PaginatedMovies[]>>();
  getPage(): number {
    return 1;
  }
}

@Component({
  selector: 'content-category',
  template: '<li>StubContentCategory</li>'
})
export class StubContentCategory {
  title = input.required<string>();
  paragraph = input.required<string>();
}

@Component({
  selector: 'load-category',
  template: '<li>StubLoadCategory</li>'
})
export class StubLoadCategory {
  endPoint = input.required<string>();
}

@Component({
  selector: 'category',
  template: '<li>StubCategory</li>'
})
export class StubCategory {
  name = input.required<string>();
}

@Component({
  selector: 'related-movie',
  template: '<li>StubRelatedMovie</li>'
})
export class StubRelatedMovie {
  type = input.required<string>();
}

@Component({
  selector: 'background-image',
  template: '<li>StubBackgroundImage</li>'
})
export class StubBackgroundImage {
  title = input.required<string>();
  backdropImagePath = input.required<string>();
  backdropImageSrcset = input.required<string>();
}

@Component({
  selector: 'short-information',
  template: '<li>StubShortInformation</li>'
})
export class StubShortInformation {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
}

@Component({
  selector: 'backdrop-image',
  template: '<li>StubBackdropImage</li>'
})
export class StubBackdropImage {
  title = input.required<string>();
  backdropImagePath = input.required<string>();
  backdropImageSrcset = input.required<string>();
}

@Component({
  selector: 'card-detail',
  template: '<li>StubCardDetail</li>'
})
export class StubCardDetail {
  title = input.required<string>();
  backdropImagePath = input.required<string>();
  backdropImageSrcset = input.required<string>();
}

@Component({
  selector: 'short-detail',
  template: '<li>StubShortDetail</li>'
})
export class StubShortDetail {
  movieDetail = input.required<Movie>();
}

@Component({
  selector: 'side-detail',
  template: '<li>StubSideDetail</li>'
})
export class StubSideDetail {
  movieDetail = input.required<DetailMovie>();
}

@Component({
  selector: 'banner-hero',
  template: '<li>StubBannerHero</li>'
})
export class StubBannerHero {
  heroType = input.required<string>();
  heroTitle = input.required<string>();
  movie = input.required<Movie>();
}

@Component({
  selector: 'section-movie',
  template: '<li>StubSectionMovie</li>'
})
export class StubSectionMovie {
  section = input.required<DataSectionMovie>();
}

@Component({
  selector: 'production-countries',
  template: '<li>StubProductionCountries</li>'
})
export class StubProductionCountries {
  productionCountries = input.required<string[]>();
}

@Component({
  selector: 'badge-section',
  template: '<li>StubBadgeSection</li>'
})
export class StubBadgeSection {
  titleSection = input.required<string>();
  badge = input.required<Keyword[] | SpokenLanguage[] | ProductionCompany[]>();
}

@Component({
  selector: 'info-item',
  template: '<li>StubInfoItem</li>'
})
export class StubInfoItem {
  label = input.required<string>();
  value = input.required<string | number>();
}

@Component({
  selector: 'trailer',
  template: '<li>StubTrailer</li>'
})
export class StubTrailer {
  movieId = input.required<number>();
}

@Component({
  selector: 'iframe-video',
  template: '<li>StubIframeVideo</li>'
})
export class StubIframeVideo {
  videoKey = input.required<string>();
}

@Component({
  selector: 'movie-list',
  template: '<li>StubMovieList</li>'
})
export class StubMovieList {
  movieId = input.required<number>();
  typeMovieList = input.required<'recommendations' | 'similar' | 'collection'>();
}

@Component({
  selector: 'info-movie',
  template: '<li>StubInfoMovie</li>'
})
export class StubInfoMovie {
  movieSelected = input.required<DetailMovie>();
}
