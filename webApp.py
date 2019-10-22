from flask import Flask, render_template, json, request, jsonify
import json
import numpy as py
import sys

app=Flask(__name__)
value=py.empty

@app.route("/")
def firstFlaskPage():
    return render_template("flask.html")

@app.route("/addNumber")
def addNumberPage():
    return render_template("addNumber.html")

@app.route("/drawNumber")
def drawNumberPage():
    return render_template("drawNumber.html")

@app.route("/makePrediction", methods=['POST'])
def makePrediction():
    data = request.get_json()
    value = data['pixelArray']
    ##possible flow of program

    ##import model here
    ##pass it the numpy array
    ##pass prediction back into webpage and return the new view

    return jsonify({'result': value})
    
##run the app from the script
##actually start the web app running
if __name__ == "__main__":
    app.run(debug = True)