import { config } from '@/utils/env';
import { SpotifyUser, PlaylistsResponse } from '@/types/spotify';

interface AuthResponse {
  success: boolean;
  authUrl?: string;
  state?: string;
  error?: string;
}

interface ProfileResponse {
  success: boolean;
  user?: SpotifyUser;
  error?: string;
}

interface LogoutResponse {
  success: boolean;
  message?: string;
  error?: string;
}

interface PlaylistsApiResponse {
  success: boolean;
  data?: PlaylistsResponse;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  async initiateSpotifyLogin(): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error initiating Spotify login:', error);
      return {
        success: false,
        error: 'Failed to connect to authentication service'
      };
    }
  }

  async getProfile(sessionId: string): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return {
        success: false,
        error: 'Failed to fetch user profile'
      };
    }
  }

  async logout(sessionId: string): Promise<LogoutResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging out:', error);
      return {
        success: false,
        error: 'Failed to logout'
      };
    }
  }

  async getPlaylists(sessionId: string): Promise<PlaylistsApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/playlist`, {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return {
        success: false,
        error: 'Failed to fetch playlists'
      };
    }
  }
}

export const apiService = new ApiService();
