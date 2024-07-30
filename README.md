# The Best Cinema

The Best Cinema is a React-based web application that allows users to browse popular movies, search for specific titles, view detailed information about each movie, and submit ratings. This project utilizes the TMDB (The Movie Database) API to fetch movie data.

## Features

- Display popular movies on the home page
- Search functionality to find specific movies
- Detailed view for each movie, including:
  - Title, release date, and rating
  - Movie poster
  - Overview and tagline
  - Genre information
- User rating system (for guest sessions)
- Responsive design using Tailwind CSS

## Technologies Used

- React 18.3
- TypeScript
- Vite
- Tailwind CSS
- TMDB API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A TMDB API key and Read Access Token

## Installation

1. Clone the repository:
```
git clone https://github.com/okkyPratama/the-best-cinema.git
cd the-best-cinema

```
2. Install dependencies:

```
npm install
```
3. Create a `.env` file in the root directory and add your TMDB API credentials:
```
VITE_API_KEY=your_api_key_here
VITE_READ_ACCESS_TOKEN=your_read_access_token_here
```
## Usage
To run the development server:
```
npm run dev
```

## Acknowledgments

- [TMDB API](https://developer.themoviedb.org/docs/getting-started) for providing movie data
- [React](https://reactjs.org/) for the UI library
- [Vite](https://vitejs.dev/) for the build tool and development server
- [Tailwind CSS](https://tailwindcss.com/) for styling

