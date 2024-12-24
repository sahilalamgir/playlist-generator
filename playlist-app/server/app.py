from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/submit", methods=["POST"])
def handle_submit():
    data = request.get_json()
    mood = data.get("mood")
    
    return jsonify({"message": mood})

if __name__ == "__main__":
    app.run(debug=True)
