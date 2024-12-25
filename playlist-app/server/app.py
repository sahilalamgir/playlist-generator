from flask import Flask, jsonify, request
from flask_cors import CORS
from songs_picker import random_song

app = Flask(__name__)
CORS(app)

@app.route("/submit", methods=["POST"])
def handle_submit():
    data = request.get_json()
    mood = data.get("mood")
    rand_song = random_song(mood)

    return jsonify({"message": rand_song})

if __name__ == "__main__":
    app.run(debug=True)
