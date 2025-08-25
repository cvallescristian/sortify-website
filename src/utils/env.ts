export const getApiUrl = (): string => {
  // Only use NEXT_PUBLIC_ prefixed variables for client-side
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
};

export const config = {
  apiUrl: getApiUrl(),
};
