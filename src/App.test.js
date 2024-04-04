/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);
  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
  
});

// Verify two buttons render
test('Button should render', () => {
  render(<App />);
  expect(screen.getAllByRole('button').length).toBe(2);
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', () => {
  render(<App />);
  let btn = screen.getAllByRole('button')[0]
  fireEvent.click(btn)
  expect(btn.textContent).toBe('Current theme: dark');
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  const {container} = render(<App />);
  let body = container.querySelector('.container').parentElement.parentElement
  fireEvent.click(screen.getAllByRole('button')[0])
  expect(body).toHaveStyle('color: #FFF')
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  render(<App />);
  let btn = screen.getAllByRole('button')[1]
  fireEvent.click(btn)
  expect(screen.queryByText('this content is hidden by default')).toBeInTheDocument();
  fireEvent.click(btn)
  expect(screen.queryByText('this content is hidden by default')).not.toBeInTheDocument();
});


/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
