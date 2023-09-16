import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AuthService from '../../services/authService';
import { AuthRoutes } from '../../utils/constants.js';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.reset();
});

describe('AuthService', () => {
  const mockResponse = { data: { success: true } };

  it('getAuthToken', async () => {
    mockAxios.onGet(AuthRoutes.TOKEN).reply(200, mockResponse);
    const response = await AuthService.getAuthToken();

    expect(response.data.success).toBe(true);
  });
});
