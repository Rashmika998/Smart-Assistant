from flask import Flask, request, jsonify
from flask_cors import CORS
import database
import util
import bcrypt

app = Flask(__name__)
CORS(app)
collection_name = database.get_db()["searched_vehicles"]

@app.route('/add_admin', methods=['POST'])
def add_admin():  # route to add an admin
    try:
        email = request.json.get('email',None)
        password = request.json.get('password',None)

        if not email:
            return "Missing Email",400
        if not password:
            return "Missing Password",400

        hashed = bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt())
        collection_name.insert_one({
            'email':email,
            'password': hashed
        })
        response = jsonify({
        'status': "Vehicle added"
         })
        response.headers.add('Access-Control-Allow-Origin', '*')

    except AttributeError:
        response = jsonify({
            'status': "Provided values are incorrect"
            })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/login', methods=['POST'])
def login():  # route to login
    try:
        email = request.json.get('email',None)
        password = request.json.get('password',None)

        if not email:
            response = jsonify({
                'code':400,
                'status': "Missing Email"
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        if not password:
            response = jsonify({
                'code':400,
                'status': "Missing Password"
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        
        user = collection_name.find_one({
            'email':email
        })
        if not user:
            response = jsonify({
                'code':400,
                'status': "User not found"
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        if bcrypt.checkpw(password.encode('utf-8'),user.password):
            response = jsonify({
                'status': "User Logged in"
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        else:
            response = jsonify({
                'status': "Entered details are incorrect"
                })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

    except AttributeError:
        response = jsonify({
            'status': "Provided values are incorrect"
            })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/get_vehicles', methods=['GET'])
def get_vehicles():  # route to get the vehicles
    li = []
    for vehicle in collection_name.find():
        vehicle['_id'] = str(vehicle['_id'])
        li.append(vehicle)

    response = jsonify({
        'vehicles': li
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/add_vehicle', methods=['POST'])
def store_vehicle():  # route to add a vehicle
    collection_name.insert_one({
        'brand': request.json['brand'],
        'vehicle_model': request.json['vehicle_model'],
        'year': int(request.json['year']),
        'mileage': float(request.json['mileage']),
        'fuel': request.json['fuel'],
        'transmission': request.json['transmission'],
        'condition': request.json['condition'],
        'capacity': request.json['capacity'],
        'price': float(request.json['price'])
    })
    response = jsonify({
        'status': "Vehicle added"
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_vehicle_price', methods=['GET', 'POST'])
def predict_vehicle_price():  # route to predict the vehicle price
    brand = request.json['brand']
    vehicle_model = request.json['vehicle_model']
    year = int(request.json['year'])
    mileage = float(request.json['mileage'])
    fuel = request.json['fuel']
    transmission = request.json['transmission']
    condition = request.json['condition']
    capacity = request.json['capacity']

    response = jsonify({
        'estimated_price': util.get_estimated_price(brand, vehicle_model, year, mileage, fuel, transmission, condition, capacity)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_transmission_types', methods=['GET'])
def get_transmission_types():  # route to get transmission types
    response = jsonify({
        'transmissions': util.get_transmission_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_condition_types', methods=['GET'])
def get_condition_types():  # route to get condition types
    response = jsonify({
        'conditions': util.get_condition_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_fuel_types', methods=['GET'])
def get_fuel_types():  # route to get fuel types
    response = jsonify({
        'fuels': util.get_fuel_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_vehiclemodel_types', methods=['GET'])
def get_vehiclemodel_types():  # route to get vehicle model types
    response = jsonify({
        'vehicle_models': util.get_vehiclemodel_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_brand_types', methods=['GET'])
def get_brand_types():  # route to get vehicle brand types
    response = jsonify({
        'brands': util.get_brand_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_capacity_types', methods=['GET'])
def get_capacity_types():  # route to get capacity types
    response = jsonify({
        'capacities': util.get_capacity_types()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/get_related_vehicles', methods=['GET', 'POST'])
def get_related_vehicles():  # route to get related vehicles with same price(in a range)
    price = float(request.json['price'])
    year = int(request.json['year'])
    response = jsonify({
        'vehicles': util.get_related_vehicles(price, year)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Vehicle Price Prediction...")
    util.load_saved_artifacts()
    app.run()
