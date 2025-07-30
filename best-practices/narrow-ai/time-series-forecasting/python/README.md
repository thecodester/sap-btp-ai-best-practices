# Time Series Forecasting Demo (Python)

This project demonstrates best practices for developing time series forecasting models with SAP hana-ml (SAP HANA Python Client API for machine learning algorithms). The Time Series Forecasting technique is illustrated using the Additive Model Forecast algorithm for predicting hotel overnight stays during the execution of the Machine Learning workflow.

## Project Structure

```
Time-series-Forecasting
└── python
    ├── Time_Series_Forecasting.ipynb    # Python Implementation
    ├── OVERNIGHTSTAYS.csv               # Hotel sector dataset
    ├── requirements.txt                 # Python dependencies
    └── README.md                        # Project documentation
```

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SAP-samples/sap-btp-ai-best-practices/
   cd sap-btp-ai-best-practices/best-practices/narrow-ai/Time-series-Forecasting/python
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

   - Create a `.env` file in the project directory with the following variables:
     ```
     hana_address=<your_hana_address>
     hana_port=<your_hana_port>
     hana_user=<your_hana_user>
     hana_password=<your_hana_password>
     hana_encrypt=True
     HANA_SCHEMA=<your_schema>
     ```
   - Populate the `.env` file with the required values for your SAP HANA Cloud instance.

5. **Run the Jupyter Notebook:**

   ```bash
   jupyter notebook
   ```

   - Open the `Time_Series_Forecasting.ipynb` notebook in your browser.

## Usage Examples

- **Time Series Forecasting (`Time_Series_Forecasting.ipynb`):**
  - Connects to SAP HANA Cloud using hana-ml
  - Loads and explores hotel overnight stays data from the Swiss Hotel Sector Dataset
  - Trains an Additive Model Forecast for time series forecasting
  - Generates forecasts for future months with confidence intervals
  - Visualizes historical data and predictions

Each section in the notebook provides a detailed example of how to set up and interact with the time series forecasting model using SAP HANA's Predictive Analysis Library (PAL) functions.

## Dataset

The demo uses the Hotel Sector Dataset for Overnight Stays, which is freely available from the [Swiss Federal Statistical Office](https://www.pxweb.bfs.admin.ch/pxweb/en/px-x-1003020000_103/). The dataset contains monthly overnight stay statistics aggregated by region and country of residence.

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.