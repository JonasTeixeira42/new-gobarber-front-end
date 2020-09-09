import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../context/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'John',
        email: 'john@email.com',
      },
      token: '123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'john@email.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user)
    );

    expect(result.current.user.email).toEqual('john@email.com');
  });

  it('should receive save data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return '123';

        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'John',
            email: 'john@email.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('john@email.com');
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@Gobarber:token':
          return '123';

        case '@Gobarber:user':
          return JSON.stringify({
            id: 'user123',
            name: 'John',
            email: 'john@email.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalled();
    expect(result.current.user).toBeUndefined();
  });

  it('should be abe to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user123',
      name: 'John',
      email: 'john@email.com',
      avatar_url: 'image-path.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(user)
    );

    expect(result.current.user).toEqual(user);
  });
});
