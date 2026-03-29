import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

describe('Button', () => {
  it('renders a button element', () => {
    render(<Button icon={faPlus} onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button icon={faPlus} onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders an SVG icon', () => {
    render(<Button icon={faPlus} onClick={() => {}} />);
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});
