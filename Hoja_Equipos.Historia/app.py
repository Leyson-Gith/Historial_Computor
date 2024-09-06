from flask import Flask, render_template, request, jsonify, redirect, url_for
import json

app = Flask(__name__)

# Cargar datos de ejemplo (esto normalmente estaría en una base de datos)
with open('data/equipos.json', 'r') as f:
    equipos = json.load(f)

@app.route('/')
def index():
    return render_template('index.html', equipos=equipos)

@app.route('/equipo/<placa>')
def equipo_detalle(placa):
    equipo = next((eq for eq in equipos if eq["placa"] == placa), None)
    return render_template('equipo_detalle.html', equipo=equipo)

@app.route('/buscar', methods=['GET'])
def buscar():
    query = request.args.get('q')
    filtro = request.args.get('filtro')
    resultados = [eq for eq in equipos if eq[filtro] == query]
    return jsonify(resultados=resultados, total=len(resultados))

@app.route('/registrar_equipo', methods=['POST'])
def registrar_equipo():
    nuevo_equipo = request.json
    equipos.append(nuevo_equipo)

    # Guardar en un archivo JSON (opcional si quieres persistencia)
    with open('data/equipos.json', 'w') as f:
        json.dump(equipos, f, indent=4)

    return jsonify(status="Equipo registrado con éxito")

@app.route('/eliminar_equipo/<placa>', methods=['DELETE'])
def eliminar_equipo(placa):
    global equipos
    equipos = [eq for eq in equipos if eq["placa"] != placa]

    with open('data/equipos.json', 'w') as f:
        json.dump(equipos, f, indent=4)

    return jsonify(status="Equipo eliminado con éxito")

if __name__ == '__main__':
    app.run(debug=True)
