#tester for game mechanic:
#spend some coins to get an amulet, which gives you 3 attributes of random values 1-10  (ex. health, damage, speed)
#possible to have one better/== another in all 3 attributes, in which case weaker one is obsolete, but also possible to have many that are good (1,1,10) vs (10,10,2)
#so how many can you have total, if you remove any obsolete ones?
#1000 possible amulets, check all with recursion
#Alexander Breeze 

class Amulet:
    speed=0
    health=0
    attack=0
    
    def __init__(self,a,h,s):
        self.attack=a
        self.health=h
        self.speed=s
    
    def print(self):
        print("# ("+str(self.attack)+" "+str(self.health)+" "+str(self.speed)+")")
    
    def obsolete(self,newAmulet):
        return (newAmulet.attack<=self.attack and newAmulet.health<=self.health and newAmulet.speed<=self.speed) or (newAmulet.attack>=self.attack and newAmulet.speed>=self.speed and newAmulet.health>=self.health)

class Player:
    numAmulets=0
    amulets=[]
    best=0
    maxAmuletValue=int(input("Checking values from 1-"))+1
        
    
    def addAmulet(self,newAmulet):
        for amulet in self.amulets:
            if amulet.obsolete(newAmulet):
                return False
        self.amulets.append(newAmulet)
        self.numAmulets+=1
        if self.numAmulets>self.best:
            self.best=self.numAmulets
            print("new best: "+str(self.numAmulets))
            for amulet in self.amulets:
                amulet.print()
        return True
    
    def removeAmulet(self):
        self.amulets.pop()
        self.numAmulets-=1

def recurseTop(player):
    x=player.amulets[-1].attack
    for y in range (player.amulets[-1].health,player.maxAmuletValue):#each amulets in best set has defence >= the last one, except when attack changed, so this optimizes code based on that pattern
        for z in range (1,player.amulets[-1].speed):#each amulets in best set has speed <= the last one, except when attack changed, so this optimizes code based on that pattern
            if player.addAmulet(Amulet(x,y,z)):
                recurse(player)
                player.removeAmulet()
                print("                                    "+str(x)+" "+str(y)+" "+str(z)+"----------------")
    for x in range (player.amulets[-1].attack+1,player.maxAmuletValue):#each amulet in the best set has attack >= every amulet before it, so this optimizes code based on that pattern
        for y in range (1,player.maxAmuletValue):
            for z in range (1,player.maxAmuletValue):
                if player.addAmulet(Amulet(x,y,z)):
                    recurse(player)
                    player.removeAmulet()
                    print("                                    "+str(x)+" "+str(y)+" "+str(z)+"----------------")

def recurse(player):
    x=player.amulets[-1].attack
    for y in range (player.amulets[-1].health,player.maxAmuletValue):#each amulets in best set has defence >= the last one, except when attack changed, so this optimizes code based on that pattern
        for z in range (1,player.amulets[-1].speed):#each amulets in best set has speed <= the last one, except when attack changed, so this optimizes code based on that pattern
            if player.addAmulet(Amulet(x,y,z)):
                recurse(player)
                player.removeAmulet()
    for x in range (player.amulets[-1].attack+1,player.maxAmuletValue):#each amulet in the best set has attack >= every amulet before it, so this optimizes code based on that pattern
        for y in range (1,player.maxAmuletValue):
            for z in range (1,player.maxAmuletValue):
                if player.addAmulet(Amulet(x,y,z)):
                    recurse(player)
                    player.removeAmulet()

#maxAmuletValue=0  #for checking smaller sample sizes, note this is one higher than what will be checked  (if =2, checks in range 1 to 1)
def main():
    import time
    startTime = time.time()
    
    player = Player()
    
    for x in range (1,player.maxAmuletValue):
        for y in range (x,player.maxAmuletValue):
            for z in range (y,player.maxAmuletValue):
                player.addAmulet(Amulet(x,y,z))
                recurseTop(player)
                player.removeAmulet()
                print("         ------------"+str(x)+" "+str(y)+" "+str(z)+"----------------")
    print("1-"+str(player.maxAmuletValue-1)+" best="+str(player.best))
    print("DONE!")
    print("\a") #makes noise
    executionTime = (time.time() - startTime)
    print('Execution time in seconds: ' + str(executionTime))

main()

#too many possible combinations, checking 1000 amulets in each step of recursion...
#estimate 40 is max, which means 1000^40 calculations needed...
#instead, make each attribute 1-4, 1-5, etc., plot line to find answer

#range  result  inc  incinc
#1-0  = 0
#1-1  = 1       1    
#1-2  = 3       2    1
#1-3  = 7       4    2
#1-4  = 12      5    1
#1-5  = 19      7    2
#1-6  = 
#1-7  = 
#1-8  = 
#1-9  = 
#1-10 = 

#GUESS
#range  result  inc  incinc
#1-0  = 0
#1-1  = 1       1    
#1-2  = 3       2    1
#1-3  = 7       4    2
#1-4  = 12      5    1
#1-5  = 19      7    2
#1-6  = 27      8    1
#1-7  = 37      10   2
#1-8  = 48      11   1
#1-9  = 61      13   2
#1-10 = 75      14   1

#(increases by x each time, where x itself increases by 1,2,1,2... each time (theory))

#pattern:
#first value only goes up
#second value only goes up, but resets when first value changes
#third value only goes down, but resets when first value changes

# (1 1 1)
#
# (1 1 2)
# (1 2 1)
# (2 1 1)
#
# (1 2 3)
# (1 3 2)
# (2 1 3)
# (2 2 2)
# (2 3 1)
# (3 1 2)
# (3 2 1)
#
# (1 2 4)
# (1 3 3)
# (1 4 2)
# (2 1 4)
# (2 2 3)
# (2 3 2)
# (2 4 1)
# (3 1 3)
# (3 2 2)
# (3 3 1)
# (4 1 2)
# (4 2 1)
#
# (1 3 5)
# (1 4 4)
# (1 5 3)
# (2 2 5)
# (2 3 4)
# (2 4 3)
# (2 5 2)
# (3 1 5)
# (3 2 4)
# (3 3 3)
# (3 4 2)
# (3 5 1)
# (4 1 4)
# (4 2 3)
# (4 3 2)
# (4 4 1)
# (5 1 3)
# (5 2 2)
# (5 3 1)
#
# (1 3 6)
# (1 4 5)
# (1 5 4)
# (1 6 3)
# (2 2 6)
# (2 3 5)
# (2 4 4)
# (2 5 3)
# (2 6 2)
# (3 1 6)
# (3 2 5)
# (3 3 4)
# (3 4 3)
# (3 5 2)
# (3 6 1)
# (4 1 5)
# (4 2 4)
# (4 3 3)
# (4 4 2)
# (4 5 1)
# (5 1 4)
# (5 2 3)
# (5 3 2)
# (5 4 1)
# (6 1 3)
# (6 2 2)
# (6 3 1)