# KerasNeuralNetwork
Neural Network project

To Download and run the program
======
* Clone the Repo.
* Enter the Directory form the command line.
* Run the command "python webApp.py"
* Visit localhost:5000.
* Draw a digit and press "prediction" to display the guess of the drawn digit by the Neural network.

Quick Rundown of how the whole program works
======
The Neural Network is built using the Keras Machine learning library. It is trained using the MNIST data set, a large data set of hand written digits. It is then saved and ready to import into an environment that it is required for use. For this project that was a Flask web server. Flask is a web server architecture written in python. The web app loads a html view for the user when the base endpoint provided by the program is requested by a browser. The view allows the user to draw on a html canvas. When the user clicks the predict button in the view, the pixel data of the canvas is then sent to the web server. The Keras model for recognizing hand written digits is now loaded into the web app for processing image data. The pixel information is fed to the model and a prediction is returned to the view. This is handled by an ajax request. 

Description
======
This is a Web application designed using four components.

1. Keras - To build and train the Model, the following are links to the parts of the Repo containing documentation on this.

* [Learning to train the neural Network](https://github.com/cormacmchale/KerasNeuralNetwork/issues/2)
* [The References and problems encountered while trying to improve the Neural Network](https://github.com/cormacmchale/KerasNeuralNetwork/issues/4)
* [Learning keras using a juptyer notebook](https://github.com/cormacmchale/KerasNeuralNetwork/blob/master/NeuralNetwork%20Practice.ipynb)
* [Training the model using a juptyer notebook](https://github.com/cormacmchale/KerasNeuralNetwork/blob/master/Project.ipynb)
* [Trained Model saved here](https://github.com/cormacmchale/KerasNeuralNetwork/tree/master/savedModel)
 
2. Flask - The Web Server, the following are links to the parts of the Repo containing documentation on this.
* [Learning to use flask with documentation of refernces and problems](https://github.com/cormacmchale/KerasNeuralNetwork/issues/1)
* [Commented python code of the Web Server](https://github.com/cormacmchale/KerasNeuralNetwork/blob/master/webApp.py)
 
3. Html and Javascript - The view given to the browser by flask, the following are links to the parts of the Repo containing documentation on this.
* [Sending the Data Drawn on the html canvas to the server, references and problems](https://github.com/cormacmchale/KerasNeuralNetwork/issues/5)
 
4.Mnist Data set
* [Documentation of learning how to consume the Data set](https://github.com/cormacmchale/KerasNeuralNetwork/issues/3)
* [c++ code for reading the data](https://github.com/cormacmchale/KerasNeuralNetwork/blob/master/mnistreader/mnistreader/main.c)
  
*This was eventually handled in the python code while training the Neural network (See the Training the model link). This section was just an attempt to fully understand the format of the data
 
Finally
======
After completing the required functionality of the program functionality of the program all changes made for improvement were documented here.

[Cleaning up the code](https://github.com/cormacmchale/KerasNeuralNetwork/issues/6)

[Training a better network](https://github.com/cormacmchale/KerasNeuralNetwork/issues/4)

