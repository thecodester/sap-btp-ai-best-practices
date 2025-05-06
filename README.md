# BTP AI Best Practices Project

This project contains the BTP AI Best Practices website and its supporting services.

## Prerequisites

- Node.js (version specified in `app/package.json` and `srv/package.json` respectively, check `engines` field if present)
- npm (usually comes with Node.js)
- Access to a HANA database (for the `srv` component if it requires one)
- Cloud Foundry CLI (if deploying)

## Project Structure

- `app/`: Contains the Docusaurus frontend application.
- `srv/`: Contains the CAP (Cloud Application Programming Model) backend service.

## Development

### Running the Backend Service (`srv`)

1.  Navigate to the `srv` directory:
    ```bash
    cd srv
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the service (usually for local development with in-memory DB or configured HANA):

    ```bash
    npm start
    ```

    This typically runs `cds-serve`. The service will be available at `http://localhost:4004` by default (or as configured).

    For development with automatic restarts on file changes:

    ```bash
    npm run watch
    ```

### Running the Frontend Application (`app`)

1.  Navigate to the `app` directory:
    ```bash
    cd app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    This runs `docusaurus start`. The application will usually be available at `http://localhost:3000`.

## Building and Deployment

### Backend Service (`srv`)

1.  To build the MTA (Multi-Target Application) archive for deployment:
    Navigate to the `srv` directory:

    ```bash
    cd srv
    npm run build
    ```

    This will create an `.mtar` file in the `srv/mta_archives` directory.

2.  To deploy to Cloud Foundry (ensure you are logged in):
    ```bash
    npm run deploy
    ```
    (This script might need configuration or you might deploy the `.mtar` file manually using `cf deploy mta_archives/YOUR_ARCHIVE_NAME.mtar`)

### Frontend Application (`app`)

1.  To build the static site for production:
    Navigate to the `app` directory:

    ```bash
    cd app
    npm run build
    ```

    The build output will be in the `app/build` directory.

2.  To serve the built site locally:

    ```bash
    npm run serve
    ```

3.  Deployment of the Docusaurus app typically involves deploying the static files in the `build` directory to a static site hosting service or a web server. Refer to the Docusaurus deployment documentation for more options.

## Further Information

- See `srv/README.md` for more details specific to the CAP service.
- See `app/README.md` for more details specific to the Docusaurus application.
