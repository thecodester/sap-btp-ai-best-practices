# AI Model Access Demo (Python)

This project demonstrates best practices for accessing generative AI models using the SAP GenAI Hub. It provides examples of how to interact with various language models to obtain responses based on user prompts.

## Project Structure
```
access-to-generative-ai-models
└── python
    ├── main.ipynb                 # Jupyter Notebook with example implementations
    ├── .env.example               # Template for environment variables
    ├── requirements.txt           # Python dependencies
    └── README.md                  # Project documentation
```


## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sap-btp-ai-best-practices.git
   cd sap-btp-ai-best-practices/best-practices/access-to-generative-ai-models/python
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Populate the `.env` file with the required values.

5. **Run the Jupyter Notebook:**

   ```bash
   jupyter notebook
   ```
   - Open the `main.ipynb` notebook in your browser.


## Usage Examples

The notebook demonstrates various methods to call LLMs through SAP GenAI Hub:

- **Native Client Integrations:**
  - Amazon and Anthropic Models
  - OpenAI Models
- **LangChain Implementations:**
  - OpenAI Models
  - Amazon and Anthropic Models
  - Google Vertex AI Models
- **Orchestration Implementation:**
  - Unified method to call any model from SAP GenAI Hub

Each section in the notebook provides a detailed example of how to set up and interact with the models.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.