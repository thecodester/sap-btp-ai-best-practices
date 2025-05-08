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

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
