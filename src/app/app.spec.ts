import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  it('should render title', async () => {
    await render(App);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toHaveTextContent('Welcome artificer');
  });
});
