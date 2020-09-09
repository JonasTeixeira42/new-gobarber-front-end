import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../context/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user123',
        name: 'John',
        email: 'john@email.com',
      },
      token: '123',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'john@email.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@Gobarber:token', '123');
    expect(result.current.user.email).toEqual('john@email.com');
  });
});
