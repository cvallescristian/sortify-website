export interface SpotifyUser {
  id: string;
  display_name: string;
  email?: string;
  images?: Array<{
    url: string;
    height?: number;
    width?: number;
  }>;
  country?: string;
  product?: string;
  type: string;
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  followers?: {
    href: string | null;
    total: number;
  };
  birthdate?: string;
}

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description?: string;
  images?: Array<{
    url: string;
    height?: number;
    width?: number;
  }>;
  owner: {
    id: string;
    display_name: string;
    external_urls: { spotify: string };
  };
  public: boolean;
  collaborative: boolean;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
  href: string;
  external_urls: { spotify: string };
  snapshot_id: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
    external_urls: { spotify: string };
  }>;
  album: {
    id: string;
    name: string;
    images?: Array<{ url: string; height?: number; width?: number }>;
    external_urls: { spotify: string };
  };
  duration_ms: number;
  external_urls: { spotify: string };
  uri: string;
  type: string;
}

export interface PlaylistsResponse {
  success: boolean;
  playlists: SpotifyPlaylist[];
  count: number;
  error?: string;
}

export interface SessionData {
  sessionId: string;
  user: SpotifyUser;
}
