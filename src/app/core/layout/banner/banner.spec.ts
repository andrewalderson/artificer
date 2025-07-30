import { render } from '@testing-library/angular';
import { Banner } from './banner';

describe('Banner', () => {
  it('should render logo', async () => {
    const { getByRole } = await render(Banner);
    const logo = getByRole('link', { name: 'Artificer' });

    expect(logo).toBeInTheDocument();
  });
});
