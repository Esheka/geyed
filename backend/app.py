from flask import Flask, jsonify

# Initialize the Flask app
app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def home():
    return jsonify(message="Hello, Flask!")

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)