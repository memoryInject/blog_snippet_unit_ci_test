import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import HomeScreen from '../HomeScreen';

import axios from 'axios';

jest.mock('axios');

// Need this component in order to update the state
// because current HomeScreen doesn't have userUpdate to render on screen
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

const match = {
  params: { pageNumber: 1 },
};

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
  {
    title: 'test blog title 3',
    content: 'test blog content 3',
    id: 8,
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
  await axios.get.mockResolvedValueOnce({ data: { blogs: userBlogs } });

  testRender(
    <Router>
      <DisplayState />
      <HomeScreen location={location} match={match} />
    </Router>,
    {
      store,
    }
  );
});

describe('Show all blogs', () => {
  it('list all the blogs', () => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Get all blogs
    expect(screen.getAllByText(/test blog/).length).toEqual(3);
  });

  it('add button exists', () => {
    // screen.getAllByRole('');
    expect(screen.getByTitle('Add new blog')).toBeInTheDocument();
  });
});
