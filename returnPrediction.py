import numpy as np
import keras as kr
from keras.models import load_model

def abstractPredic(x, m):
    #numberRecoq = load_model('savedModel/my_model.h5')
    #f= open("predict.txt","w+")
    prediction = m.predict(x)
    return prediction
