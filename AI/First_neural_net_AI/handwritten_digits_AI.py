#NOTE: done using the resource http://neuralnetworksanddeeplearning.com/
#Read the full text, for fun (weird, I hate textbooks but I guess I think AI is fun?), and followed along
# -Alex Breeze

class Network(object):

    def __init__(self, sizes):
        self.num_layers = len(sizes)
        self.sizes = sizes  #number of nodes n each layer
        self.biases = [np.random.randn(y, 1) for y in sizes[1:]]
        self.weights = [np.random.randn(y, x) 
                        for x, y in zip(sizes[:-1], sizes[1:])]

def main():
    git clone https://github.com/mnielsen/neural-networks-and-deep-learning.git
    net = Network([2, 3, 1])
