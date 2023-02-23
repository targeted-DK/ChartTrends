from flask import Flask, request, jsonify
from analysis import analyze_data

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()['data']
    result = analyze_data(data)
    return jsonify(result)