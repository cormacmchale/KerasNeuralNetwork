from flask import Flask, render_template, json, request, jsonify
import json
import numpy as np
import keras as kr
from keras.models import load_model
import sys
import sklearn.preprocessing as pre
model = load_model('savedModel/my_model.h5')
#model.summary()

app=Flask(__name__)

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
    #get Json data
    data = request.get_json()
    #save at specific place
    value = data['pixelArray']
    #turn to numpy array
    pixelInformation = (np.array(value).reshape(1,784))
    #model.predict(pixelInformation)
    print(pixelInformation, file=sys.stderr)
    #respond to the webPage    
    return jsonify({'prediction': "prediction placeholder"})
    
##run the app from the script
##actually start the web app running
if __name__ == "__main__":
    app.run(debug = True, threaded = False)