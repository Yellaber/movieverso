import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private genresId = signal<number[]>([]);

  setGenresId(genresId: number[]) { this.genresId.set(genresId) };

  getGenresId(): number[] { return this.genresId() };
}
