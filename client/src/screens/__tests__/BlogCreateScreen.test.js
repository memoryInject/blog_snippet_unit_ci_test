import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import BlogCreateScreen from '../BlogCreateScreen';

import axios from 'axios';

jest.mock('axios');

// Need this component in order to update the state
// because current BlogCreateScreen doesn't have userUpdate to render on screen
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

const userData = {
  username: 'Test User',
  email: 'test@example.com',
};

beforeEach(async () => {
  store = makeTestStore();
  testRender(
    <Router>
      <DisplayState />
      <BlogCreateScreen location={location} history={history} />
    </Router>,
    {
      store,
    }
  );
  await store.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: userData });
});

describe('fill form and submit', () => {
  // Put async and store update test above any silly tests
  // otherwise it breaks
  it('when form is submitted, dispach createBlog and create a new blog', async () => {
    const blogData = {
      username: 'Test User',
      title: 'Test Title',
      content: 'Test Content',
    };

    await axios.post.mockResolvedValueOnce({ data: blogData });

    await waitFor(() => screen.getByText('test@example.com'));

    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Blog Title'), {
      target: { value: 'Test Title' },
    });

    fireEvent.change(screen.getByLabelText('Blog Content'), {
      target: { value: 'Test Content' },
    });

    userEvent.click(screen.getByRole('button')); // Click the preview button

    // In preview screen
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit')); // Click the submit button

    // Wait for the state update
    await waitFor(() => screen.findByText('Blog created!'));

    expect(screen.getByText('Blog created!')).toBeInTheDocument();
  });

  it('text inputs and button exists', () => {
    // screen.getAllByRole('');
    // screen.debug();
    expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(screen.getAllByRole('button').length).toEqual(1);
    expect(screen.getAllByRole('button')).toBeTruthy();
  });
});
