import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('only title and author are visible by default', () => {
  const blog = {
    title: 'Component testing',
    author: 'Lalli Leipäjuusto',
    likes: 666,
    url: 'https://lalli.fi',
    user: {
      username: 'mpet',
      name: 'Mikko Petteri',
      id: '5d9b7721810a7d314c8a5680'
    }
  };

  const user = {
    username: 'mpet',
    name: 'Mikko Petteri',
    id: '5d9b7721810a7d314c8a5680'
  };

  const mockSetBlogs = jest.fn();
  const mockSetMessage = jest.fn();
  const mockSetMessageStyle = jest.fn();
  const mockSuccessStyle = {};

  const component = render(
    <Blog
      blog={blog}
      user={user}
      setBlogs={mockSetBlogs}
      setMessage={mockSetMessage}
      successStyle={mockSuccessStyle}
      setMessageStyle={mockSetMessageStyle}
    />
  );

  expect(component.container).toHaveTextContent(
    'Component testing by Lalli Leipäjuusto'
  );

  const div = component.container.querySelector('.hidden');
  expect(div).toHaveStyle('display: none');
});

test('clicking the title expands the blog', async () => {
  const blog = {
    title: 'Component testing',
    author: 'Lalli Leipäjuusto',
    likes: 666,
    url: 'https://lalli.fi',
    user: {
      username: 'mpet',
      name: 'Mikko Petteri',
      id: '5d9b7721810a7d314c8a5680'
    }
  };

  const user = {
    username: 'mpet',
    name: 'Mikko Petteri',
    id: '5d9b7721810a7d314c8a5680'
  };

  const mockSetBlogs = jest.fn();
  const mockSetMessage = jest.fn();
  const mockSetMessageStyle = jest.fn();
  const mockSuccessStyle = {};

  const component = render(
    <Blog
      blog={blog}
      user={user}
      setBlogs={mockSetBlogs}
      setMessage={mockSetMessage}
      successStyle={mockSuccessStyle}
      setMessageStyle={mockSetMessageStyle}
    />
  );

  const title = component.container.querySelector('.titlerow');
  fireEvent.click(title);

  const div = component.container.querySelector('.hidden');
  expect(div).not.toHaveStyle('display: none');
});
