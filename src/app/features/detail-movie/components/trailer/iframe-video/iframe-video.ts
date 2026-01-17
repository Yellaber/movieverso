import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const urlBase = 'https://www.youtube.com/embed';

@Component({
  selector: 'iframe-video',
  imports: [],
  template: `
    @if(videoKey()) {
      <section class="w-full max-w-3xl mx-auto aspect-video pt-5">
        <iframe class="w-full h-full" [src]="safeUrl()" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>
      </section>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeVideo {
  private sanitizer = inject(DomSanitizer);
  videoKey = input.required<string>();
  safeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(`${ urlBase }/${ this.videoKey() }`));
}
