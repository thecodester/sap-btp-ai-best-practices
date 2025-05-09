## Project Structure
This project demonstrates best practices for performing Retrieval Augmented Generation (RAG) using LLMs available on SAP GenAI Hub and SAP HANA Vector Store. It provides examples of different ways to implement RAG using Python.

```
├── python
│   ├── LangChain_RAG_with_History.ipynb
│   ├── Native_RAG.ipynb
│   ├── README.md
│   └── requirements.txt
└── README.md
```

## Pre-requisites
Source documents are already chunked and stored along with their embedding vectors in a table in HANA Vector Store. Please refer the [project](https://github.com/BhagabatP/sap-btp-ai-best-practices/tree/main/best-practices/vector-rag-embedding) for creating embedding vectors and storing them in SAP HANA Vector Store.

## Clone the repository
``` sh
git clone https://github.com/SAP-samples/sap-btp-ai-best-practices/
cd sap-btp-ai-best-practices/best-practices/vector-rag-query/python
```

## Create a virtual environment
``` sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

## Install dependencies
``` sh
pip install -r requirements.txt
```

## Configure environment variables
* Copy the .env-example file to .env
  ``` sh
    cp .env-example .env
  ```
* Populate the .env file with the required values.

## Run the Jupyter Notebook
``` sh
jupyter notebook
```

Open LangChain_RAG_with_History.ipynb or Native_RAG.ipynb notebook in your browser to explore based on your implementation preference.

## Usage Examples
The notebooks demonstrate various methods to use Embeddings model and SAP HANA Vector Store.

* LangChain Implementations (LangChain_RAG_with_History.ipynb):
  * Create LangChain object for operations on HANA Vector Store
  * Retrieves top 4 semantically matching documents from vector store.
  * Optionally processes history messages for follow up queries.
  * Uses OpenAI embedding as well as completion models from GenAI Hub
  * Demonstrates seemless integration between LangChain and SAP HANA Vector Store for all the operations
* Native Client Integrations (Native_RAG.ipynb):
  * Initialized connection context and cursor all operations on HANA Vector Store
  * Uses SQL queries to retieve top semantically matching recrods based on similarity measures
  * Uses OpenAI embedding as well as completion models from GenAI Hub

Each section in the notebook provides a detailed example of how to set up and perform embeddings related operations.

## Recommended Method
The recommended method depends on the use case:

* If using native features of SAP HANA with SQL and Connection Context: Use the Native_RAG.ipynb.
* If using LangChain functions or modules: Use the LangChain_RAG_with_History.ipynb.


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.