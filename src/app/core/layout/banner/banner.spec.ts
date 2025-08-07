import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { render } from '@testing-library/angular';
import { SELECTOR as THEME_SWITCHER_SELECTOR } from '../../theme/theme-switcher';
import { Logo } from '../logo/logo';
import { Banner } from './banner';

@Component({
  selector: THEME_SWITCHER_SELECTOR,
  template: '',
})
class ThemeSwitcherStub {}

describe('Banner', () => {
  it('should render logo', async () => {
    const { getByRole } = await render(Banner, {
      componentImports: [ThemeSwitcherStub, Logo, RouterLink, MatButton],
    });
    const logo = getByRole('link', { name: 'Artificer' });

    expect(logo).toBeInTheDocument();
  });
});
