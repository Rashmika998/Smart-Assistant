from flask import Flask, request, jsonify
from flask_cors import CORS
# from flask_pymongo import Pymongo,ObjectId 
import util

app = Flask(__name__)
CORS(app)

@app.route('/predict_vehicle_price', methods=['GET', 'POST'])
def predict_vehicle_price():
    brand = request.json['brand']
    vehicle_model = request.json['vehicle_model']
    year = int(request.json['year'])
    mileage = float(request.json['mileage'])
    fuel = request.json['fuel']
    transmission = request.json['transmission']
    condition = request.json['condition']
    capacity = request.json['capacity']

    response = jsonify({
        'estimated_price': util.get_estimated_price(brand,vehicle_model,year,mileage,fuel,transmission,condition,capacity)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_transmission_types', methods=['GET'])
def get_transmission_types():
    response = jsonify({
        'transmissions': util.get_transmission_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_condition_types', methods=['GET'])
def get_condition_types():
    response = jsonify({
        'conditions': util.get_condition_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_fuel_types', methods=['GET'])
def get_fuel_types():
    response = jsonify({
        'fuels': util.get_fuel_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_vehiclemodel_types', methods=['GET'])
def get_vehiclemodel_types():
    response = jsonify({
        'vehicle_models': util.get_vehiclemodel_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_brand_types', methods=['GET'])
def get_brand_types():
    response = jsonify({
        'brands': util.get_brand_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_capacity_types', methods=['GET'])
def get_capacity_types():
    response = jsonify({
        'capacities': util.get_capacity_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_related_vehicles', methods=['GET','POST'])
def get_related_vehicles():
    price = float(request.json['price'])
    year = int(request.json['year'])
    response = jsonify({
        'vehicles': util.get_related_vehicles(price,year)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Vehicle Price Prediction...")
    util.load_saved_artifacts()
    app.run()