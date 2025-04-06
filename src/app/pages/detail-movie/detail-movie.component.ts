import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { DetailMovieResponse } from '../../interfaces/detail-movie-response.interface';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [ JsonPipe ],
  templateUrl: './detail-movie.component.html'
})
export default class DetailMovieComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  movie = signal<DetailMovieResponse>(Object.create({}));

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('id')) {
        const idMovie = +params.get('id')!;
        this.getMovieById(idMovie);
      }
    });
  }

  getMovieById(id: number) {
    return this.tmdbService.getMovieById(id).subscribe(detailMovie => this.movie.set(detailMovie));
  }
}
