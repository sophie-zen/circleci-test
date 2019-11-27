import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
} from '@testing-library/react'
import App, { initialHit } from './App';

describe('Basic rendering', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Button functionality', () => {
  const { getByTestId } = render(<App />);
  it('App loads with initial state of 0', () => {
    const hitValue = getByTestId('hits');
    expect(hitValue.textContent).toBe(initialHit.toString());
  });

  it('should increase +1 when button is clicked once', () => {
    fireEvent.click(getByTestId('app-button'));
    const hitValue = getByTestId('hits');
    expect(hitValue.textContent).toBe('10');
  });

  it('should increase +9 so show return 10 when button is clicked 9 times more', () => {
    for (let i = 0; i < 9; i++) {
      fireEvent.click(getByTestId('app-button'));
    }
    const hitValue = getByTestId('hits');
    expect(hitValue.textContent).toBe('1');
  });

})