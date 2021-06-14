import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import MyBlogsScreen from '../MyBlogsScreen';

import axios from 'axios';

jest.mock('axios');

// Need this component in order to update the state
// because current MyBlogsScreen doesn't have userUpdate to render on screen
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

// Jest mock implementation of window.confirm
global.confirm = () => true;

beforeEach(async () => {
  store = makeTestStore();

  await store.dispatch({ type: 'USER_LOGIN_SUCCESS', payload: userData });
  await axios.get.mockResolvedValueOnce({ data: userBlogs });

  testRender(
    <Router>
      <DisplayState />
      <MyBlogsScreen location={location} history={history} />
    </Router>,
    {
      store,
    }
  );
});

describe("Show user's blogs and delete one", () => {
  // Put async and store update test above any silly tests
  // otherwise it breaks
  it('when form is submitted, dispach updateBlog and update a  blog', async () => {
    const blogData = {
      title: 'test blog title 2 update',
      content: 'test blog content 2 update',
      id: 5,
      username: 'Test User',
    };

    await axios.delete.mockResolvedValueOnce({ data: blogData });

    await waitFor(() => screen.getByText('test@example.com'));

    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    expect(screen.getAllByText('delete_forever').length).toEqual(2);

    userEvent.click(screen.getAllByText('delete_forever')[0]); // Click the delete button

    // Wait for the state update
    await waitFor(() => screen.findByText('Blog deleted!'));

    expect(screen.getByText('Blog deleted!')).toBeInTheDocument();
  });

  it('add button exists', () => {
    // screen.getAllByRole('');
    expect(screen.getByTitle('Add new blog')).toBeInTheDocument();
  });
});
