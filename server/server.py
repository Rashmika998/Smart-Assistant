from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_transmission_types', methods=['GET'])
def get_transmission_types():
    response = jsonify({
        'transmission': util.get_transmission_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_vehicle_price', methods=['GET', 'POST'])
def predict_vehicle_price():
    brand = request.form['brand']
    vehicle_model = request.form['vehicle_model']
    year = int(request.form['year'])
    mileage = float(request.form['mileage'])
    fuel = request.form['fuel']
    transmission = request.form['transmission']
    condition = request.form['condition']
    capacity = request.form['capacity']

    response = jsonify({
        'estimated_price': util.get_estimated_price(brand,vehicle_model,year,mileage,fuel,transmission,condition,capacity)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Vehicle Price Prediction...")
    util.load_saved_artifacts()
    app.run()