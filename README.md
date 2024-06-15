# Issue Tracker App

This is a professional issue tracking application built using [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/). The app features a comprehensive dashboard that displays issue counts with numbers and graphs, along with the latest issues. Users can perform CRUD operations on issues, which can have one of three states: OPEN, IN_PROGRESS, and DONE. Additionally, issues can be assigned to different users.

## Features

- **Dashboard**: View issue counts with visual graphs and the latest issues.
- **CRUD Operations**: Create, read, update, and delete issues.
- **Issue States**: Manage issues with three states - OPEN, IN_PROGRESS, DONE.
- **User Assignment**: Assign issues to different users.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kaushalkahapola/issue-tracker-NextJs.git
    cd issue-tracker-NextJs
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Create a `.env` file with your own data**:

    In the root of your project, create a file named `.env` and add your database connection string and any other necessary environment variables:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
    ```

4. **Run Prisma migrations**:
    ```bash
    npx prisma migrate dev
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Editing the Project

You can start editing the application by modifying the `app/page.tsx` file. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js and the technologies used in this project, refer to the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Prisma Documentation](https://www.prisma.io/docs) - Learn how to use Prisma with your database.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your application using Tailwind CSS.
- [Radix UI Documentation](https://www.radix-ui.com/docs) - Learn about Radix UI components.
