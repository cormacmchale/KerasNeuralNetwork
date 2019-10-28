import keras as kr
import numpy as np
from keras.models import load_model

def abstractPredic(x, m):
    prediction = m.predict(x)
    getPredict = np.array(prediction[0])
    return np.argmax(getPredict)
