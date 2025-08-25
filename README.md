# Sortify Website

A mobile-first Next.js application for sorting Spotify playlists and liked songs.

## Features

- **Mobile-first design** - Optimized for mobile devices with responsive design
- **Spotify integration** - Connect to Spotify to manage your playlists
- **Multiple sorting options** - Different ways to organize your music
- **Clean UI** - Minimal design without heavy CSS frameworks

## Pages

1. **Login Page** (`/`) - Connect to Spotify
2. **Sort Options** (`/sort`) - Choose sorting method and execute

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Spotify API credentials (for full functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sortify-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles (mobile-first)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Login page
│   └── sort/
│       └── page.tsx         # Sort options page
├── components/
│   └── BaseTemplate.tsx     # Reusable layout with header/nav
└── utils/
    └── env.ts               # Environment configuration
```

## Design System

### Colors
- Primary: `#1db954` (Spotify green)
- Background: `#f5f5f5`
- Text: `#333`
- Secondary text: `#666`

### Components
- **Header**: Fixed top navigation with title and back button
- **Bottom Navigation**: Fixed bottom nav (expandable for future features)
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Spotify-style buttons with hover effects

### Mobile-First Approach
- All styles are designed for mobile first
- Responsive breakpoints for tablet/desktop
- Touch-friendly button sizes (min 48px height)
- Fixed header and navigation for easy access

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Pages

1. Create a new page in `src/app/`
2. Use the `BaseTemplate` component for consistent layout
3. Add mobile-first styles to `globals.css`

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (accessible on client-side)
- `API_URL` - Backend API URL (server-side only)

## Future Enhancements

- Spotify OAuth integration
- Real sorting functionality
- User authentication
- Playlist management
- Additional navigation items
- Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on mobile devices
5. Submit a pull request

## License

This project is licensed under the MIT License.
