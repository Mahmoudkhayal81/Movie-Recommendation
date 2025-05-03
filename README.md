# MOIVEO - Movie Website

A streaming platform for movies and TV shows with a dark-themed, responsive UI.

## Installation Steps

1. Clone the repo:  
   `git clone https://github.com/your-username/movie-website.git`  
2. Navigate to folder:  
   `cd movie-website`  
3. Install dependencies:  
   `npm install`  
4. Create `.env` file:  
   Add:  PORT=3000
         API_KEY=your_api_key
   
## System Requirements (Hardware/Software Dependencies)

- **Software**:
- Node.js: 14.x+  
- npm: 6.x+  
- Git: 2.25+  
- Browser: Chrome, Firefox, Safari  
- **Dependencies**:  
- React.js, Axios/Fetch, CSS framework (e.g., TailwindCss), TMDB API

## Configuration Instructions

1. Add API key to `.env` (e.g., TMDB API).  
2. Update content in `src/data/movies.json` or API calls.  
3. Edit `src/styles/App.css` for styling.  
4. Change `PORT` in `.env` if needed.

## Execution Guide (Running Locally or Deployed)

- **Locally**:  
1. Run: `npm run dev`  
2. Open: `http://localhost:3000`  
3. Build: `npm run build`  
- **Deployed**:  
- URL: [https://movie-recommendation-nu-five.vercel.app/](https://movie-recommendation-nu-five.vercel.app/)
- Matches local version with all features.

## API Documentation

- **API**: TMDB (assumed)  
- **Endpoint**: `https://api.themoviedb.org/3/movie/popular?api_key={your_api_key}`  
- **Parameters**: `api_key`, `language` (optional)  
- **Response**: JSON (title, date, rating, poster)  
- **Usage**: Fetches data for sections like "Trending."

## Executable Files & Deployment Link

- **Executable**: None (web app). Use `build` folder from `npm run build`.  
- **Deployment**:  
1. Install: `npm install -g vercel`  
2. Run: `vercel`  
- Link: [https://movie-recommendation-nu-five.vercel.app/](https://movie-recommendation-nu-five.vercel.app/)

## Additional Notes

- Features: Dark UI, responsive, sections for "Trending," "Now Playing," "Top Rated," "Popular TV Show," "On The Air."  
- Created by: DEPI TEAM  
