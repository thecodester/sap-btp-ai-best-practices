# Utilities Tariff Mapping Cockpit

This project is a template for building full-stack applications using a modern frontend and a powerful backend, designed for easy deployment to SAP BTP, Cloud Foundry.

- **Frontend:** [UI5 Web Components for React](https://sap.github.io/ui5-webcomponents-react/) (React + Vite)
- **Backend:** Node.js (TypeScript, Express)

## Project Structure

```
utilities-use-case-next-js/
├── api/          # Node/Express backend application (TypeScript)
│   ├── src/
│   │   ├── server.ts
│   │   └── services/
│   ├── package.json
│   └── tsconfig.json
├── ui/           # UI5 Web Components for React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Staticfile        # Staticfile buildpack config (root: dist, pushstate)
│   └── static.json       # MIME types + SPA fallback
└── manifest.yaml # Deployment manifest for Cloud Foundry
```

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 20.x (includes npm)
- [Cloud Foundry CLI](https://github.com/cloudfoundry/cli/releases)

## Local Development Setup

Before running the application locally, you need to configure your environment variables. This project uses `.env` files in the `ui` directory (Vite) and optional `.env` in the `api` directory.

### 1. Create Your `.env` Files

Copy example files if available, or create new ones:

```bash
# For the backend API (local dev)
cp api/.env.example api/.env

# For the frontend UI (local dev)
cp ui/.env.example ui/.env

# For production builds (used at build time)
cp ui/.env.production.example ui/.env.production
```

## Local Development

To run the application on your local machine, run the backend and frontend servers separately.

### 1. Run the Backend (API)

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Start the API in watch mode (default port 3001)
npm run watch
```

### 2. Run the Frontend (UI)

Open a new terminal window for the frontend.

```bash
# Navigate to the UI directory
cd ui

# Install dependencies
npm install

# Run the Vite development server (loads variables from ui/.env)
npm run dev
```

## Configuration for Deployment

Before deploying, you need to update the `manifest.yaml` file with the unique names for your application. The template uses `template-ui5-web-components-react-express` as a placeholder.

Perform a "find and replace" in `manifest.yaml` for the following string:

- **Find:** `template-ui5-web-components-react-express`
- **Replace with:** `my-awesome-app` (or your chosen app name)

## Deployment to SAP BTP

This project includes an automated deployment script that builds the UI and simplifies the deployment process.

### Automated Deployment (Recommended)

1.  **Login to Cloud Foundry**

    ```bash
    # Replace <API_ENDPOINT>, <ORG>, <SPACE> with your values
    cf login -a <API_ENDPOINT> -o <ORG> -s <SPACE>

    # Example:
    cf login -a https://api.cf.eu10-004.hana.ondemand.com -o btp-ai-sandbox -s Dev
    ```

2.  **Run the Deployment Script**

    From the root directory of the project, run the `deploy.sh` script:

    ```bash
    # Make the script executable
    chmod +x deploy.sh

    # Run the deployment script (builds UI and pushes both apps)
    ./deploy.sh
    ```

### Manual Deployment

If you prefer to deploy manually:

```bash
# Login once per session
cf login -a https://api.cf.<region>.hana.ondemand.com -o <ORG> -s <SPACE>

# Build UI so Vite picks up ui/.env.production
cd ui && npm ci && npm run build && cd ..

# Push both apps as defined in manifest.yaml
cf push
```

Once the deployment is complete, the URLs for your live application will be displayed in the terminal.
