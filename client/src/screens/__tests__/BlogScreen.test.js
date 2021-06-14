import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import BlogScreen from '../BlogScreen';

import axios from 'axios';

jest.mock('axios');

let store;

const location = {};
const history = { push: function () {} };
const match = { params: { id: 5 } };

beforeEach(async () => {
  await axios.get.mockResolvedValueOnce({
    data: {
      username: 'Groovy Gorilla',
      title: 'Blog Title',
      content: 'Blog Content',
    },
  });

  store = makeTestStore();
  testRender(
    <Router>
      <BlogScreen location={location} history={history} match={match} />
    </Router>,
    {
      store,
    }
  );
});

it('Get a blog by params id from backend', async () => {
  await waitFor(() => screen.getByText('Blog Title'));

  expect(screen.getByText(/Groovy Gorilla/)).toBeInTheDocument();
});
