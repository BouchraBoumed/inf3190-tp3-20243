# Copyright 2024 <Votre nom et code permanent>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask
from flask import render_template
from flask import g
from flask import jsonify
import random

from requests import request
from .database import Database

app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


# Route principale
@app.route('/')
def home():
    return render_template('index.html')

# Route pour le formulaire de mise en adoption
@app.route('/form')
def form():
    return render_template('form.html')

# Route pour naviguer la liste d'animaux disponibles
@app.route('/adopter')
def liste():
    db = get_db()
    animals = db.get_animaux()
    return render_template('adopter.html', animals=animals)

# Route pour effectuer des recherches et leurs resultats
@app.route('/search')
def search():
    query = request.args.get('query', '').lower()
    db = get_db()
    animals = db.get_animaux()

    results = [
        animal for animal in animals
        if query in ' '.join(str(value).lower() for value in animal.values())
    ]

    return render_template('resultat_recherches.html', animals=results)

#Route pour consulter le profil d'un animal
@app.route('/animal/<int:animal_id>')
def animal_detail(animal_id):
    db = get_db()
    animal = db.get_animal(animal_id)
    if animal:
        return render_template('profil_animal.html', animal=animal)
    return "Animal pas trouvé", 404

#Route pour l'affichage aleratoire dans la page d'acceuil
@app.route('/api/random-animals')
def random_animals():
    db = get_db()
    animals = db.get_animaux()
    random_animals = random.sample(animals, 5)
    return jsonify(random_animals)

#Route pour l'ajout d'un animal
@app.route('/api/add-animal', methods=['POST'])
def add_animal():
    data = request.json
    db = get_db()
    try:
        animal_id = db.add_animal(
            data['nom'],
            data['espece'],
            data['race'],
            data['age'],
            data['description'],
            data['courriel'],
            data['adresse'],
            data['ville'],
            data['cp']
        )
        return jsonify({'success': True, 'animal_id': animal_id}), 201
    except Exception as e:
        print(f"Erreur lors d'ajout d'animal: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)