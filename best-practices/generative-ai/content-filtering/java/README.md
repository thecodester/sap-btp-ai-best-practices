# AI Model Access Demo

This project demonstrates best practices for accessing generative AI models using the SAP AI SDK. It provides a simple example of how to interact with a language model while making sure the input and output are sterile of NSFW content.

## Project Structure

```
access-to-generative-ai-models/java
├── sample
│   ├── src
|   |   └── main
|   |       └── java
|   |           └── com
|   |               └── sap
|   |                   └── ai
|   |                       └── core
|   |                           └── sample
|   |                               └── App.java  # Main application
│   └── target
|       ├── classes
|       |   └── com
|       |       └── sap
|       |           └── ai
|       |               └── core
|       |                   └── sample
|       |                       └── App.class
|       └── com
|               └── sap
|                   └── ai
|                       └── core
|                           └── sample
|                               └── App.class
├── .env                        # Template for environment variables
├── .gitignore                  # Specifies files to ignore in Git
├── pom.xml                     # mvn dependancies and project configuration
└── README.md                   # Project documentation

```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices.git
   cd sap-btp-ai-best-practices/best-practices/generative-ai/content-filtering/java
   ```

2. **Configure environment variables:**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Populate the `.env` file with the required values.

3. **Install dependencies and run:**
   ```
   mvn clean install
   ```

## Usage Example

The application will run the main function, which sends a prompt to the AI model and logs the response. The default prompt is aimed at showcaseing the content filtering functionality in code.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
