from flask import Flask, jsonify, request
from flask_cors import CORS
from songs_picker import random_songs

app = Flask(__name__)
CORS(app)

@app.route("/submit", methods=["POST"])
def handle_submit():
    data = request.get_json()
    mood = data.get("mood")
    rand_songs = random_songs(mood)

    return jsonify({"message": rand_songs})

if __name__ == "__main__":
    app.run(debug=True)
