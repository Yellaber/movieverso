import { InfoItem } from './info-item';
import { render } from '@testing-library/angular';

describe('InfoItem', () => {
  it('Should render the component when inputs contain strings values', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: 'Test label',
        value: 'Test value'
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(2);
    expect(spanElements[0].textContent).toBe('Test label');
    expect(spanElements[1].textContent).toBe('Test value');
    expect(hrElement).toBeInTheDocument();
  })

  it('Should not render the component when label input is an empty string and value input is provided', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: '',
        value: 'Test value'
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when inputs are empty strings', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: '',
        value: ''
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should render the component when label input is a string and value input is a number', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: 'Test label',
        value: 1000
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(true);
    expect(spanElements.length).toBe(2);
    expect(spanElements[0].textContent).toBe('Test label');
    expect(spanElements[1].textContent).toBe('US1,000.00');
    expect(hrElement).toBeInTheDocument();
  })

  it('Should not render the component when label input is an empty string and value input is a number', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: '',
        value: 1000
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(true);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when label input is undefined and value input is a number', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: undefined,
        value: 1000
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(true);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when label input is a string and value input is undefined', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: 'Test label',
        value: undefined
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when label input is an empty string and value input is undefined', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: '',
        value: undefined
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })

  it('Should not render the component when label and value inputs are undefined', async() => {
    const { fixture, container } = await render(InfoItem, {
      inputs: {
        label: undefined,
        value: undefined
      }
    });

    const isCurrency = fixture.componentInstance.isCurrency();
    const spanElements = container.querySelectorAll('span');
    const hrElement = container.querySelector('hr');
    expect(isCurrency).toBe(false);
    expect(spanElements.length).toBe(0);
    expect(hrElement).not.toBeInTheDocument();
  })
})
