#imports for functionality
from flask import Flask, render_template, json, request, jsonify
import numpy as np
import keras as kr
#for debugging flask wont allow for regular print
import sys
#get model onto server for use
from keras.models import load_model
numberRecoq = load_model('savedModel/freshlyTrained.h5')
#thread issue fix
from returnPrediction import abstractPredic
#initialize app
app=Flask(__name__)

@app.route("/")
def UI():
    return render_template("drawNumber.html")
#jQuesry needs to be added here
@app.route("/makePrediction", methods=['POST'])
def makePrediction():
    #get Json data
    value = request.json['pixelArray']
    #format info
    pixelInformation = (np.array(value).reshape(1,784))
    #check prediction
    prediction = abstractPredic(pixelInformation, numberRecoq)
    #return prediction in correct format
    return jsonify(int(prediction))
    
#run the app from the script
#start the web app in debug mode
if __name__ == "__main__":
    app.run(debug = True)