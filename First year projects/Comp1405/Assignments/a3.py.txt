#1-player blackjack by Alex Breeze
#Assignment 3 for comp1405

import random

#Gets sum of hand
def sumHand(hand):
	sum=0
	for i in hand:
		sum+=getRank(i)	#basic sum function
	temphand=list.copy(hand)	#Makes copy of hand
	while sum>21 and 1 in temphand:
		sum-=10	#ace rule, removes aces (converting 11 to 1) until none left or sum<21
		temphand.remove(1)
	return sum

#Prepares player hand and sum of cards for being displayed
def displayHand(hand):
	output='Your hand: '
	for i in hand:
		if i==1:
			output+='A '
		elif i<11:
			output+=str(i)+' '
		elif i==11:
			output+='J '
		elif i==12:
			output+='Q '
		else:
			output+='K '
	output+=' ('+str(sumHand(hand))+')'
	return output

#Gets a new card
def dealCard():
	card=random.randint(1,13)
	return card

#Getys the value of a card
def getRank(x):
	if x==1: #ace
		return 11
	elif x<11:	#if not a face card or ace
		return x
	else:		#face card
		return 10

#gets input, keeps trying for valid input
def getInput():
	uinput=''
	while uinput!='hit' and uinput!='stand':
		uinput=input("Would you like to 'hit' or 'stand': ")
	return uinput

#Simple ranking system for end of game
def getRankOfPlayer(score):
	if score>=95:
		return 'Ace!'
	elif score>=85:
		return 'King'
	elif score>=75:
		return 'Queen'
	elif score>=50:
		return 'Jack'
	elif score>=25:
		return 'Commoner'
	else:
		return 'Noob'

#Main function that runs the game
def main():
	score=100
	for i in range (5): #5 rounds
		hand=[]
		input=''	#reset stuff
		print(f'Round {i+1}')
		print(f'Score: {score}')
		hand.append(dealCard())	#deal 2 cards
		hand.append(dealCard())
		while input!='stand' and sumHand(hand)<=21: #run round
			print(displayHand(hand))
			input=getInput()
			if input=='hit':	#shows hand, gives cards
				hand.append(dealCard())
		if sumHand(hand)<=21:
			score=score-21+sumHand(hand)
		else:	#score change after hand, bust message too
			print(displayHand(hand))
			print('BUST!')
			score-=21
		print('\n\n')
	#Prints final score + rank of player
	print(f'Final score: {score}, Your rank: '+getRankOfPlayer(score))

main()