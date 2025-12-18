import { AfterViewInit, ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormFilter } from './form-filter/form-filter';
import { ScrollService } from '@services';

const CLASS_OVERLAY = 'fixed inset-0 bg-stone-900/60 items-center justify-center z-50 hidden';
const CLASS_MODAL = 'w-[330px] lg:w-[430px] bg-stone-300 text-stone-700 rounded-md shadow-md transform transition-all duration-300 translate-y-full opacity-0';

@Component({
  selector: 'filter-modal-movies',
  imports: [ FontAwesomeModule, FormFilter, TranslatePipe ],
  templateUrl: './filter-modal-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterModalMovies implements AfterViewInit {
  private scrollService = inject(ScrollService);
  faCircleXmark = faCircleXmark;
  faSpinner = faSpinner;
  show = model.required<boolean>();
  classOverlay = signal<string>(CLASS_OVERLAY);
  classModal = signal<string>(CLASS_MODAL);

  ngAfterViewInit() {
    this.show() && this.onShow();
  }

  private setClassOverlay(oldClass: string, newClass: string) {
    const classOverlay = this.classOverlay().replace(oldClass, newClass);
    this.classOverlay.set(classOverlay);
  }

  private setClassModal(oldClass: string, newClass: string) {
    const classModal = this.classModal().replace(oldClass, newClass);
    this.classModal.set(classModal);
  }

  onShow() {
    this.setClassOverlay('hidden', 'flex');
    setTimeout(() => {
      this.scrollService.blockWindow(true);
      this.setClassModal('translate-y-full opacity-0', 'translate-y-0 opacity-100');
    }, 10);
  }

  onClose() {
    this.setClassModal('translate-y-0 opacity-100', 'translate-y-full opacity-0');
    setTimeout(() => {
      this.show.set(false);
      this.scrollService.blockWindow(false);
      this.setClassOverlay('flex', 'hidden');
    }, 300);
  }
}
