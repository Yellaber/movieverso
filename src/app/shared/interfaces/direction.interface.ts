import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Direction {
  label: 'previous' | 'next',
  faIcon: IconDefinition,
  class: string
};
