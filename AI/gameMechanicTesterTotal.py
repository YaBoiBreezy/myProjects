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

class Player:
    numAmulets=0
    amulets=[]
    best=0
    maxAmuletValue=1
    
    obsoleteArr=[[[[[[False for a in range(10)] for a in range(10)] for a in range(10)] for a in range(10)] for a in range(10)] for a in range(10)]
    for a in range(10):
        for b in range(10):
            for c in range(10):
                for d in range(10):
                    for e in range(10):
                        for f in range(10):
                            obsoleteArr[a][b][c][d][e][f]=((a<=d and b<=e and c<=f) or (a>=d and b>=e and c>=f))
    
    def addAmulet(self,newAmulet):
        for amulet in self.amulets:
            if self.obsoleteArr[amulet.attack][amulet.health][amulet.speed][newAmulet.attack][newAmulet.health][newAmulet.speed]:
                return False
        self.amulets.append(newAmulet)
        self.numAmulets+=1
        if self.numAmulets>self.best:
            self.best=self.numAmulets
        return True
    
    def removeAmulet(self):
        self.amulets.pop()
        self.numAmulets-=1

def recurse(player):
    x=player.amulets[-1].attack
    for y in range (player.amulets[-1].health,player.maxAmuletValue):#each amulets in best set has defence >= the last one, except when attack changed, so this optimizes code based on that pattern
        for z in range (0,player.amulets[-1].speed):#each amulets in best set has speed <= the last one, except when attack changed, so this optimizes code based on that pattern
            if player.addAmulet(Amulet(x,y,z)):
                recurse(player)
                player.removeAmulet()
    for x in range (player.amulets[-1].attack+1,player.maxAmuletValue):#each amulet in the best set has attack >= every amulet before it, so this optimizes code based on that pattern
        for y in range (0,player.maxAmuletValue):
            for z in range (0,player.maxAmuletValue):
                if player.addAmulet(Amulet(x,y,z)):
                    recurse(player)
                    player.removeAmulet()

#maxAmuletValue=0  #for checking smaller sample sizes, note this is one higher than what will be checked  (if =2, checks in range 1 to 1)
def main():
    import time
    player = Player()
    while player.maxAmuletValue<12:
        startTime = time.time()
        for x in range (0,player.maxAmuletValue):
            for y in range (x,player.maxAmuletValue):
                for z in range (y,player.maxAmuletValue):
                    player.addAmulet(Amulet(x,y,z))
                    recurse(player)
                    player.removeAmulet()
        print("1-"+str(player.maxAmuletValue)+" = "+str(player.best)+"\a    Time: "+str(time.time() - startTime))
        player.maxAmuletValue+=1

main()

#too many possible combinations, checking 1000 amulets in each step of recursion...
#estimate 40 is max, which means 1000^40 calculations needed...
#instead, make each attribute 1-4, 1-5, etc., plot line to find answer

#range  result  best
#1-1  = 1       (1,1,1)
#1-2  = 3       (1,1,2  1,2,1  2,1,1)
#1-3  = 7       (1,2,3  1,3,2  2,1,3  2,2,2  2,3,1  3,1,2  3,2,1)
#1-4  = 12      (1,2,4  1,3,3  1,4,2  2,1,4  2,2,3  2,3,2  2,4,1  3,1,3  3,2,2,  3,3,1  4,1,2  4,2,1)
#1-5  = 19
#1-6  = 
#1-7  = 
#1-8  = 
#1-9  = 
#1-10 = 

#pattern:
#first value only goes up
#second value only goes up, but resets when first value changes
#third value only goes down, but resets when first value changes