import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Categories } from '@components/categories/categories';
import { BannerDetail } from '../banner-detail/banner-detail';
import { Credits } from '../credits/credits';
import { SideDetail } from '../side-detail/side-detail';
import { MovieList } from '../movie-list/movie-list';
import { Notification } from '@components/notification/notification';
import { Trailer } from '../trailer/trailer';
import { DetailMovie } from '@interfaces';

const menuItems = [ 'upcoming', 'now-playing', 'popular', 'top-rated', 'trending' ];

@Component({
  selector: 'info-movie',
  imports: [ Categories, BannerDetail, Credits, SideDetail, MovieList, Notification, TranslatePipe, Trailer ],
  templateUrl: './info-movie.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoMovie {
  menuItems = signal<string[]>(menuItems);
  movieSelected = input.required<DetailMovie | undefined>();
  idCollection = computed<number | undefined>(() => {
    const movieSelected = this.movieSelected();
    if(!movieSelected) return undefined;
    if(!movieSelected.belongs_to_collection) return undefined;
    return movieSelected.belongs_to_collection.id;
  });
}
