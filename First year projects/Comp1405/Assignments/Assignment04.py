#Assignment 04 by Alex Breeze
#Fantasy hockey team code
#converts hockey team stats from .csv type to nested list, takes file name, returns said list
def readStats(file):
	list=[]
	start=0
	end=0
	listslot=0
	#makes sure file exists, if not returns empty list
	try:
		file=open(file,'r')
	except:
		return list
	#skips first line
	line=file.readline()
	line=file.readline()
	while line!='': #while not at end of text file
		list.append([])
		end=0
		for i in range (10): #Gets first 10 bits of data, last one is special case after for loop
			start=end
			while line[end]!=',':
				end+=1
			list[listslot].append(line[start:end])
			end+=1
		list[listslot].append(line[end:len(line)-1]) #special case for end of line
		listslot+=1	#saves place in list
		line=file.readline()
	file.close()
	return list

#takes a name and nested list, returns the stats for that player in a list
def statsForPlayer(list,name):
	outlist=[0,0,0,0,0,0,0,0,0,0,0] #if player not found returns 0's to not break code
	for i in range (len(list)):
		if list[i][0]==name:	#basic linear search
			outlist=list[i]
			return outlist
	return outlist

#Gets a 2-D list of all players and a position, returns all players+stats of said position
def filterByPos(list,position):
	outlist=[]
	for i in range (len(list)):
		if list[i][2]==position: #basic linear search, but grabs all good values instead of ending at the first acceptable player
			outlist.append(list[i])
	return outlist

#sorts a 2-D list of players by # of points via selection sort, returns sorted 2-D list
def sortByPoints (list):
	templist=list[:] #templist=list to get destroyed while getting #'s for outlist
	outlist=[]
	while len(templist)>0:
		highestPoint=0
		place=0
		for i in range (len(templist)):	#gets position of player in templist with the most points
			if int(templist[i][6])>int(highestPoint):
				highestPoint=templist[i][6]
				place=i
		outlist.append(templist[place])	#moves best player in templist to back of outlist
		templist.pop(place)
	return outlist

#makes file with names of highest point players to make a team with 1C 1RW 1LW and 2D, using filename and list of all players
def buildBestTeam (list,filename):
	try:
		file=open(filename,'w')
		center=sortByPoints(filterByPos(list,'C'))[0][0]
		LW=sortByPoints(filterByPos(list,'LW'))[0][0]
		RW=sortByPoints(filterByPos(list,'RW'))[0][0]
		D1=sortByPoints(filterByPos(list,'D'))[0][0] #[highestpoint][name]
		D2=sortByPoints(filterByPos(list,'D'))[1][0]
		file.write(str(center)+'\n')
		file.write(str(LW)+'\n')
		file.write(str(RW)+'\n')
		file.write(str(D1)+'\n')
		file.write(str(D2)+'\n')
		file.close()
	except:
		print('error in printing to file')

#displays all info about the players on a given team, from a txt file of 5 names and 2-D list of all players and stats
def displayTeamStats (list,filename):
	file=open(filename,'r')
	print('Name                    Team    Pos     Games   G       A       Pts     PIM     SOG     Hits    BS')
	print('====================================================================================================')
	#for all 5 players, puts out data and ' ' to fill in blanks for good formatting
	for i in range (5):
		line=file.readline()
		player=statsForPlayer(list,line[0:len(line)-1])
		line=player[0]+' '*(24-len(player[0]))
		for i in range (1,11):
			line+=player[i]+' '*(8-len(player[i]))
		print(line) 	#assembles string(line), to pring all on one line
	file.close()

#gets total points of 5 players on a team from 5 names in a text file, takes list of all players+stats, returns total points
def pointsPerTeam (list,filename):
	file=open(filename,'r')
	points=0
	for i in range (5):
		player=file.readline()
		player=player.replace('\n','')
		points+=int(statsForPlayer(list,player)[6])
	file.close()
	return points

#testing functions, delete if you want
list=readStats('nhl_2018.csv')
#print(statsForPlayer(list,'Kenny Agostino'))
#listRW=filterByPos(list,'RW')
#print(sortByPoints(listRW))
buildBestTeam(list,'bestTeam.txt')
displayTeamStats(list,'bestTeam.txt')
#print(pointsPerTeam(list,'bestTeam.txt'))
#print(pointsPerTeam(list,'sample_team.txt'))