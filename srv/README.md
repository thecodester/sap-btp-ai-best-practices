# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

| File or Folder | Purpose                              |
| -------------- | ------------------------------------ |
| `app/`         | content for UI frontends goes here   |
| `db/`          | your domain models and data go here  |
| `srv/`         | your service models and code go here |
| `package.json` | project metadata and configuration   |
| `readme.md`    | this getting started guide           |

## Working Locally

1. Create a `.env` file in the root directory with the following environment variables:

```bash
GIGYA_API_KEY=<your_api_key>
GIGYA_USER_KEY=<your_user_key>
GIGYA_SECRET_KEY=<your_secret_key>
```

2. Install dependencies and start the development server:

```bash
npm install
npm run watch
```

## Deployment

```bash
cf login -a https://api.cf.eu10-005.hana.ondemand.com/
npm run build
npm run deploy
```

## Deploy Environment Variables

```bash
cf login -a https://api.cf.eu10-005.hana.ondemand.com/

cf set-env btp-ai-best-practices-srv GIGYA_API_KEY <value>
cf set-env btp-ai-best-practices-srv GIGYA_USER_KEY <value>
cf set-env btp-ai-best-practices-srv GIGYA_SECRET_KEY <value>

cf restage btp-ai-best-practices-srv
```

## Change CAP Service URL (DEV, QA or PROD)

Change the field `apiUrl` on the config file `app/src/config/environment.ts` to the QA URL.

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
