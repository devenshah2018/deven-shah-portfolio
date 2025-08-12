import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { FloatingName } from '../components/floating-name';

describe('FloatingName Component', () => {
  it('renders without crashing', () => {
    render(<FloatingName />);
  });
});
