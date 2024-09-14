from flask import Flask, jsonify
from flask_cors import CORS

# Initialize the Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Define a route for the home page
@app.route('/')
def home():
    return jsonify(message="Hello, Flask!")

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)