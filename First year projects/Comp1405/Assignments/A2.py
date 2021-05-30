#Assignment 2 by Alex Breeze
print('-'*40) #prints opening screen
print("| Welcome to Seb's Sub Shoppe! |")
print('-'*40 + '\n')
total=0
choice=0
subtype=''
toppings=''
#gets sub type
while choice<1 or choice>4:
	print('Please select your sub: (1-4)')
	print('1. Meat-ball sub ($7.99)')
	print('2. Cold-cut Club sub ($8.25)')
	print('3. Philly Cheese Steak ($9.55)')
	print('4. Veggie Trash ($6.75)')
	choice=int(input())
	if choice<1 or choice>4:
		print(f'Sorry, {choice} is not an option.')
	else:
		break
#adds sub type price to total
if choice==1:
	total += 7.99
	subtype='Meat-ball sub'
elif choice==2:
	total+=8.25
	subtype='Cold-cut Club sub'
elif choice==3:
	total+=9.55
	subtype='Philly Cheese Steak'
else:
	total+=6.75
	subtype='Veggie Trash'
#toppings menu
print('Please select your toppings:')
print('lettuce')
print('tomatoes')
print('onions')
print('peppers')
print('jalapenoes')
print('pickles')
print('cucumbers')
print('olives')
print('guacamole')
print("Press 'done' to stop")

while choice!='done':
	choice=input()
	if choice=='guacamole':
		total+=1.5
		toppings+=choice+' '
	elif choice=='lettuce' or choice=='tomatoes' or choice=='onions' or choice=='peppers' or choice=='jalapenoes' or choice=='pickles' or choice=='cucumbers' or choice=='olives':
		toppings+=choice+' '	
	elif choice!='done':
		print(f'Sorry, {choice} is not on the menu')
#prints customer's order
print('Your order:')
print(f'Sub: {subtype}')
print(f'Toppings: {toppings}')
choice=input('Is this correct? (y/n)')
if choice=='y':	#Prints price
	print('-'*20)
	print(f'Subtotal:      ${total}')
	print(f'Tax:           ${total*0.13:2.2f}')
	print('-'*20)
	print(f'Total:         ${total*1.13:2.2f}')
	print('-'*20)
	print('Goodbye')
else:
	print("I'm sorry, please try again.")