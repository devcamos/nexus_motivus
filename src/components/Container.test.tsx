import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Container } from '@/components/Container';

describe('Container', () => {
  it('renders children inside a div by default', () => {
    render(<Container>Content</Container>);
    expect(screen.getByText('Content').tagName).toBe('DIV');
  });

  it('supports semantic tags and custom class names', () => {
    render(
      <Container as="main" className="extra">
        Main
      </Container>
    );
    const el = screen.getByText('Main');
    expect(el.tagName).toBe('MAIN');
    expect(el.className).toContain('extra');
    expect(el.className).toContain('max-w-5xl');
  });
});
