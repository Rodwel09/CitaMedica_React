import json
from pymongo import MongoClient
from flask import Flask, jsonify, request

CONNECTION_STRING = "mongodb+srv://rodwel09:linkinpark09@registropacientes.hfw5c.mongodb.net/pacientes?retryWrites=true&w=majority"

app = Flask(__name__)

try: 
    client = MongoClient(CONNECTION_STRING)
    client.server_info()
except:
    print("There's an error connecting to the database")

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

        pacientes = {
            "nombre_paciente": nombre,
            "apellido_paciente": apellido,
            "edad_paciente": edad,
            "fecha_paciente": fecha,
            "tipo_sangre": tipo_sangre,
            "sexo_paciente": sexo_paciente,
            "estado_civil": estado_civil,
            "alergias_paciente": alergias_paciente,
            "fecha_paciente": fecha_atencion,
            "padecimiento_paciente": padecimiento_atencion
        }

        client.get_database("Pacientes").get_collection("Informacion").insert_one(pacientes)

        return "Post Sucessfull"
    except:
        return "There's a problem with the request"
    

@app.route("/") 
def homePage():
    return "Hello World"

if __name__ == "__main__":
    app.run(debug=True) 