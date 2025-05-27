# AI Model Access Demo

This project demonstrates best practices for accessing generative AI models using the SAP AI SDK. It provides a simple example of how to interact with a language model to obtain responses based on user prompts.

## Project Structure

```
access-to-generative-ai-models
├── src
│   ├── index.ts               # Entry point of the application
│   ├── services
│   │   └── aiOrchestration.ts # Contains the orchestration logic for AI model access
│   └── utils
│       └── logger.ts          # Logger utility for logging messages
├── .env.example                # Template for environment variables
├── .gitignore                  # Specifies files to ignore in Git
├── package.json                # NPM configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices.git
   cd sap-btp-ai-best-practices/best-practices/generative-ai/access-to-generative-ai-models/typescript
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Populate the `.env` file with the required values.

4. **Run the application:**
   ```bash
   npm start
   ```

## Usage Example

The application will invoke the `orchestrationChatCompletion` function, which sends a prompt to the AI model and logs the response. The default prompt is set to ask for the capital of France.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
