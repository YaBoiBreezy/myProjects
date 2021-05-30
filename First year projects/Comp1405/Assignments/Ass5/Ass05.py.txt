#Assignment 05 by Alex Breeze
#gets level from file as list of strings
def readLevel(n):
	x=f'ascii_levels/ascii_level{n}.txt' #sets up file name
	try:
		file=open(x,'r')
		list=file.readlines()
		file.close()
		for x in range (len(list)):
			list[x]=list[x].strip()	#removes /n
		return list
	except:
		return -1

#displays the current level to the player
def displayBoard(list):
	line='   '
	for i in range (1,len(list[0])+1):
		line+=str(i%10)#makes first line, displaying column numbers
	print (line)
	for y in range (1,len(list)+1):
		if y<10:
			line='0'+str(y%10)+' '
		else:	#for row numbers does 0# or ##
			line=str(y)+' '
		for x in range (len(list[0])):
			line=str(line)+list[y-1][x]
		print(line)

#gets the x-cord, y-cord and symbol to change to
def getUserAction(x,y):
	moveset=[-1,-1,-1]
	while moveset[0]!='@' and moveset[0]!='#' and moveset[0]!='%' and moveset[0]!='&':
		moveset[0]=input('Enter a symbol: ')
	while moveset[1]<1 or moveset[1]>y:
		try:
			moveset[1]=int(input('Select a row: '))
		except:
			x=1
	while moveset[2]<1 or moveset[2]>x:
		try:
			moveset[2]=int(input('Select a column: '))
		except:
			x=1
	moveset[1]-=1
	moveset[2]-=1#changes cords to fit list starting at 0
	return moveset

#recursive fill function to execute player move
def fill(list,target,symbol,y,x):
	list[y]=list[y][:x]+symbol+list[y][x+1:] #changes character in string
	if x>0 and list[y][x-1]==target:#checks if space next to it exists and needs changing
		fill(list,target,symbol,y,x-1)
	if x<len(list[0])-1 and list[y][x+1]==target:
			fill(list,target,symbol,y,x+1)
	if y>0 and list[y-1][x]==target:
		fill(list,target,symbol,y-1,x)
	if y<len(list)-1 and list[y+1][x]==target:
			fill(list,target,symbol,y+1,x)

#Checks if all symbols on game board are the same
def levelSolved(list):
	symbol=list[0][0]
	for y in range(len(list)):
		for x in range (len(list[0])):
			if list[y][x]!=symbol:
				return False
	return True

#main, runs game
def main():
	level=1
	totalmoves=0
	while level<=5:#runs all 5 levels
		moves=0
		list=readLevel(level)#gets level board
		if list==-1:
			print(f'Error reading level {level}, Closing game.')
		while levelSolved(list)==False: #plays a round
			displayBoard(list)#displays board
			action=getUserAction(len(list[0]),len(list))#gets the players move using the size of the board
			if list[action[1]][action[2]]!=action[0]:#while user is not changing symbol to same symbol(recursive error)
				fill(list,list[action[1]][action[2]],action[0],action[1],action[2])#calls recursive fill
			moves+=1
		level+=1
		print(f'Moves: {moves}')
		totalmoves+=moves #moves is 1 game, totalmoves is for all 5 games
	print('Game won!')
	print(f'Total moves = {totalmoves}')

gameOn='yes'
while gameOn=='yes': #allows game to be replayed
	main()
	gameOn=input("Would you like to play again? 'yes'/'no'")