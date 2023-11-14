This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Description
This is a Form Builder Web app where a user can build there own form<br/>
using the drag and drop builder I have provided and then the form <br/>
could be published to other people they can further fill <br/>
and submission,analytics,visits,bounce rate etc could be tracked on details page

## Tech Stack
1)Nextjs with typescript<br/>
2)Radixui and tailwind CSS for Designing<br/>
3)Dnd kit for drag and drop in react<br/>
4)Clerk for auth provider<br/>
5)Postgres with prisma for database<br/>

## Getting Started

### Install Dependencies:
```bash 
npm install

```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

    $ create a .env file in server folder with following variables and value (not description)

      | Variable                            | Value                    | Description                        |
      |-------------------------------------|--------------------------|------------------------------------|
      | NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   | from clerk website       | used for auth                      |
      | CLERK_SECRET_KEY                    | from clerk website       |  used for auth                     |
      | POSTGRES_URL                        | postgres url             | database related stuff             |
      | POSTGRES_PRISMA_URL                 | prisma url               | database related stuff             |
      | POSTGRES_URL_NON_POOLING            | from vercel postgres db  | database related stuff             |
      | POSTGRES_USER                       | from vercel postgres db  | database related stuff             |
      | POSTGRES_HOST                       | from vercel postgres db  | database related stuff             |
      | POSTGRES_PASSWORD                   | from vercel postgres db  | database related stuff             |
      | POSTGRES_DATABASE                   | from vercel postgres db  | database related stuff             |


