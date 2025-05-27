# SAP BTP AI Best Practices

This repository provides a curated collection of best practices for implementing AI solutions on the SAP Business Technology Platform (BTP). It covers both **Narrow AI** (classical machine learning) and **Generative AI** use cases, with practical examples, code, and guidance for enterprise scenarios.

## Structure

- **narrow-ai/**: Predictive/classical machine learning best practices (e.g., regression, anomaly detection)
- **generative-ai/**: Generative AI and LLM best practices (e.g., prompt engineering, RAG, content filtering)

Each subdirectory contains:

- Topic-specific documentation and guidance
- Example code in multiple programming languages
- Step-by-step setup and usage instructions

---

## Available Best Practices

### Narrow AI

| Topic                                             | Description                                                                                                    | Status    |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------- |
| [Linear Regression](narrow-ai/linear-regression/) | Predict housing prices using SAP HANA and hana-ml, including data exploration, model training, and evaluation. | Available |
| [Anomaly Detection](narrow-ai/anomaly-detection/) | Detect anomalies and outliers in tabular and time series data using SAP HANA and multiple ML algorithms.       | Available |

### Generative AI

| Topic                                                                           | Description                                                                                | Status    |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------- |
| [Access to Generative AI Models](generative-ai/access-to-generative-ai-models/) | Securely connect to generative AI models, handle authentication, and manage API calls.     | Available |
| [Content Filtering](generative-ai/content-filtering/)                           | Implement content filtering for AI-generated outputs.                                      | Available |
| [Data Masking](generative-ai/data-masking/)                                     | Protect sensitive data (PII, anonymization) when using AI services.                        | Available |
| [Prompt Templating](generative-ai/prompt-templating/)                           | Create and optimize prompt templates for generative AI models.                             | Available |
| [Vector RAG - Embedding](generative-ai/vector-rag-embedding/)                   | Create and manage vector embeddings for Retrieval-Augmented Generation (RAG) applications. | Available |
| [Vector RAG - Query](generative-ai/vector-rag-query/)                           | Implement vector-based querying in RAG systems.                                            | Available |
| [Prompt Registry](generative-ai/prompt-registry/)                               | Manage and reuse prompt templates for generative AI workflows.                             | Available |

---

## Getting Started

1. Navigate to the relevant subdirectory for your use case.
2. Read the topic-specific README for an overview and setup instructions.
3. Explore the code examples in your preferred programming language.
4. Follow the setup steps to run the examples in your own SAP BTP environment.
