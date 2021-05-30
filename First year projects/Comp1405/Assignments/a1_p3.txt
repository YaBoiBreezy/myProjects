#Assignment 1 p3 by Alex Breeze
print('Please enter your grade on the following pieces of work:')

ass1=float(input('Assignment 1 (/18): '))
ass2=float(input('Assignment 1 (/22): '))
ass3=float(input('Assignment 1 (/15): '))#Get marks
ass4=float(input('Assignment 1 (/30): '))
mid=float(input('Assignment 1 (/35): '))
final=float(input('Assignment 1 (/50): '))

ass1/=18
ass2/=22	#Convert marks to %
ass3/=15
ass4/=30
mid/=35
final/=50

print('Your grades:')
print('-=====================-')
print(f'Assignment 1      {ass1*100:.2f}%')
print(f'Assignment 2      {ass2*100:.2f}%')
print(f'Assignment 3      {ass3*100:.2f}%')
print(f'Assignment 4      {ass4*100:.2f}%')
print(f'Mid               {mid*100:.2f}%')
print(f'Final             {final*100:.2f}%')
print('-=====================-')

ass1*=0.1
ass2*=0.1
ass3*=0.1	#Calc weighted grade
ass4*=0.1
mid*=0.25
final*=0.35

print(f'Your final grade is {(ass1+ass2+ass3+ass4+mid+final)*100:.2f}%.')