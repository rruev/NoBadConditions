### Client architecture

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
