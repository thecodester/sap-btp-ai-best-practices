# CAP Implementations for Generative AI Access

Large Language Models (LLMs) may struggle to answer questions about topics not present in their training data. To overcome this limitation, external information can be provided during inference to enhance the model’s response. This technique is known as Retrieval-Augmented Generation (RAG).

To fetch the relevant context for a given query, a vector store is used to store documents in vectorized form. Using similarity metrics, the store retrieves the most semantically relevant documents, which are then passed as context to the LLM.

This project demonstrates how to retrieve top-matching documents from the SAP HANA Vector Store and use them as context for the LLM during inference.

## Available Samples

- **[backend-sample](./backend-sample)**: Standalone CAP backend service implementation
- **[fullstack-sample](./fullstack-sample)**: Complete CAP application with UI5 frontend

## Overview

These samples showcase how to:

- Connect to generative AI services from CAP applications
- Structure service layers for AI orchestration
- Implement proper error handling
- Deploy applications to SAP BTP

## Getting Started

Each subdirectory contains a comprehensive README.md with detailed setup instructions, deployment guides, and usage examples.
