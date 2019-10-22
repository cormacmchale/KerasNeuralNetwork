from flask import Flask, render_template, json, request, jsonify
import json
import numpy as py
import keras as kr
from keras.models import load_model
import sys
app=Flask(__name__)
model = load_model('savedModel/my_model.h5')
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

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
    prediction = (py.array(value).reshape(1,784))
    print(prediction, file=sys.stderr)
    #Reshape it so the model can make a prediction
        #this can be done on one line
        #predictThisValue = newArray.reshape(1,784)
    #get that prediction
    #answer = model.predict(prediction)
    #respond to the webPage    
    return jsonify({'prediction': "hype"})
    
##run the app from the script
##actually start the web app running
if __name__ == "__main__":
    app.run(debug = True)