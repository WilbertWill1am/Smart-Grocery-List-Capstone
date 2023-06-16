from flask import Flask, render_template, request, make_response, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pandas as pd
from geopy.distance import geodesic
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__)

model = tf.keras.models.load_model('Store_Recommendation.h5')
tokenizer = Tokenizer()

@app.route('/')
def index():
  return "Welcome!"

@app.route('/predict', methods=['POST'])
def predict():
  data = request.get_json()
  # Ambil input dari formulir HTML
  provinsi = data['provinsi']
  kabupaten = data['kabupaten']
  latitude = data['latitude']
  longitude = data['longitude']
  category = data['category']
  commodity = data['commodity']

  # Load the dataset into a DataFrame
  dataset = pd.read_csv('Data_Harga1.csv', delimiter=';')

  # Drop rows with missing values
  dataset = dataset.dropna()

  # Preprocess latitude and longitude columns
  dataset['latitude'] = dataset['latitude'].str.replace('.', '').str.replace('..', '.')
  dataset['longitude'] = dataset['longitude'].str.replace('.', '').str.replace('..', '.')

  # Convert latitude and longitude columns to float
  dataset['latitude'] = dataset['latitude'].astype(float)
  dataset['longitude'] = dataset['longitude'].astype(float)

  # Apply the formatting to latitude and longitude columns
  dataset['latitude'] = dataset['latitude'] / 1000000
  dataset['longitude'] = dataset['longitude'] / 1000000

  print(dataset.head)
  print(dataset.columns)
  max_length = 1
  
  # Preprocess user input
  user_pasar = tokenizer.texts_to_sequences([kabupaten])  # Tokenize 'pasar'
  user_pasar = pad_sequences(user_pasar, maxlen=max_length)  # Pad the sequence

  # Create an instance of OneHotEncoder
  onehot_encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')

  # Fit and transform the categorical features
  user_provinsi_encoded = onehot_encoder.fit_transform([[provinsi]])
  user_category_encoded = onehot_encoder.transform([[category]])
  user_commodity_encoded = onehot_encoder.transform([[commodity]])
  user_kabupaten_encoded = onehot_encoder.transform([[kabupaten]])

  # Combine the numeric and categorical features
  user_numeric_features = np.array([[latitude, longitude]])  # Reshape to (1, 2)
  user_features = np.concatenate((user_numeric_features, user_provinsi_encoded, user_kabupaten_encoded, user_category_encoded, user_commodity_encoded), axis=1)

  # Take only the first three elements from user_features
  user_features = user_features[:, :6]

  # Make predictions
  predicted_price = model.predict([user_pasar, user_features])
  
    # Sort the predicted prices in ascending order
  sorted_indices = np.argsort(predicted_price.flatten())
  sorted_prices = predicted_price[sorted_indices]

  # Get the top five market locations with the lowest predicted prices
  recommended_locations = dataset.iloc[sorted_indices[:5]]

  # Filter data based on user input
  filtered_data = dataset[(dataset['provinsi'] == provinsi) & (dataset['kabupaten'] == kabupaten) & (dataset['category'] == category) & (dataset['commodity'] == commodity)].copy()
  print("Filtered Data Length:", len(filtered_data))  # Add this line to check the length of filtered_data

  # Create a new DataFrame to store recommended locations with distances
  # recommended_locations = pd.DataFrame(columns=['pasar', 'price', 'latitude', 'longitude', 'distance'])
  # recommended_locations = pd.DataFrame(columns=['pasar', 'price', 'latitude', 'longitude', 'distance'])

  # Create a set to store the visited markets
  # visited_markets = set()


  # Sort the recommendations by price and distance
  # sorted_recommendations = recommended_locations.sort_values(['price', 'distance'])
  
  # Create a new DataFrame to store recommended locations with distances
  # recommended_locations = pd.DataFrame(columns=['pasar', 'price', 'latitude', 'longitude', 'distance'])
  recommended_locations = pd.DataFrame(columns=['pasar', 'price', 'latitude', 'longitude', 'distance'])

  # Create a set to store the visited markets
  visited_markets = set()

  # Calculate distances and add rows to the recommended_locations DataFrame
  for i, row in filtered_data.iterrows():
      market = row['pasar']
      if market not in visited_markets:
          distance = geodesic((latitude, longitude), (row['latitude'], row['longitude'])).km
          recommended_locations.loc[i] = [market, row['price'], row['latitude'], row['longitude'], distance]
          visited_markets.add(market)

          # Break the loop if 5 unique markets have been added
          if len(recommended_locations) == 5:
              break

  # Sort the recommendations by price and distance
  sorted_recommendations = recommended_locations.sort_values(['price', 'distance'])
    
  # Menyiapkan respons dalam format JSON
  # response = {
  #   'recommended_locations' : recommended_locations.tolist(),
  #   'prediction': predicted_price.tolist()
  # }
    
  # Mengembalikan respons JSON
  return jsonify({
    'message': 'Success',
    'recommendation_store' : sorted_recommendations.to_dict(orient='records'),
  })

  # # Lakukan prediksi menggunakan model
  # prediction = model.predict(np.array([data]))
  # predicted_class = prediction

  # Tampilkan hasil prediksi
  # return make_response(jsonify(
  #   {
  #     'message': 'Success',
  #     'data': {
  #       'recommendation_store': predicted_class
  #     }
  #   }
  # ))
  
if __name__ == '__main__':
  app.run(debug=True)