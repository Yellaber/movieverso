import { BadgeListComponent } from './badge-list.component';
import { render, screen } from '@testing-library/angular';
import { Genre, Keyword, SpokenLanguage } from '@shared/interfaces';

const genres: Genre[] = [
  { id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' }
];

const keywords: Keyword[] = [
  { id: 1, name: 'Keyword 1' }, { id: 2, name: 'Keyword 2' }
];

const spokenLanguages: SpokenLanguage[] = [
  { english_name: 'English', iso_639_1: 'en', name: 'English' },
  { english_name: 'Spanish', iso_639_1: 'es', name: 'Spanish' }
];

test('Should display a list of genres correctly.', async() => {
  await render(BadgeListComponent, {
    inputs: { badgeList: genres }
  });
  expect(screen).toBeTruthy();
  const badge = screen.getAllByTestId('badge');
  expect(badge.length).toBe(genres.length);
  expect(badge[0]).toBeInTheDocument();
  expect(badge[1]).toBeInTheDocument();
});

test('Should display a list of keywords correctly.', async() => {
  await render(BadgeListComponent, {
    inputs: { badgeList: keywords }
  });
  expect(screen).toBeTruthy();
  const badge = screen.getAllByTestId('badge');
  expect(badge.length).toBe(keywords.length);
  expect(badge[0]).toBeInTheDocument();
  expect(badge[1]).toBeInTheDocument();
});

test('Should display a list of spoken languages correctly.', async() => {
  await render(BadgeListComponent, {
    inputs: { badgeList: spokenLanguages }
  });
  expect(screen).toBeTruthy();
  const badge = screen.getAllByTestId('badge');
  expect(badge.length).toBe(spokenLanguages.length);
  expect(badge[0]).toBeInTheDocument();
  expect(badge[1]).toBeInTheDocument();
});
