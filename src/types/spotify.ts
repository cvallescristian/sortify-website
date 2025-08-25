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
    display_name: string;
    id: string;
  };
  public: boolean;
  tracks: {
    total: number;
  };
  uri: string;
  href: string;
  external_urls: {
    spotify: string;
  };
}

export interface PlaylistsResponse {
  items: SpotifyPlaylist[];
  total: number;
  limit: number;
  offset: number;
}

export interface SessionData {
  sessionId: string;
  user: SpotifyUser;
}
