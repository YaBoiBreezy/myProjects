class Animal:
	def __init__(self,name):
		self.name=name
one=Animal("Alex")
two=Animal("Alex")
print(one==two) 
print(one is two)