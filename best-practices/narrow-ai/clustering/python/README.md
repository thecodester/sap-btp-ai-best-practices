# Clustering Demo (Python)

This project demonstrates best practices for developing clustering models with SAP hana-ml (SAP HANA Python Client API for machine learning algorithms). The clustering technique is illustrated as part of a typical machine learning workflow, including data exploration and visualization.

## Project Structure

```text
Clustering
└── python
    ├── Clustering.ipynb    # Python implementation (notebook)
    ├── Iris.csv            # Sample dataset
    ├── requirements.txt    # Python dependencies
    └── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices/
   cd sap-btp-ai-best-practices/best-practices/narrow-ai/clustering/python
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

4. **(Optional) Configure environment variables:**

   If the notebook expects environment variables (e.g., for SAP HANA connection parameters), create a `.env` file in this directory and populate it with the required values. The project includes `python-dotenv` to load variables from `.env`.

5. **Run the Jupyter Notebook:**

   ```bash
   jupyter notebook
   ```

   - Open the `Clustering.ipynb` notebook in your browser.

## Usage Examples

- **Clustering (`Clustering.ipynb`):**
  - End-to-end example of an unsupervised learning workflow (e.g., K-Means) using SAP hana-ml
  - Data loading and exploration with `pandas`
  - Visualizations with `seaborn`/`matplotlib`

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
