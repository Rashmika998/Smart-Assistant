import pickle
import json
import numpy as np

__data_columns = None
__model = None
__transmission = None
__fuel = None
__vehiclemodel = None
__brand = None
__capacity = None

def get_estimated_price(brand,vehicle_model,year,mileage,fuel,transmission,condition,capacity):
    try:
        brand_index = __data_columns.index(brand.lower())
    except:
        brand_index = -1

    try:
        model_index = __data_columns.index(vehicle_model.lower())
    except:
        model_index = -1

    try:
        fuel_index = __data_columns.index(fuel.lower())
    except:
        fuel_index = -1

    try:
        transmission_index = __data_columns.index(transmission.lower())
    except:
        transmission_index = -1

    try:
        condition_index = __data_columns.index(condition.lower())
    except:
        condition_index = -1

    try:
        capacity_index = __data_columns.index(capacity.lower())
    except:
        capacity_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = mileage
    x[304]=2022-year
    if brand_index >= 0:
        x[brand_index] = 1
        
    if model_index >= 0:
        x[model_index] = 1
        
    if transmission_index >= 0:
        x[transmission_index] = 1
        
    if fuel_index >= 0:
        x[fuel_index] = 1
        
    if condition_index >= 0:
        x[condition_index] = 1

    if capacity_index >= 0:
        x[capacity_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __transmission
    global __condition
    global __fuel
    global __vehiclemodel
    global __brand
    global __capacity
   

    with open("artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __transmission = __data_columns[1:5]
        __condition = __data_columns[5:8]
        __fuel = __data_columns[8:14]
        __vehiclemodel = __data_columns[14:255]
        __brand = __data_columns[255:304]
        __capacity = __data_columns[305:594]

    global __model
    if __model is None:
        with open('artifacts/used_vehicle_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_transmission_types():
    return __transmission

def get_condition_types():
    return __condition

def get_fuel_types():
    return __fuel

def get_vehiclemodel_types():
    return __vehiclemodel

def get_brand_types():
    return __brand

def get_capacity_types():
    return __capacity

def get_data_columns():
    return __data_columns

def get_related_vehicles(price,man_year):
    li = list()
    vehicle_list = json.loads(open('artifacts/data.json').read())
    max_price = price + 100000.0
    min_price = price - 100000.0
    for vehicle in vehicle_list:
        if vehicle['price'] > min_price and vehicle['price'] < max_price and vehicle['Year']==man_year:
            li.append(vehicle)

    return li

if __name__ == '__main__':
    load_saved_artifacts()
    # print(get_transmission_types())
    # print(get_condition_types())
    # print(get_fuel_types())
    # print(get_vehiclemodel_types())
    # print(get_capacity_types())
    # print(get_estimated_price('Toyota','CHR',2018,28983,'Petrol','Automatic','Used','1200'))
    # print(get_estimated_price('Suzuki','Alto',2015,15000,'Petrol','Automatic','Used','998'))
    print(get_related_vehicles(2985000.0,2016))
    # print(get_estimated_price('Toyota','Prius',2012,112000,'Petrol','Automatic','Used','1800'))