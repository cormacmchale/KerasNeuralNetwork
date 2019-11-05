from flask import Flask, render_template, json, request, jsonify
import numpy as np
import keras as kr
import sys
from keras.models import load_model
#thread issue fix
from returnPrediction import abstractPredic
numberRecoq = load_model('savedModel/my_model.h5')
app=Flask(__name__)

@app.route("/")
def UI():
    return render_template("drawNumber.html")

@app.route("/makePrediction", methods=['POST'])
def makePrediction():
    #get Json data
    data = request.get_json()
    #save at specific place
    value = data['pixelArray']
    pixelInformation = (np.array(value).reshape(1,784))
    almost = abstractPredic(pixelInformation, numberRecoq)
    print(almost, file=sys.stderr)
    #prediction = numberRecoq.predict(pixelInformation).tolist()
    #respond to the webPage   
    #return jsonify({'prediction': 'almost'})
    #return render_template("drawNumber.html")
    
##run the app from the script
##actually start the web app running
if __name__ == "__main__":
    app.run(debug = True, threaded = False)