import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import BlogEditScreen from '../BlogEditScreen';

import axios from 'axios';

jest.mock('axios');

// Need this component in order to update the state
// because current BlogEditScreen doesn't have userUpdate to render on screen
function DisplayState() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <h2>Display State</h2>
      {userInfo && (
        <>
          <h1>{userInfo.username}</h1>
          <h1>{userInfo.email}</h1>
        </>
      )}
    </div>
  );
}

let store;

const location = {};
const history = { push: function () {} };
const match = { params: { id: '5' } };

const userBlogs = [
  {
    title: 'test blog title 1',
    content: 'test blog content 1',
    id: 2,
    username: 'Test User',
  },
  {
    title: 'test blog title 2',
    content: 'test blog content 2',
    id: 5,
    username: 'Test User',
  },
];

const userData = {
  username: 'Test User',
  email: 'test@example.com',
};

beforeEach(async () => {
  store = makeTestStore();

  await store.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: userData });
  await store.dispatch({
    type: 'BLOG_USER_SUCCESS',
    payload: { blogs: userBlogs },
  });

  testRender(
    <Router>
      <DisplayState />
      <BlogEditScreen location={location} history={history} match={match} />
    </Router>,
    {
      store,
    }
  );
});

describe('fill form and submit', () => {
  // Put async and store update test above any silly tests
  // otherwise it breaks
  it('when form is submitted, dispach updateBlog and update a  blog', async () => {
    const blogData = {
      title: 'test blog title 2 update',
      content: 'test blog content 2 update',
      id: 5,
      username: 'Test User',
    };

    await axios.put.mockResolvedValueOnce({ data: blogData });

    await waitFor(() => screen.getByText('test@example.com'));

    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Blog Title'), {
      target: { value: 'test blog title 2 update' },
    });

    fireEvent.change(screen.getByLabelText('Blog Content'), {
      target: { value: 'test blog content 2 update' },
    });

    userEvent.click(screen.getByRole('button')); // Click the preview button

    // In preview screen
    expect(screen.getByText('test blog title 2 update')).toBeInTheDocument();
    expect(screen.getByText('test blog content 2 update')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit')); // Click the submit button

    // Wait for the state update
    await waitFor(() => screen.findByText('Blog updated!'));

    expect(screen.getByText('Blog updated!')).toBeInTheDocument();
  });

  it('text inputs and button exists', () => {
    // screen.getAllByRole('');
    // screen.debug();
    expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(screen.getAllByRole('button').length).toEqual(1);
    expect(screen.getAllByRole('button')).toBeTruthy();
  });
});
