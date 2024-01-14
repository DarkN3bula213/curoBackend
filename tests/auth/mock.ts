import ApiKey from '../../src/core/modules/auth/apiKey/apiKey.model'

export const API_KEY = "abc";

export const mockFindApiKey = jest.fn(async (key: string) => {
  if (key == API_KEY)
    return {
      key: API_KEY,
      permissions: ["GENERAL"],
    } as ApiKey;
  else return null;
});

export const mockApiKey = jest.fn().mockImplementation(() => {
  return {
    findByKey: mockFindApiKey,
  };
});