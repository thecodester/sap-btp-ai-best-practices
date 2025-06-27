# AI Model Access Demo (Python)

This project demonstrates best practices for accessing generative AI models using the SAP AI SDK. It provides a simple example of how to interact with a language model while making sure the input and output are sterile of NSFW content.

## Project Structure

```
content-filtering
└── python
    ├── orchestration_implementation.ipynb  # Orchestration Implementation
    ├── .env.example               # Template for environment variables
    ├── requirements.txt           # Python dependencies
    └── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices/
   cd sap-btp-ai-best-practices/best-practices/generative-ai/content-filtering/python
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

   - Open the `orchestration_implementation.ipynb` notebook in your browser, depending on the implementation you wish to explore.

## Usage Examples

The notebooks demonstrate various methods to call LLMs through SAP GenAI Hub:

- **Orchestration Implementation (`orchestration_implementation.ipynb`):**
  - Unified method to call any model from SAP GenAI Hub

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
