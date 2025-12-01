import { render, screen } from '@testing-library/angular';
import { Notification } from '@components/notification/notification';

describe('Notification', () => {
  it('Should display the notification title in bold and the message correctly.', async() => {
    const { container } = await render(Notification, {
      inputs: {
        notificationTitle: 'Esto es un título',
        message: 'Esto es un mensaje',
      },
    });
    const spanElement = container.querySelector('span');
    expect(spanElement).toHaveTextContent('Esto es un título Esto es un mensaje');
    expect(screen.getByText('Esto es un título').tagName).toBe('STRONG');
  })
})
