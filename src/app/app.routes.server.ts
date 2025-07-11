import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'movie/:id-slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'movie/:id-slug/recommendations',
    renderMode: RenderMode.Client
  },
  {
    path: 'movie/:id-slug/similar',
    renderMode: RenderMode.Client
  }
];
