import keras as kr
import numpy as np
from keras.models import load_model
def abstractPredic(x, m):
    #get the model to predict
    prediction = m.predict(x)
    #get the array of outputs
    getPredict = np.array(prediction[0])
    #predicted number is the index of highest value
    return np.argmax(getPredict)
