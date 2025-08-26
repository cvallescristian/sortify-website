import { sessionUtils } from '@/utils/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper function to handle API responses and session validation
const handleApiResponse = async (response: Response) => {
  if (response.status === 401) {
    // Session expired, clear session and redirect to login
    sessionUtils.clearSession();
    window.location.href = '/login';
    throw new Error('Session expired');
  }
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
};

export const apiService = {
  // Spotify Authentication
  initiateSpotifyLogin: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/login`);
    return response.json();
  },

  // Playlists
  getPlaylists: async (sessionId: string, searchQuery?: string) => {
    const url = searchQuery 
      ? `${API_BASE_URL}/playlist?search=${encodeURIComponent(searchQuery)}`
      : `${API_BASE_URL}/playlist`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return handleApiResponse(response);
  },

  // Create new playlist with tracks
  createPlaylist: async (
    sessionId: string,
    name: string,
    trackIds: string[] = [],
    description: string = '',
    saveToLibrary: boolean = false,
    overrideExisting: boolean = false
  ) => {
    const response = await fetch(`${API_BASE_URL}/playlist/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        trackIds,
        name,
        description,
        saveToLibrary,
        overrideExisting,
      }),
    });
    return handleApiResponse(response);
  },

  // Check if playlist exists by name
  checkPlaylistExists: async (sessionId: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/playlist/check-exists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    return handleApiResponse(response);
  },

  // Releases
  getLatestReleases: async (sessionId: string, limit?: number) => {
    const url = limit 
      ? `${API_BASE_URL}/releases?limit=${limit}`
      : `${API_BASE_URL}/releases`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return handleApiResponse(response);
  },

  getTrackIdsFromReleases: async (sessionId: string, releaseIds: string[]) => {
    const response = await fetch(`${API_BASE_URL}/releases/track-ids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        releaseIds,
      }),
    });
    return handleApiResponse(response);
  },

  // Merge Playlists
  mergePlaylists: async (
    sessionId: string, 
    playlistIds: string[], 
    name: string, 
    description: string
  ) => {
    const response = await fetch(`${API_BASE_URL}/playlist/merge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionId}`,
      },
      body: JSON.stringify({
        playlistIds,
        name,
        description,
      }),
    });
    return handleApiResponse(response);
  },

  // Session validation
  validateSession: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return handleApiResponse(response);
  },

  // Get playlist details
  getPlaylistDetails: async (sessionId: string, playlistId: string) => {
    const response = await fetch(`${API_BASE_URL}/playlist/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return handleApiResponse(response);
  },

  // Get playlist tracks
  getPlaylistTracks: async (sessionId: string, playlistId: string) => {
    const response = await fetch(`${API_BASE_URL}/playlist/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return handleApiResponse(response);
  },
};
