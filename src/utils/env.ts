export const getApiUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3000';
};

export const config = {
  apiUrl: getApiUrl(),
};
