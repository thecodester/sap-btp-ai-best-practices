# Sample CAP Application with SAP Cloud SDK for AI

This project demonstrates best practices for accessing generative AI models through a CAP (Cloud Application Programming model) application using the SAP Cloud SDK for AI. It provides examples of how to interact with language models to obtain responses based on user prompts within a CAP service context.

## Prerequisites

- SAP Business Technology Platform account
- Access to SAP AI Core service
- Node.js LTS version
- Cloud Foundry CLI

## Configuration

The application requires proper configuration to connect to the SAP AI Core service. This is handled through CDS bindings in both local and remote deployments.

## Project Structure

```
fullstack-sample/
├── app/                     # UI5 frontend applications
│   └── ask-capital/         # TypeScript UI5 application for querying capitals
│       ├── webapp/          # UI5 application source code
│       ├── package.json     # Frontend dependencies
│       ├── ui5.yaml         # UI5 tooling configuration
│       └── README.md        # Frontend documentation
├── srv/                     # Service layer containing CAP services
│   ├── orchestration.cds    # CDS service definitions for AI orchestration
│   └── orchestration.js     # Service implementation with AI SDK integration
├── package.json             # Project dependencies and scripts
├── manifest.yml             # CF deployment configuration
└── README.md                # Project documentation
```

## Local Deployment

1. Install dependencies using `npm install`.

2. Install dependencies for the UI5 application:

   ```bash
   cd app/ask-capital
   npm install

   ```

3. Login using `cf login -a API_ENDPOINT -o ORG -s SPACE`.

4. Bind the application to your AI Core instance:

   ```bash
   cds bind -2 AI_CORE_INSTANCE_NAME:AI_CORE_INSTANCE_SERVICE_KEY_NAME
   ```

5. Start the backend with AI Core binding:

   ```bash
   npm watch
   ```

6. In a separate terminal, navigate to the UI5 application and start it:

   ```bash
   npm run start:ui5
   ```

   The UI5 application will automatically connect to the running CAP backend.

## Remote Deployment

> [!WARNING]  
> All CDS services are marked with `@requires: 'any'` and are publicly accessible in order to simplify the deployment process.
> Apply proper authentication mechanisms to avoid unauthorized access.

1. Install dependencies using `npm install`.
2. Transpile the CAP application using `npm build`.
3. Run `deploy:postbuild` to add a `package-lock.json`
4. Build the UI5 application:
   ```bash
   cd app/ask-capital
   npm run build:opt
   ```
5. Copy the built UI5 app to the deployment folder:
   ```bash
   mkdir -p ../../resources/ask-capital
   cp -r dist/* ../../resources/ask-capital/
   ```
6. Modify `services` and `routes` values in `manifest.yml`
7. Login using `cf login -a API_ENDPOINT -o ORG -s SPACE`
8. Deploy the application using `cf push`

## Usage

For local deployment, the backend services are available at `http://localhost:4004` and the UI5 application at `http://localhost:8080`.

For remote deployment, access the application at the `route` value defined in `manifest.yml`.

### Backend Services (OData v4)

#### Ask Capital of Country

```bash
curl --request POST \
  --url $SAMPLE_CAP_HOST/odata/v4/orchestration/askCapitalOfCountry \
  --header 'Content-Type: application/json' \
  --data '{
    "country": "France"
  }'
```

#### Chat Completions with Templating

```bash
curl --request POST \
  --url $SAMPLE_CAP_HOST/odata/v4/orchestration/chatCompletion \
  --header 'Content-Type: application/json' \
  --data '{
  "template": [
    {
      "role": "user",
      "content": "What is the capital of {{?country}}"
    }
  ],
  "inputParams": [
    {
      "name": "country",
      "value": "France"
    }
  ]
}'
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
