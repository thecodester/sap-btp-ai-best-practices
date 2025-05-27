import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns # Import seaborn

# --- Parameters ---
n_samples_normal = 1000      # Number of normal data points
n_samples_anomalies = 50     # Number of anomalous data points
n_features = 5               # Number of features
contamination = n_samples_anomalies / (n_samples_normal + n_samples_anomalies)
random_seed = 42             # For reproducibility
anomaly_distance_factor = 5  # Controls max distance (in std devs) from 3-sigma boundary

print(f"Generating dataset with {n_samples_normal + n_samples_anomalies} total samples.")
print(f"Number of features: {n_features}")
print(f"Anomaly Distance Factor: {anomaly_distance_factor}")
print(f"Target contamination: {contamination:.2%}")

np.random.seed(random_seed)

# --- Generate Normal Data ---
# Define means and a covariance matrix for the normal data
# Using different means and variances for each feature
means_normal = np.random.rand(n_features) * 50 # Means between 0 and 50
# Make sure covariance is positive semi-definite (diagonal ensures this)
# Use varying scales for standard deviations
stds_normal = np.random.rand(n_features) * 10 + 1 # Stds between 1 and 11
cov_normal = np.diag(stds_normal**2)

normal_data = np.random.multivariate_normal(
    mean=means_normal,
    cov=cov_normal,
    size=n_samples_normal
)
print(f"\nNormal data generated with means approx: {[f'{m:.2f}' for m in means_normal]}")
print(f"Normal data generated with stds approx: {[f'{s:.2f}' for s in stds_normal]}")

# --- Generate Anomalous Data ---
# Method 1: Points far from the normal cluster (using uniform distribution)
# Define ranges clearly outside the typical normal data range (mean +/- 3*std)
anomalies = np.zeros((n_samples_anomalies, n_features))

for i in range(n_features):
    mean_norm = means_normal[i]
    std_norm = stds_normal[i]
    lower_bound_norm = mean_norm - 3 * std_norm
    upper_bound_norm = mean_norm + 3 * std_norm

    # Generate anomalies either significantly lower or higher
    # Use anomaly_distance_factor to control the outer boundary
    low_range = (lower_bound_norm - anomaly_distance_factor * std_norm, lower_bound_norm - 1 * std_norm)
    high_range = (upper_bound_norm + 1 * std_norm, upper_bound_norm + anomaly_distance_factor * std_norm)

    # Decide randomly whether to generate low or high anomalies for this feature
    anomalies_low = np.random.uniform(low=low_range[0], high=low_range[1], size=n_samples_anomalies // 2)
    anomalies_high = np.random.uniform(low=high_range[0], high=high_range[1], size=n_samples_anomalies - (n_samples_anomalies // 2))

    feature_anomalies = np.concatenate([anomalies_low, anomalies_high])
    np.random.shuffle(feature_anomalies) # Shuffle within the feature column
    anomalies[:, i] = feature_anomalies

print(f"\nAnomalies generated using ranges far from the normal data cluster.")


# --- Combine and Shuffle Data ---
# Create labels (1 for anomaly, 0 for normal) - useful for evaluation later
# Note: Most anomaly detection algorithms are unsupervised and don't use these labels for training
labels_normal = np.zeros(n_samples_normal, dtype=int)
labels_anomalies = np.ones(n_samples_anomalies, dtype=int)

all_data = np.vstack((normal_data, anomalies))
all_labels = np.concatenate((labels_normal, labels_anomalies))

# Shuffle the data and labels together
shuffle_indices = np.random.permutation(len(all_data))
all_data = all_data[shuffle_indices]
all_labels = all_labels[shuffle_indices] # Keep track if needed for evaluation

# --- Create DataFrame and Save ---
feature_names = [f'feature_{i+1}' for i in range(n_features)]
df = pd.DataFrame(all_data, columns=feature_names)

# Add the ground truth labels as a column if you want it in the CSV
df['is_anomaly'] = all_labels

# Define filename
csv_filename = 'synthetic_anomaly_data.csv'

# Save to CSV
df.to_csv(csv_filename, index=False)

print(f"\nDataset saved to '{csv_filename}'")
print(f"\nFirst 5 rows of the generated data:\n{df.head().to_string()}")
print(f"\nBasic stats of the generated data:\n{df.describe().to_string()}")


# --- Optional: Plotting ---
try:
    print("\nGenerating pair plot...")
    # Use seaborn's pairplot, coloring points by the 'is_anomaly' column
    # Use only feature columns for the plot
    feature_cols = [col for col in df.columns if col != 'is_anomaly']
    pair_plot = sns.pairplot(df, vars=feature_cols, hue='is_anomaly', diag_kind='kde',
                             palette={0: 'blue', 1: 'red'}, # Explicit colors
                             plot_kws={'alpha': 0.6, 's': 20}, # Adjust point size/alpha
                             diag_kws={'alpha': 0.6})
    pair_plot.fig.suptitle('Pair Plot of Features (Colored by Anomaly Status)', y=1.02) # Add title

    plot_filename = 'synthetic_anomaly_pairplot.png'
    plt.savefig(plot_filename)
    print(f"Pair plot saved to '{plot_filename}'")
    # plt.show() # Commented out for non-interactive execution
    plt.close(pair_plot.fig) # Close the figure to free memory

except ImportError:
    print("\nCould not generate plot. Error: Matplotlib or Seaborn not found.")
    print("Please ensure they are installed (`pip install matplotlib seaborn`)")
except Exception as e:
    print(f"\nCould not generate plot. An unexpected error occurred: {e}")
