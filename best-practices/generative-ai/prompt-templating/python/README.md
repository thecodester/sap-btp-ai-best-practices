# SAP BTP AI Best Practice Demo – Anomaly Detection Prompt Templating (Python)

This project demonstrates best practices for building and managing prompt templates for anomaly detection scenarios using SAP Generative AI Hub. It showcases how to use the Orchestration Module and Prompt Registry to streamline prompt development and integration workflows.

## Project Structure

```
python
├── prompt_template.ipynb         # Create and test prompt templates in the Orchestration Module
├── prompt_registry_creation.ipynb # Register and manage prompt templates in the Prompt Registry Service
├── prompt_registry_usage.ipynb    # Use registered prompts via the Orchestration Module
└── README.md                      # Project documentation
└── env_copy                       # Template of .env file
```

## Prerequisites

- Access to SAP Generative AI Hub
- Required entitlements to use the Prompt Registry and Orchestration Module
- Python environment with Jupyter and the necessary SAP SDKs or APIs

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices.git
   cd sap-btp-ai-best-practices/best-practices/generative-ai/prompt-templating/python
   ```

2. **Set up Python environment**:

   It’s recommended to use a virtual environment.

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt  # Requirements file is provided
   ```

3. **Configure environment variables**:

   Copy the `.env.example` file to `.env`:

   ```bash
   cp env_copy .env
   ```

   ```
   AICORE_AUTH_URL=""
   AICORE_CLIENT_ID=""
   AICORE_CLIENT_SECRET=""
   AICORE_BASE_URL=""
   AICORE_RESOURCE_GROUP=""
   ```

## Notebook Overview

- **prompt_template.ipynb**

  Demonstrates how to define prompt templates for anomaly detection tasks, and how to compare different output methods (free-text vs structured JSON outputs).

- **prompt_registry_creation.ipynb**

  Shows how to create new prompt entries in the SAP Prompt Registry Service, edit them, and prepare them for production usage.

- **prompt_registry_usage.ipynb**
  Provides examples of how to retrieve and use registered prompts within the Orchestration Module, enabling modular prompt invocation.

## Usage Example

Run each notebook via Jupyter:

```bash
jupyter notebook
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request to suggest improvements, report bugs, or add more examples.
