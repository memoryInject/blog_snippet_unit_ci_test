import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { testRender, makeTestStore } from '../../reduxTestUtils';
import ProfileScreen from '../ProfileScreen';

import axios from 'axios';

jest.mock('axios');

// Need this component in order to update the state
// because current ProfileScreen doesn't have userUpdate to render on screen
function DisplayState() {
  const userUpdate = useSelector((state) => state.userUpdate);
  const { user } = userUpdate;

  return (
    <div>
      <h2>Display State</h2>
      {user && (
        <>
          <h1>{user.username}</h1>
          <h1>{user.email}</h1>
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
      <ProfileScreen location={location} history={history} />
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
  it('when form is submitted, dispach update and get back user from backend', async () => {
    await axios.put.mockResolvedValueOnce({
      data: { username: 'Updated User', email: 'updatedUser@example.com' },
    });

    await waitFor(() => screen.getByDisplayValue('test@example.com'));

    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    // Wait for the state update
    await waitFor(() => screen.findByText('updatedUser@example.com'));

    expect(screen.getByText('updatedUser@example.com')).toBeInTheDocument();
  });

  it('text inputs and button exists', () => {
    // screen.getAllByRole('');
    // screen.debug();
    expect(screen.getAllByRole('textbox').length).toEqual(2);
    expect(screen.getAllByRole('button').length).toEqual(1);
    expect(screen.getAllByRole('button')).toBeTruthy();
    expect(screen.queryAllByText(/Password/).length).toEqual(2);
  });
});
