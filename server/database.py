import pymongo
import certifi

def get_db():
    client = pymongo.MongoClient("mongodb+srv://Rashmika:Rashmika1998@vehicleprices.a4ddm.mongodb.net/vehicles?retryWrites=true&w=majority",tlsCAFile=certifi.where())
    return client['vehicles'] #db name


if __name__ == "__main__":
    db = get_db
