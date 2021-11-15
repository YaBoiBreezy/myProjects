forced alignment prototype project by Alexander Breeze

This is the backend of the website, where the data.jsonp file is generated.
data.jsonp can then be copied into frontend to be used by the website

this project uses the lowerquality/gentle forced alignment software to create a database of transcript words and their position in a given video 
(in this case an .mp3 downloaded using an .m3u8 link), allowing users to search for key words and find their position in the video

To use:

1. download docker desktop and set it up

2. acquire audio and a corresponding transcript

3. in cmd, run  docker run -p 8765:8765 lowerquality/gentle
note: the 8765/8765 is important. It is not mentioned in the gentle github. Without it gentle will run in a random localhost port, and you will need to 
alter the url in gentleInterface.py to account for this. open docker desktop to see which port the container is running in

4. place the audio and transcript in the 'backend' folder
note: I only tested it with .txt transcripts, which were obtained by the extremely complicated process known as "ctrl+a, ctrl+c, ctrl+v"
note: audio must be either a "small" audio-only file (e.g. mp3) or an .mp4, which will be converted to .mp3 BEFORE running gentle
If gentle is run with a large video file (gigabytes), it crashes after a few minutes due to firewall stuff

5. in cmd, navigate to the backend folder and do  python gentleInterface.py, or python gentleInterfaceMulti.py for processing multiple streams sequentially
note: you may need to install python
note: you may need to do "pip install <whatever it says it needs>"   e.x. pip install requests
note: this may run for a long time, as in 100+% the length of the audio file

6. When it finishes, you will get some streamNameRAW.json and one data.jsonp, as well as an updated database.json
streamNameRAW.json is what gentle outputs. Careful, some words are capitalised. This is fixed when the data is parsed by the python script.
database.json is a collection of all important data from every run of the script. It contains a dictionary of every word it has seen, the URL's for each stream, 
the transcript for each stream and a dictionary of every word in each stream, with a list of its occurrence positions in the transcript and video.
data.jsonp is the same as database.json, but starting with "data=" and filename ending with "p". It can be removed from backend and placed in frontend to apply
the new video data to the website.

7. move data.jsonp to the frontend folder, replacing the one that is already there, then refresh the webpage to load the new data file and access the new data

Running resetDatabase.py empties the database and reinitialises ti with a base dataset so data can be added to it in the future
If you want the database back, copy in the contents of data.jsonp, removing the beginning "data=". data.jsonp is a near-exact copy of database.json

======================================================================================================================================================================

ERROR HANDLING:
No connection could be made because the target machine actively refused it
Docker sometimes stop running when server/pc is restarted. Open docker desktop, containers/apps, and click play on the 8765 port.

requests.exceptions.ConnectionError: ('Connection aborted.', RemoteDisconnected('Remote end closed connection without response'))
Gentle was run with files that were too large, such as a 5.5 gb .mp4, so the firewall stopped the connection. Try running with smaller files, such as .mp3

======================================================================================================================================================================

For a more advanced version of this project, all this should be saved in a formal database and searched with calls containing the user search term via http arguments
Video and Audio are offset in the .m3u8 links obtained from ourcommons.ca. Worse yet, each one has a different offset. Currently the offsets are hardcoded in the
frontend logic.js (look for audioOffset). If the core cause cannot be isolated, the correct offset for each stream should be added to the database, just like the
'name' value, and read in logic.js when the video is loaded.

data.jsonp stores data in the following format:    ( []=list, {}=dictionary/hashmap )  ( database.json is the same, but no data= so you can load it in python not js )
Each stream has 6 links for various languages and such. Words can occur multiple times, so in data each word is a key with a list of all its occurences
data = database = {
	'streams' : [
		{
			'name' = "...",
			'links' = {'vidNo': ...,'vidEng': ..., ...},
			'transcript' = "...",
			'data' = {
				'word' : [
					{
						'startTime' : ...,
						'startText' : ...
					},
					...
				],
				...
			}
		},
		...
	],
	'dictionary' : {
		'word' : True,
		'word2' : True,
		...
	}
}

Another way of looking at it:

data = {'streams':[],'dictionary':{}}
'streams':[stream1,stream2,...]
stream1 = {'name':"blah",'links':{},'transcript':"blah",'data':{}}
'links':{'vidNo':vidNo,'vidEng':vidEng,'vidFre':vidFre,'audFlo':audFlo,'audEng':audEng,'audFre':audFre}
'data':{'word':[],'word':[],...}
'word':[wordPos,wordPos,...]
wordPos = {'startTime':...,'startText':...}
'dictionary':{'word':None,'word':None,...}

Note that startTime is when the word is said in the video, startText is the position of the first character of the word in the transcript
Note that the dictionary is used for recommending searches to the user

I prevent multiple database entries of the same stream by comparing transcript strings. It is not perfect, but hopefully good enough
Frontend loads videos based on the given URL's. If they are not correct .m3u8's, it will probably not work
