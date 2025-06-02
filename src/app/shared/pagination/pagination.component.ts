import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pagination',
  imports: [ FontAwesomeModule ],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex justify-center items-center gap-5' }
})
export class PaginationComponent {
  faCircleChevronLeft = faCircleChevronLeft;
  faCircleChevronRight = faCircleChevronRight;
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  emitNewPage = output<number>();

  onPrevious() {
    if(this.currentPage() > 1) { this.emitNewPage.emit(this.currentPage() - 1); }
  };

  onNext() {
    if(this.currentPage() < this.totalPages()) { this.emitNewPage.emit(this.currentPage() + 1); }
  };
}
