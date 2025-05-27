# Demo: Retrieval Augmented Generation (RAG) with SAP HANA Vector Store
Large Language Models (LLMs) may struggle to answer questions about topics not present in their training data. To overcome this limitation, external information can be provided during inference to enhance the model’s response. This technique is known as Retrieval-Augmented Generation (RAG).

To fetch the relevant context for a given query, a vector store is used to store documents in vectorized form. Using similarity metrics, the store retrieves the most semantically relevant documents, which are then passed as context to the LLM.

This codebase demonstrates how to retrieve top-matching documents from the SAP HANA Vector Store and use them as context for the LLM during inference.

For this demo, GPT-4o is accessed via SAP Generative AI Hub. Multiple model options are available—see the full list [here](https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/supported-models).

Related article: [RAG using SAP HANA Vector Store](https://sap.sharepoint.com/sites/210313/SitePages/GenAI%20-%20RAG.aspx)


## Language-Specific Examples
This repository includes examples in multiple programming languages to demonstrate these best practices:

* Python: Python implementation for accessing AI models
* Other languages to be added


## Getting Started
Each language-specific folder contains its own README with detailed setup and usage instructions. Choose the implementation that best matches your technology stack to get started.
