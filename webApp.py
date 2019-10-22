from flask import Flask, render_template, json, request
import numpy as py;
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
def makePrediction():
    value = request.args.get('image')
    if(value.size>100):
        print(value+ "web app logic")
    
##run the app from the script
if __name__ == "__main__":
    app.run(debug = True)