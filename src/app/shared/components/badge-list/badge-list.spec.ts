import { BadgeList } from './badge-list';
import { render, screen } from '@testing-library/angular';
import { Genre, Keyword, SpokenLanguage } from '@interfaces';

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

describe('BadgeListComponent.', () => {
  it('Should display a list of genres correctly.', async() => {
    await render(BadgeList, {
      inputs: { badgeList: genres }
    });
    const badges = screen.getAllByTestId('badge');
    expect(badges.length).toBe(genres.length);
    expect(badges[0].textContent).toBe(genres[0].name);
    expect(badges[1].textContent).toBe(genres[1].name);
  })

  it('Should display a list of keywords correctly.', async() => {
    await render(BadgeList, {
      inputs: { badgeList: keywords }
    });
    const badges = screen.getAllByTestId('badge');
    expect(badges.length).toBe(keywords.length);
    expect(badges[0].textContent).toBe(keywords[0].name);
    expect(badges[1].textContent).toBe(keywords[1].name);
  })

  it('Should display a list of spoken languages correctly.', async() => {
    await render(BadgeList, {
      inputs: { badgeList: spokenLanguages }
    });
    const badges = screen.getAllByTestId('badge');
    expect(badges.length).toBe(spokenLanguages.length);
    expect(badges[0].textContent).toBe(spokenLanguages[0].name);
    expect(badges[1].textContent).toBe(spokenLanguages[1].name);
  })
})
