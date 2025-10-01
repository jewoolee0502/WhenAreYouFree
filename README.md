# WhenAreYouFree

WhenAreYouFree is a cross-platform scheduling web application that integrates with Google Calendar, 
Microsoft Outlook, and Apple iCloud. It helps users quickly find common available times to meet, 
streamlining the scheduling process across different calendar providers.

## 🚀 Project Setup

### Requirements:
- [Bun (package manager)](https://bun.sh/)
- [PostgreSQL (database)](https://www.postgresql.org/)
- Express.js (backend)
- Nuxt.js, Vue.js and Tailwind CSS (frontend)

### Installation:

Clone the repository and install dependencies for both frontend and backend:

#### Clone the repository
```
# Clone the repository
git clone <repository-url>
```

#### Frontend
```bash
cd ../frontend
bun install
bun run dev
```

#### Backend

```bash
cd ../backend
bun install
bun run dev
```


## 🛠 Initial Project Setup

### Package Manager

This project uses Bun as the package manager.

Install Bun via:
```bash
curl -fsSL https://bun.sh/install | bash
```

See the [Nuxt documentation](https://nuxt.com/docs/4.x/getting-started/introduction) for more details on frontend setup.

### Backend (Express + Prisma ORM)

To scaffold the backend with Prisma ORM and Express using Bun:
```bash
npx try-prisma@latest --template orm/express --install bun --name backend
```

### Frontend (Nuxt 3)
To create the frontend with Nuxt 3:
```bash
npm create nuxt@latest
```

### Database
The project uses PostgreSQL as the main database.
Make sure PostgreSQL is installed and running locally or through a cloud provider.


## 📦 Production Build

To build and preview the application for production:
```bash
bun run build
```

Preview the production build locally:
```bash
bun run preview
```

For deployment guidance, see the [Nuxt deployment documentation](https://nuxt.com/docs/4.x/getting-started/deployment).


## 📖 Documentation

- [Nuxt 3 Docs](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Bun Docs](https://bun.sh/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)