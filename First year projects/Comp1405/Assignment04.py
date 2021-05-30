Assignment 04 by Alex Breeze

def readStats(file):
	list=[]
	start=0
	end=0
	listslot=0
	try:
		file=open(file,'r')
	except:
		return list
	line=file.readline()
	while file.readline()!='':
		line=file.readline()
		list.append([])
		end=0
		for i in range (11):
			start=end
			while line[end]!=',':
				end+=1
			list[listslot].append(start:end-1)
			end+=1
		listslot+=1
	file=close()
	return list

print(readStats(nhl_2018.csv))