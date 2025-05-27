# AI Model Access Demo (Python)

This project demonstrates best practices for developing linear regression models with SAP hana-ml (SAP HANA Python Client API for machine learning algorithms). The Linear Regression technique is illustrated during the execution of the Machine Learning workflow. 

## Project Structure
```
Linear Regression
└── python
    ├── Linear_Regression.ipynb    # Python Implementation
    ├── .env.example               # Template for environment variables
    ├── requirements.txt           # Python dependencies
    └── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices/
   cd sap-btp-ai-best-practices/best-practices/linear-regression/python
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
   - Open the `Linear_Regression.ipynb` notebook in your browser.


## Usage Examples

- **Linear Regression (`Linear_Regression.ipynb`):**
  - Linear regression model

Each section in the notebook provides a detailed example of how to set up and interact with the model.

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.