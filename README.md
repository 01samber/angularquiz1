# Users App

A simple Angular application that displays users from an API.

## What it does

- Shows a list of users with pagination
- Search for a user by their ID
- View user details
- Caches data to avoid extra API calls
- Shows loading indicator during requests

## How to run

```bash
npm install
ng serve
```

Open http://localhost:4200

## API

I used the ReqRes API (https://reqres.in) which provides fake user data for testing.

## Structure

```
src/app/
  components/
    header/        - top navigation with search
    user-list/     - main page showing all users
    user-detail/   - page showing one user's info
  services/
    user.service   - handles API calls and caching
    loading.service - manages loading state
```

## Built with

- Angular
- Angular Material
- RxJS
