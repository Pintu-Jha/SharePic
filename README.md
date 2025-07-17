# SharePic

## Migration to REST API and RTK Query

This project has been migrated from Firebase to a custom REST API backend at https://sharepicbackend.onrender.com. All data fetching and mutations are now handled using Redux Toolkit Query (RTK Query).

### Key Changes
- **Firebase removed**: All Firebase dependencies and logic have been removed.
- **REST API**: The app now communicates with the backend via REST endpoints for user and post management.
- **RTK Query**: All API calls are managed using RTK Query for efficient data fetching, caching, and state management.
- **Redux Store**: The app is now wrapped in a Redux Provider with a central store.

### API Endpoints Used
- User registration, login, profile fetch/update
- Post CRUD (create, read, delete)

### Next Steps
- Refactor all screens and components to use RTK Query hooks for data operations.
- Remove any remaining context logic that is no longer needed.
- Ensure JWT token is handled securely for authenticated requests.

For more details on the backend API, see the backend documentation or contact the backend developer.
