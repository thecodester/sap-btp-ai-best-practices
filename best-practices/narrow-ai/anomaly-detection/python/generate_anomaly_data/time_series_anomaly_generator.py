import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# --- Parameters ---
n_years = 3
points_per_day = 1 # Keep it simple with daily data first
n_points = n_years * 365 * points_per_day
start_date = '2021-01-01'
freq = 'D' # Daily frequency

baseline = 50.0
trend_slope = 0.01  # Small positive trend
noise_level = 2.0   # Standard deviation of Gaussian noise

weekly_amplitude = 5.0
yearly_amplitude = 10.0

n_anomalies = 15    # Number of anomalies to inject
anomaly_magnitude_factor = 5 # How many times the noise_level std dev

random_seed = 42    # For reproducibility

print(f"Generating time series data for {n_years} years ({n_points} points).")
print(f"Start date: {start_date}, Frequency: {freq}")
print(f"Baseline: {baseline}, Trend Slope: {trend_slope}") 
print(f"Noise Level (Std Dev): {noise_level}")
print(f"Weekly Amplitude: {weekly_amplitude}, Yearly Amplitude: {yearly_amplitude}")
print(f"Number of Anomalies: {n_anomalies}, Magnitude Factor: {anomaly_magnitude_factor}")

np.random.seed(random_seed)

# --- Generate Time Index ---
timestamps = pd.date_range(start=start_date, periods=n_points, freq=freq)
time_steps = np.arange(n_points)

# --- Generate Components ---
# Trend
trend = baseline + trend_slope * time_steps

# Seasonality
day_of_week = timestamps.dayofweek # Monday=0, Sunday=6
weekly_seasonality = weekly_amplitude * np.sin(2 * np.pi * day_of_week / 7)
 
day_of_year = timestamps.dayofyear # 1 to 366
yearly_seasonality = yearly_amplitude * np.sin(2 * np.pi * day_of_year / 365.25)

# Noise
noise = np.random.normal(loc=0, scale=noise_level, size=n_points)

# --- Combine Components for Normal Signal ---
normal_signal = trend + weekly_seasonality + yearly_seasonality + noise
print(f"\nNormal signal generated.")
print(f"Signal standard deviation (approx): {np.std(normal_signal):.2f}")


# --- Inject Point Anomalies ---
anomaly_indices = np.random.choice(
    time_steps, size=n_anomalies, replace=False # Ensure unique indices
)
anomalies_mask = np.zeros(n_points, dtype=int)
# Convert to NumPy array to allow modification by integer index
anomalous_signal = normal_signal.copy().values

# Calculate anomaly magnitude based on noise level (could also use signal std dev)
anomaly_value_delta = anomaly_magnitude_factor * noise_level

for idx in anomaly_indices:
    # Randomly make anomaly positive or negative
    direction = np.random.choice([-1, 1])
    anomalous_signal[idx] += direction * anomaly_value_delta
    anomalies_mask[idx] = 1 # Mark as anomaly

print(f"\nInjected {n_anomalies} point anomalies.")
print(f"Anomaly magnitude delta (approx): +/- {anomaly_value_delta:.2f}")


# --- Create DataFrame and Save ---
df = pd.DataFrame({
    'timestamp': timestamps,
    'value': anomalous_signal,
    'is_anomaly': anomalies_mask
})

# Define filename
csv_filename = 'synthetic_time_series_anomaly_data.csv'

# Save to CSV
df.to_csv(csv_filename, index=False)

print(f"\nDataset saved to '{csv_filename}'")
print(f"\nFirst 5 rows of the generated data:\n{df.head().to_string()}")
print(f"\nLast 5 rows of the generated data:\n{df.tail().to_string()}")
print(f"\nNumber of anomalies marked: {df['is_anomaly'].sum()}")

# --- Optional: Plotting ---
try:
    plt.figure(figsize=(15, 6))
    plt.plot(df['timestamp'], df['value'], label='Time Series Value', zorder=1)
    anomalies_df = df[df['is_anomaly'] == 1]
    plt.scatter(anomalies_df['timestamp'], anomalies_df['value'], color='red', label='Injected Anomalies', s=50, zorder=2)
    plt.title('Generated Time Series with Anomalies')
    plt.xlabel('Timestamp')
    plt.ylabel('Value')
    plt.legend()
    plt.grid(True)
    plot_filename = 'synthetic_time_series_anomaly_plot.png'
    plt.savefig(plot_filename)
    print(f"\nPlot saved to '{plot_filename}'")
    # plt.show() # Commented out to avoid blocking execution in scripts
except Exception as e:
    print(f"\nCould not generate plot. Error: {e}")
    print("Please ensure matplotlib is installed (`pip install matplotlib`)")
