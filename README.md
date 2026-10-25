# NoBadConditions 
## https://no-bad-conditions.vercel.app/

### Wheather app for assessing rock climbing conditions

What is a Crag? - An area with climbing routes where climbers go to climb.

Check the climbing conditions for any climbing crag in the world or create an account to add and manage your own custom crags, track the ones you actively climb at, and compare their climbing conditions side by side. You receive not just localized weather data but also a climbing score calculated for every hour from different conditions factors such as temperature, humidity, wind, precipitation and cloud cover.

# User Access & Permissions

### Guest (Not Authenticated)

* Access to the Home page `/` and Result page `/result/:page`.
* Access to the Login `/login` and Register `/register` pages.
* Users can choose a point on the map, paste a location, or search existing public crags to see its conditions on the Result page.

### Authenticated User

* Access to the Home page `/`, Result page `/result/:page`, MyCrags page `/my-crags` and ActiveCrags page `/active-crags.
* Access to the Add crag page `my-crags/add` and Detalils/Edit page `/my-crags/:cragId`.
* Users can create custom crags as well as edit and delete the ones the have created.
* From their crags users, can add or remove crags from their active crags list (The places that they actively climb)

# Authentication & Session Handling

### Authentication Flow

* Authentication is done with JWT token saved in a cookie
* On the initial load the app calls the server's `/me` endpoint with credentials.
* If the request has a `auth-token` cookie and the token is valid, the user is authenticated. Otherwise they can still use the app as guest.
* On a successful login or registration a new token is issued by the server and stored in a `HttpOnly` cookie
* On logout the server clears the `auth-token` cookie.

### Session Persistence

* If the user is authenticated, the server returns their information, which the client stores in React Context state.
* On page refresh, the `/me` endpoint is called again, and if the token is still valid, the user state is restored.

# Routing Structure

### Route Guards Logic
I implemented the route guards as layout routes with components that render `<Outlet>` if access is allowed and `<Navigate>` otherwise. The routes are defined in ***App.jsx***

### Main Routes

* Home page `/` - both for guest and authenticated users
* Login page `/login` - guest-only
* Register page `/register` - guest-only
* MyCrags Page `/my-crags` - private, layout
* ActiveCrags Page `/active-crags` - private

### Nested & Parameterized Routes

* Nested routes in `my-crags`
    - index route - list of user's crags
    - `/add` - add a crag
    - `/:cragId` - edit or delete a crag
* Parameterized routes
    - `my-crags/:cragId` - see and edit the information for the crag with the corresponding `cragId`
    - `result/:page` - displays the conditions for a crag. `page` holds the page that the user came from, so they can navigate back to it.

# List -> Details Flow

### Catalog / List Page
 
 * **Home page** - After selecting "Choose existing crag" and clicking the search box, the list of public crags appears and can be searched. Public crags are read-only. I have put some crags in the database as an example, but in future versions the data will come from another API. I couldn't find a free one for this course.
 * **MyCrags page** - User's own custom crags are displayed. the crag card displays the crag's name, crag's city and country and crags location. It can be interacted with it in a few ways:
    - When the whole crag card is clicked - navigates to the Result page where the weather and conditions data is displayed for the crag location.
    - **Edit** button - navigates to the Details/Edit page
    -  **Activate** button - adds or removes the crag from the active crags list
    - **Remove** button - deletes the crag

    In future version, users will be able to add public crags to their "my crags" list. This is not implemented yet.

* **ActiveCrags page** - User's active crags list is displayed with hourly condition scores, Best hour for climbing(with the highes score) and the 12 hour average score.
    - users can hover (or click on mobile) over a bar to see the condition score for this hour
    - **View weather** button - navigates to the Result page where the weather and conditions data is displayed for the crag location.
    - **Remove from the list** button - removes the crag from the active crags list.
    - The left and right arrow buttons above the crag cards switch between forecast days. The cards update to show conditions for the selected day.

### Details Page

* When **Edit** button is clicked navigation is triggered via the `useNavigate` hook.
* The route parameter contains the ID of the clicked crag - `/my-crags/:cragId`.

# Data Source & Backed

### Backend type 
 
 * custom **Node.js** with **Express** server
 * **PostgreSQL** with **Prisma ORM** database
 * **Open-Meteo** weather data provider API

 Backend URL - https://no-bad-conditions-api.vercel.app

 # Data Operations

 ### My Crags (CRUD)

To see and manages their crags the user must be logged in. The client sends requests to the API with credentials so the server can authenticate them.

- **Create (POST):** On the My Crags page, the user selects **Add custom crag** wich is a `<Link>` to `/my-crags/add`, enters the crag’s information, and submits the form. The client sends a `POST` request to `/api/v1/crags`. If the record is successfully created the app navigates again to My Crags, where the crags are fetched and displayed on mount with `useEffect`.

- **Read (GET):** The My Crags page fetches with `GET` request the crags from `/api/v1/crags` and displays them as cards. When the user clicks the **Edit** button they are navigated to `/my-crags/:cragId`, where the app fetches that crag from `/api/v1/crags/:cragId` on mount and fills in the form.

- **Update (PUT):** The user clicks **Edit**, changes the form fields, and submits. The client sends a `PUT` request to `/api/v1/crags/:cragId`. After submission, the app returns to My Crags and the state with the crags list is updated. The crags list is fetched again when the component is mounted and the loading state is triggered (potential bad ux to be fixed later).

- **Delete (DELETE):** The user selects **Remove**, confirms the action, and the client sends a `DELETE` request to `/api/v1/crags/:cragId`. The crag is removed from the the crags list state.

# Forms & Validation

### Forms Used
 
 * Login form
 * Register form
 * Add/edit form

 ### Validation rules

 * **email** field - used `zod` built in validation for emails.
 * **password** field - should be at least 6 characters long
 * **latitude** and **longitude** fields - latitude should be a number wich is minimum `-90` and maximum `90` and longitude should be a number wich is minimum `-180` and maximum `180`.

 # React-Specific Techniques

 ### Hooks & Component Lifecycle

 * React Hooks
    - `useState` and `useEffect` in the components and in the custom hooks.
    - `useContext` in `useUser` to access `UserContext`.
    - `useCallback` and `useMemo` in the context providers.
    - `useRef` in `usePublicCrags` for the abort controller.

* Library hooks
    - `useNavigate` and `useParams` from React Router.
    - `useMapEvents` from React Leaflet for map interactions.
    - `useFormStatus` from React DOM for managing form pending state.

* Custom hooks
    - `useUser` - reads `UserContext`.
    - `useConditions` - reads `ConditionsContext`.
    - `useCrag`, `useActiveCrag`, `usePublicCrag` - for crud operations and managing related state
    - `useValidate` - for reusable form validation state managment

* ***MyCrags.jsx*** lifecycle
    - On mount the crags list is fetched in the `useEffect` in the `useCrag` hook.
    - when a crag is removed the state is updated and the components rerenders
    - When the user leaves the page, the component unmounts and the cleanup function in `useEffect` runs. It calls `abort()` on the `AbortController`, which cancels any request that is still pending.

### Context API

* `UserContex` - keeps the user data and the relevant state (loading, error). It is consumed by:
    - ***Header.jsx*** - `user`, `logout`, `userLoading`
    - ***LogIn.jsx*** - `login`, `error`, `clearError`
    - ***Register.jsx*** - `register`, `error`, `clearError`
    - ***Home.jsx*** - `userLoading`
    - ***IsAuthenticated.jsx***, ***IsGest.jsx***, ***ResultPageGuard.jsx*** - `user`, `userLoading`

* `ConditionsContext` - keeps the conditions data and the relevant state. It is consumed by:
    - ***SearchCrag.jsx***, ***Crag.jsx***, ***ActiveCrag.jsx*** - `fetchAndSetConditions`
    - ***Result.jsx*** - `conditions`, `loading`, `error`
    - ***ResultPageGuard.jsx*** - `conditions`, `loading`

### Component Styling

Component are styled using CSS Modules. The CSS is AI Generated

# Typical User Flow

* Guest user
    1. The user clicks on the map or paste a real location in the field or clicks on "Choose existing crag" and searches for a crag from the searchbox.
    2. The user clicks on "Show climbing conditions" and is navigated to the **Result** page.
    3. On the **Result** page, the user can browse hourly scores for each of the next 7 days. Selecting an hour shows its weather and score. A breakdown of the score factors is planned but not yet implemented.
    4. The user can register or login.

* Logged in user
    1. After register or log in the user is navigated to the **ActiveCrags** page.
    2. This page displays the crags the user has added to their active list, which are the places they actively climb at. The user can compare the crags' conditions and score side by side for each of the next seven days and decide where and when to go climbing.
    3. The user can see the weather for one of the crags or to remove it from the list.
    4. If the user wants to add another crag to the list or the don't have one yet They can click "Add to active crags" or go to "MyCrags" page.
    5. On this page the user can see the crags that he has added, add another crag, edit existing crag, delete a crag or add or remove crag from their active crags list.
    6. The user can click on a crag to see the weather for it.

# Error & Edge Case Handling

### Authentication errors
- **Not logged in:** the API's `isAuthenticated` middleware returns `401` for protected routes. On the client, the `IsAuthenticated` guard redirects guests who open `/mycrags` or `/activecrags` to `/login`.
- **Invalid or expired token:** the API clears the `auth-token` cookie and responds with `Invalid token.`
- **Logged-in users on guest pages:** the `IsGuest` guard redirects logged-in users away from `/login` and `/register` to `/activecrags`.
- **Failed login or registration:** the server's error messages are  and shown in the form, and are cleared when the user edits the form or leaves the page.

### Network or data errors
- **Validation:** forms are validated on the client with Zod schemas (on blur, with the submit button disabled while errors exist) and again on the server. Server validation errors are shown under the matching field, with a general message as a fallback.
- **Failed requests:** the hooks catch request errors and store them in an `error` state. The pages (My Crags, Active Crags, Result) display it with the `ErrorMessage` component instead of crashing.
- **Loading states:** skeletons show while data loads (Home, My Crags, Active Crags, Result), and submit buttons show a spinner and disable while submitting, to prevent duplicate requests.
- **Cancelled requests:** the public crags search aborts outdated requests with an `AbortController`

### Empty or missing data
- **No crags:** My Crags shows "You don't have any crags yet. Add your first crag from the button above."
- **No active crags:** Active Crags shows "You don't have any active crags yet" with a link to My Crags.
- **No conditions:** if someone opens `/result/:page` directly or refreshes the page with no loaded conditions, `ResultPageGuard` redirects to `/activecrags` for logged-in users and to `/` for guests.
- **Unknown routes:** a custom 404 page with links back to home and My Crags.

# Brief documentation

## Tech Stack

**Client:** React 19, Vite, React Router, CSS Modules, Zod, Leaflet / React Leaflet

**API:** Node.js, Express 5, Prisma, PostgreSQL, JWT (stored in an HttpOnly cookie), bcrypt, Zod, Open-Meteo weather data

## Getting Started

### Prerequisites
- Node.js
- A PostgreSQL database

### 1. API
```bash
cd api
npm install          # also runs `prisma generate`
npx prisma migrate deploy
npm run dev          
```

Create `api/.env`:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `OPEN_METEO_URL` | https://api.open-meteo.com/v1/forecast |
| `CLIENT_URL` | Client origin allowed by CORS (default `http://localhost:5173`) |
| `PORT` | Optional, defaults to `3000` |

### 2. Client
```bash
cd client
npm install
npm run dev          
```

Create `client/.env`:

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | API base URL (default `http://localhost:3000/api/v1`) |

### Other client scripts
- `npm run build` builds for production
- `npm run preview` previews the production build

## Client architecture

```text
client/
│
├── src/
│   │
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   │
│   ├── components/
│   │   │
│   │   ├── authentication/
│   │   │   ├── LogIn/
│   │   │   │   ├── LogIn.jsx
│   │   │   │   └── LogIn.module.css
│   │   │   └── Register/
│   │   │       ├── Register.jsx
│   │   │       └── Register.module.css
│   │   │
│   │   ├── homePage/
│   │   │   ├── Home/            (Home.jsx, HomeSkeleton.jsx, Home.module.css)
│   │   │   ├── Hero/            (Hero.jsx, Hero.module.css)
│   │   │   ├── SearchCrag/      (SearchCrag.jsx, SearchCrag.module.css)
│   │   │   ├── SearchField/     (SearchField.jsx, SearchField.module.css)
│   │   │   ├── LocationFields/  (LocationFields.jsx, LocationFields.module.css)
│   │   │   ├── Map/             (Map.jsx, LocationMarker.jsx, Map.module.css)
│   │   │   └── FeaturesInfo/    (FeaturesInfo.jsx, FeaturesInfo.module.css)
│   │   │
│   │   ├── myCragsPage/
│   │   │   ├── PageOutlet.jsx
│   │   │   ├── MyCrags/         (MyCrags.jsx, MyCragSkeleton.jsx, MyCrags.module.css, MyCragSkeleton.module.css)
│   │   │   ├── Crag/            (Crag.jsx, Crag.module.css)
│   │   │   └── AddEdit/         (AddEdit.jsx, AddEdit.module.css)
│   │   │
│   │   ├── ActiveCragsPage/
│   │   │   ├── ActiveCrags/     (ActiveCrags.jsx, ActiveCragSkeleton.jsx, + .module.css files)
│   │   │   └── ActiveCrag/      (ActiveCrag.jsx, ActiveCrag.module.css)
│   │   │
│   │   ├── resultPage/
│   │   │   ├── Result/          (Result.jsx, Result.module.css)
│   │   │   ├── ResultSkeleton/
│   │   │   ├── ResultHeader/
│   │   │   ├── ResultOverview/
│   │   │   ├── ScoreOverview/
│   │   │   ├── CurrentWeather/
│   │   │   ├── ResultChart/
│   │   │   └── ResultHourDetails/   (each: Component.jsx + Component.module.css)
│   │   │
│   │   ├── layout/
│   │   │   ├── Header/          (Header.jsx, HeaderSkeleton.jsx, Header.module.css)
│   │   │   └── Footer/          (Footer.jsx, Footer.module.css)
│   │   │
│   │   ├── guards/
│   │   │   ├── IsAuthenticated.jsx
│   │   │   ├── IsGuest.jsx
│   │   │   └── ResultPageGuard.jsx
│   │   │
│   │   └── ui/
│   │       ├── ErrorMessage/    (ErrorMessage.jsx, .module.css)
│   │       ├── NotFound/        (NotFound.jsx, .module.css)
│   │       ├── Remove/          (Remove.jsx, .module.css)
│   │       └── SubmitButton/    (SubmitButton.jsx, .module.css)
│   │
│   ├── context/
│   │   ├── UserContext.jsx
│   │   └── ConditionsContext.jsx
│   │
│   ├── hooks/
│   │   ├── useUser.js
│   │   ├── useConditions.js
│   │   ├── useCrag.js
│   │   ├── useActiveCrag.js
│   │   ├── usePublicCrags.js
│   │   └── useValidate.js
│   │
│   ├── services/
│   │   ├── index.js
│   │   ├── user.service.js
│   │   ├── crag.service.js
│   │   ├── activeCrag.service.js
│   │   ├── publicCrag.service.js
│   │   └── conditions.service.js
│   │
│   ├── schemas/
│   │   ├── user.schema.js
│   │   └── crag.schema.js
│   │
│   ├── utils/
│   │   ├── errors.util.js
│   │   ├── location.utils.js
│   │   ├── results.util.js
│   │   └── leafletIcon.util.js
│   │
│   └── styles/
│       └── shared.module.css
│
├── index.html
├── vite.config.js
├── eslint.config.js
├── vercel.json
├── package.json
└── .env
```

Components render the UI, hooks hold state and data logic, and services make the HTTP requests. Components never call `fetch` directly.