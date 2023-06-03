import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Pemrosesan Data
data = {
    'Nama_Produk': ['BUAH', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    'Tanggal_Beli': ['2023-01-05', '2022-01-06', '2022-01-05', '2023-01-06', '2022-01-05', '2020-02-06', '2022-01-05', '2022-01-06', '2022-01-05', '2022-01-06'],
    'Rata_Rata_Kadaluarsa': [7, 14, 8, 15, 9, 16, 10, 17, 11, 60]
}

df = pd.DataFrame(data)

# Konversi kolom "Tanggal_Beli" ke tipe data datetime
df['Tanggal_Beli'] = pd.to_datetime(df['Tanggal_Beli'])

# Eksplorasi Data
print(df.head())
print(df.info())
print(df.describe())

# Feature Engineering (tidak ada contoh yang spesifik dalam keterangan, sehingga tidak ada yang dilakukan di sini)

# Pembagian Data
X = df[['Nama_Produk', 'Tanggal_Beli']]
y = df['Rata_Rata_Kadaluarsa']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Pemodelan dan Pelatihan
# Contoh menggunakan regresi linier
model = LinearRegression()
model.fit(X_train, y_train)

# Evaluasi Model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error (MSE):", mse)

# Prediksi
input_produk = 'K'
input_tanggal_beli = pd.to_datetime('2023-05-31')

input_data = pd.DataFrame({
    'Nama_Produk': [input_produk],
    'Tanggal_Beli': [input_tanggal_beli]
})

predicted_expiry = model.predict(input_data)
print("Prediksi rata-rata kadaluarsa:", predicted_expiry)
