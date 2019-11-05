#imports for functionality
from flask import Flask, render_template, json, request, jsonify
import numpy as np
import keras as kr
#for debugging flask wont allow for regular print
import sys
#get model onto server for use
from keras.models import load_model
numberRecoq = load_model('savedModel/my_model.h5')
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
    data = request.get_json()
    #save at specific place
    value = data['pixelArray']
    pixelInformation = (np.array(value).reshape(1,784))
    almost = abstractPredic(pixelInformation, numberRecoq)
    #check prediction
    print(almost, file=sys.stderr)
    
#run the app from the script
#actually start the web app running
if __name__ == "__main__":
    app.run(debug = True)