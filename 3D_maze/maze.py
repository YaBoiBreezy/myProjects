import keyboard
import msvcrt

def move(maze,x,y,z):
	move=msvcrt.getch()
	if bytes.decode(move)=='w' and maze[z][y-1][x]:
		y-=1
	if bytes.decode(move)=='s' and maze[z][y+1][x]:
		y+=1
	if bytes.decode(move)=='a' and maze[z][y][x-1]:
		x-=1
	if bytes.decode(move)=='d' and maze[z][y][x+1]:
		x+=1
	if bytes.decode(move)=='q' and maze[z-1][y][x]:
		z-=1
	if bytes.decode(move)=='e' and maze[z+1][y][x]:
		z+=1
	if bytes.decode(move)=='p':
		print("GAME PAUSED")
		print("DO YOU WISH TO QUIT?")
		print("Y    N")
		move=msvcrt.getch()
		if bytes.decode(move)=='Y' or bytes.decode(move)=='y':
			exit()
		
	return x,y,z

def render(maze,x,y,z):
	print('X: '+str(x)+' Y: '+str(y)+' Z: '+str(z))
	for Y in range(8):
		line=''
		for Z in range (z-1,z+2):
			for X in range(8):
				if not maze[Z][Y][X]:
					line+='\u2588'
				elif x==X and y==Y:
					if z==Z:
						line+=chr(2)
					else:
						line+=chr(1)
				elif maze[Z][Y][X]=='E':
					line+='X'
				elif maze[Z][Y][X]:
					line+=' '
			line+=' '
		print(line)

def main():
	x=1
	y=1
	z=3
	maze=[[[0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,1,0,0],
	       [0,1,1,1,0,1,0,0],
	       [0,1,0,1,0,1,0,0],
	       [0,1,0,1,0,0,0,0],
	       [0,1,0,1,0,1,1,0],
	       [0,1,0,1,0,1,1,0],
	       ['E',1,0,1,1,1,0,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,0,0,0,1,0,1,0],
	       [0,0,1,0,1,0,1,0],
	       [0,0,1,0,1,1,1,0],
	       [0,0,1,0,0,0,0,0],
	       [0,0,1,0,0,0,1,0],
	       [0,0,1,0,1,0,1,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,1,1,1,0,1,1,0],
	       [0,0,0,0,0,1,0,0],
	       [0,1,1,1,1,0,0,0],
	       [0,1,0,0,1,0,1,0],
	       [0,1,0,0,1,1,0,0],
	       [0,1,0,1,0,0,1,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,0,0,1,1,1,0,0],
	       [0,0,1,0,0,0,1,0],
	       [0,1,0,0,0,0,1,0],
	       [0,1,0,0,0,0,1,0],
	       [0,0,1,1,0,1,0,0],
	       [0,0,1,0,0,0,1,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,1,1,0,0,0,1,0],
	       [0,1,1,1,1,0,1,0],
	       [0,0,1,1,1,0,0,0],
	       [0,1,0,0,1,1,0,0],
	       [0,1,0,1,0,1,0,0],
	       [0,1,1,0,0,0,1,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,1,0,1,1,1,1,0],
	       [0,1,0,1,1,0,0,0],
	       [0,1,1,1,0,0,0,0],
	       [0,0,1,0,1,1,1,0],
	       [0,0,0,1,0,0,0,0],
	       [0,0,0,1,1,1,1,0],
	       [0,0,0,0,0,0,0,0]],
	      [[0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0],
	       [0,0,0,0,0,0,0,0]]]
	print("WELCOME TO THE MAZE")
	print("NOW WITH 3 DIMENSIONS!")
	print("RECOMMENDED: SHRINK YOUR CONSOLE TO THE HEIGHT OF THE MAZE")
	print("wasd to move\nq,e to hop up and down\np to pause/quit")
	print(chr(2)+"<--YOU")
	print(chr(1)+"<--OPEN SPACE DIRECTLY ABOVE/BELOW YOU")
	print("MIDDLE MAZE IS YOUR LEVEL, SIDE MAZES ARE ABOVE/BELOW YOU")
	while(x>0):
		render(maze,x,y,z)
		x,y,z=move(maze,x,y,z)
	print("YOU WIN")
	print(chr(1161)+" CONGRATULATIONS! "+chr(1161))
	print()

main()