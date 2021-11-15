forced alignment prototype project by Alexander Breeze

This project uses the lowerquality/gentle forced alignment software to create a database of transcript words and their position in a given video 
(in this case an .mp3 downloaded using an .m3u8 link), allowing users to search for key words and find their position in the video
This project uses video.js to display selected videos from .m3u8 links. Said links were downloaded using VLC into .mp3 for running in gentle

There are 2 parts:
backend: python scripts to run gentle on selected files. This updates the database and creates a data.jsonp that the website uses
frontend: website for user to search for terms, display results and load videos relative to results

Both parts have README.txt, containing more specific information

Please enjoy :)