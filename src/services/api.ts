import { SpotifyPlaylist, SpotifyRelease } from '@/types/spotify';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
    return response.json();
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
    return response.json();
  },

  getFollowedArtistsReleases: async (sessionId: string, limit?: number) => {
    const url = limit 
      ? `${API_BASE_URL}/releases/followed?limit=${limit}`
      : `${API_BASE_URL}/releases/followed`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${sessionId}`,
      },
    });
    return response.json();
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
    return response.json();
  },
};
