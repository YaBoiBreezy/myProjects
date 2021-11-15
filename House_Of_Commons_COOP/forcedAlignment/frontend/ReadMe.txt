Proof of concept for proposed forced alignment initiative for parliamentary media
Created by Alexander Breeze, COOP student working for David Turner in HoC MMS
Started 2021-Nov-1
Finished 2021-Nov-10-ish

NOTE: this requires node_modules. do:
npm init
npm install --save @videojs/http-streaming
npm install --save videojs-contrib-quality-levels
npm install --save videojs-contrib-hls

Includes:
Assets 						folder of pictures
node_modules					lots of useless stuff, a couple important plugins (video.js) for the M3U8 streaming with custom quality selection
ClickToOpen.html				html doc, click to open site
Colours.css					aesthetic elements, resize handlers
data.jsonp					dataset of words in transcripts relative to videos, used by website to get results for user
developerNotes.txt				important stuff for using this code in the official site
Logic.js					code for video/audio players
package-lock.json				probably not needed
ReadMe.txt					this
vidClickLight.css				video player css for pc lightbox/fullscreen
vieojs-http-streaming.js			probably not needed
vidTouchLight.css				video player css for touchscreen lightbox/fullscreen

see DeveloperNotes.txt for more info
