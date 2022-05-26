import json
from bson import ObjectId
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask import Flask, Response, jsonify, make_response, request, redirect, url_for

CONNECTION_STRING = "mongodb+srv://rodwel09:linkinpark09@registropacientes.hfw5c.mongodb.net/pacientes?retryWrites=true&w=majority"

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

try: 
    client = MongoClient(CONNECTION_STRING)
    client.server_info()
except:
    print("There's an error connecting to the database")

@app.route("/get_all_notifications", methods=["GET"])
@cross_origin()
def get_all_new_pacients():
    query_pacientes = client.get_database("Pacientes").get_collection("Informacion").find({})
    return make_response(jsonify(JSONEncoder().encode(list(query_pacientes))), 200)

@app.route("/delete_notification/<id>", methods=['DELETE'])
@cross_origin()
def get_pacient_info(id):
    query = client.get_database("Pacientes").get_collection("Informacion").delete_one({"_id": ObjectId(id)})
    print(query.deleted_count)
    return "Notification Deleted"

@app.route("/update_hour_of_patient", methods=["POST"])
@cross_origin()
def find_notification_pacient():
    encode_data = request.data.decode('utf-8')
    allData = json.loads(encode_data)

    id = allData["id_paciente"]
    hora_atencion = allData["hora_atencion"]

    client.get_database("Pacientes").get_collection("Informacion").find_one_and_update({"_id": ObjectId(id)}, {"$set": {"hora_atencion": hora_atencion}})

    return "Hour Added"



# pacients client API
@app.route("/new_pacients", methods=["POST"])
def new_pacients():
    try: 
        encode_data = request.data.decode('utf-8')
        allData = json.loads(encode_data)

        nombre = allData["nombre_paciente"]
        apellido = allData["apellido_paciente"]
        edad = allData["edad_paciente"]
        fecha = allData["fecha_nacimiento"]
        tipo_sangre = allData["tipo_sangre"]
        sexo_paciente = allData["sexo_paciente"]
        estado_civil = allData["estado_civil"]
        alergias_paciente = allData["alergias_paciente"]
        fecha_atencion = allData["fecha_atencion_paciente"]
        padecimiento_atencion = allData["padecimiento_paciente"]
        status_paciente = "0"
        hora_atencion = "0"

        pacientes = {
            "nombre_paciente": nombre,
            "apellido_paciente": apellido,
            "edad_paciente": edad,
            "fecha_de_nacimiento": fecha,
            "tipo_sangre": tipo_sangre,
            "sexo_paciente": sexo_paciente,
            "estado_civil": estado_civil,
            "alergias_paciente": alergias_paciente,
            "fecha_de_atencion": fecha_atencion,
            "padecimiento_paciente": padecimiento_atencion,
            "status_paciente": status_paciente,
            "hora_atencion": hora_atencion
        }

        client.get_database("Pacientes").get_collection("Informacion").insert_one(pacientes)

        return "Post Successfull"
    except:
        return "There's a problem with the request"
    

@app.route("/") 
def homePage():
    return "Hello World"

if __name__ == "__main__":
    app.run(debug=True) 