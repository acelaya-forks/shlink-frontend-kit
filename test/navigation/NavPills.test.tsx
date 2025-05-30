import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NavPillItem, NavPills } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<NavPills />', () => {
  let originalError: typeof console.error;

  const setUp = (fill?: boolean) => render(
    <MemoryRouter>
      <NavPills fill={fill}>
        <NavPillItem to="1">1</NavPillItem>
        <NavPillItem to="2">2</NavPillItem>
        <NavPillItem to="3">3</NavPillItem>
      </NavPills>
    </MemoryRouter>,
  );

  beforeEach(() => {
    originalError = console.error;
    console.error = () => {}; // Suppress errors logged during this test
  });
  afterEach(() => {
    console.error = originalError;
  });

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    ['Foo'],
    [<span key="1">Hi!</span>],
    [[<NavPillItem key="1" to="" />, <span key="2">Hi!</span>]],
  ])('throws error when any of the children is not a NavPillItem', (children) => {
    expect.assertions(1);
    expect(() => render(<NavPills>{children}</NavPills>)).toThrow(
      'Only NavPillItem children are allowed inside NavPills.',
    );
  });

  it.each([
    [undefined],
    [true],
    [false],
  ])('renders provided items', (fill) => {
    const { container } = setUp(fill);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(3);
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(`${index + 1}`);
      expect(link).toHaveAttribute('href', `/${index + 1}`);
    });

    if (fill) {
      expect(container.querySelector('.nav')).toHaveClass('nav-fill');
    } else {
      expect(container.querySelector('.nav')).not.toHaveClass('nav-fill');
    }
  });
});
