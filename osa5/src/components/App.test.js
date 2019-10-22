import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('../services/blogs');
import App from '../App';

beforeEach(() => {
  localStorage.clear();
});

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('Log in to application'));

    expect(component.container).toHaveTextContent('Log in to application');
  });

  test('if logged in, blogs are rendered', async () => {
    const user = {
      username: 'simo',
      token: '1231231214',
      name: 'Simo Silakka'
    };

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.getByText('Blogs'));

    expect(component.container).toHaveTextContent('Blog 2 by Jack Sparrow');
    expect(component.container).toHaveTextContent(
      'Test blog 1 by Pertti Mikkola'
    );
    expect(component.container).toHaveTextContent(
      'Test blog 2 by Pertti Mikkola'
    );
  });
});
