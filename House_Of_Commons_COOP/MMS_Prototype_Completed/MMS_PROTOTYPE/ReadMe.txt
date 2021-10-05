This is the completed version, demonstrating the proposed changes to the ParlVu media player
It plays .M3U8 video and audio streams concurrently with completely custom controls using video.js
To see the mobile mode, open inspect element, toggle device emulation, and reload
For demonstration purposes there are 3 separate streams: english, french, default. Please keep both cc and audio on the same one, to avoid sync issues
NOTE: this requires node_modules. do:
npm init
npm install --save @videojs/http-streaming
npm install --save videojs-contrib-quality-levels
npm install --save videojs-contrib-hls

=================================================================================================

Proof of concept for proposed changes to ParlVU media player
Created by Alexander Breeze, COOP student working for David Turner in HoC MMS
four month project from Sept to Dec
Started 2021-Sep-10
Finished 2021-Oct-01

Includes:
Assets 						folder of pictures
node_modules					lots of useless stuff, a couple important plugins (video.js) for the M3U8 streaming with custom quality selection
ClickToOpen.html				html doc, click to open site
Colours.css					aesthetic elements, resize handlers
developerNotes.txt				important stuff for using this code in the official site
Logic.js					code for video/audio players
ReadMe.txt					this
vidClick.css					video player css for pc
vidTouch.css					video player css for phone/tablet

see DeveloperNotes.txt for more info
