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
backend-sample/
├── srv/                     # Service layer containing CAP services
│   ├── orchestration.cds    # CDS service definitions for AI orchestration
│   └── orchestration.js     # Service implementation with AI SDK integration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── manifest.yml             # CF deployment configuration
└── README.md                # Project documentation
```

## Local Deployment

1. Install dependencies using `pnpm install`.

2. Login using `cf login -a API_ENDPOINT -o ORG -s SPACE`.

3. Bind the application to your AI Core instance:

   ```bash
   cds bind -2 AI_CORE_INSTANCE_NAME:AI_CORE_INSTANCE_SERVICE_KEY_NAME
   ```

4. Run the application with the binding:

   ```bash
   pnpm watch:hybrid
   ```

## Remote Deployment

> [!WARNING]  
> All CDS services are marked with `@requires: 'any'` and are publicly accessible in order to simplify the deployment process.
> Apply proper authentication mechanisms to avoid unauthorized access.

1. Install dependencies using `pnpm install`.
2. Transpile the CAP application using `pnpm build`.
3. Run `deploy:postbuild` to add a `package-lock.json`
4. Modify `services` and `routes` values in `manifest.yml`.
5. Login using `cf login -a API_ENDPOINT -o ORG -s SPACE`.
6. Deploy the application using `cf push`.

## Usage

For local deployment, set `SAMPLE_CAP_HOST` as `http://localhost:4004`. For remote deployment, set `SAMPLE_CAP_HOST` as the `route` value defined in `manifest.yaml`.

### `orchestration`

#### Ask Capital of Country

```bash
curl --request POST \
  --url $SAMPLE_CAP_HOST/odata/v4/orchestration/askCapitalOfCountry \
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
