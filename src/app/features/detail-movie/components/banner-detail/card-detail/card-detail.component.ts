import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { environment } from '@environments/environment.developments';
import { DetailMovieResponse } from '@shared/interfaces';

@Component({
  selector: 'card-detail',
  imports: [ FontAwesomeModule ],
  templateUrl: './card-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'hidden md:flex flex-col rounded-md z-10' }
})
export class CardDetailComponent {
  faBookmark = faBookmark;
  faHeart = faHeart;
  faThumbsUp = faThumbsUp;
  movieDetail = input.required<DetailMovieResponse>();
  posterImage = computed(() =>
    this.movieDetail().poster_path? environment.imageUrl + this.movieDetail().poster_path: '/images/no-poster.jpg');
}
