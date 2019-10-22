import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

test('renders title, author and likes', () => {
  const blog = {
    title: 'Component testing',
    author: 'Lalli Leipäjuusto',
    likes: 666
  };

  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent('Component testing');
  expect(component.container).toHaveTextContent('Lalli Leipäjuusto');
  expect(component.container).toHaveTextContent('blog has 666 likes');
});

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Component testing',
    author: 'Lalli Leipäjuusto',
    likes: 666
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
