# WhenAreYouFree

A cross-platform scheduling web-app that conencts Google Calendar, Outlook, and Apple iCloud. It enables users to find common time to meet with others.


## Set up
- Backend
```sh
npx try-prisma@latest --template orm/express --install bun --name backend
```

- Frontend
```sh
npm create nuxt@latest
# Select bun as the package manager
```

- Database: PostgreSQL