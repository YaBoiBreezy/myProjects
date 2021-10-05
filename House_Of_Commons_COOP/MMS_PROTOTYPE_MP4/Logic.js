var videoPlayer, vid, seekSlider, playPause, skipB, skipF, volBtn, volSlider, volume, curTimeText, durTimeText, fullScreen, videoAudio, audioOnly;

function initializePlayer(){
	videoPlayer=document.getElementById("videoPlayer");
	vid = document.getElementById("mainStream");
	playBtn = document.getElementById("playPauseButton");
	skipB = document.getElementById("skipB");
	skipF = document.getElementById("skipF");
	seekSlider = document.getElementById("seekSlider");
	curTimeText = document.getElementById("curTimeText");
	durTimeText = document.getElementById("durTimeText");
	volBtn = document.getElementById("volume");
	volSlider = document.getElementById("volSlider");
	fullScreen = document.getElementById("fullScreen");
	videoAudio = document.getElementById("videoAudio");
	audioOnly = document.getElementById("audioOnly");

	seekSlider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seekTimeUpdate,false);
	playBtn.addEventListener("click",playPause,false);
	skipB.addEventListener("click",skipB10,false);
	skipF.addEventListener("click",skipF10,false);
	volBtn.addEventListener("click",muteVid,false);
	
	volBtn.addEventListener("mouseover",showVolSlider,false);
	volPopupHandler.addEventListener("mouseover",showVolSlider,false);
	volSlider.addEventListener("mouseover",showVolSlider,false);
	volBtn.addEventListener("mouseout",hideVolSlider,false);
	volPopupHandler.addEventListener("mouseout",hideVolSlider,false);
	volSlider.addEventListener("mouseout",hideVolSlider,false);
	
	volSlider.addEventListener("change",changeVolume,false);
	fullScreen.addEventListener("click",fullToggle,false);
	document.addEventListener("fullscreenchange",editFullIcon,false);
	videoAudio.addEventListener("click",vidAud,false);
}
window.onload = initializePlayer;

function vidSeek(){
	vid.currentTime = vid.duration*(seekSlider.value/1000);
	seekTimeUpdate();
}

function seekTimeUpdate(){
	seekSlider.value = vid.currentTime*(1000/vid.duration);
	changeVolume();
	
	var curHours = formatDigit(Math.floor(vid.currentTime/3600));
	var curMins = formatDigit(Math.floor((vid.currentTime/60)%60));
	var curSecs = formatDigit(Math.floor(vid.currentTime%60));
	var durHours = formatDigit(Math.floor(vid.duration/3600));
	var durMins = formatDigit(Math.floor((vid.duration/60)%60));
	var durSecs = formatDigit(Math.floor(vid.duration%60));
	
	curTimeText.innerHTML = curHours+":"+curMins+":"+curSecs;
	durTimeText.innerHTML = durHours+":"+durMins+":"+durSecs;
}

function formatDigit(digit){
	if(digit<10){
		if(digit==0){
			digit="00";
		} else {
			digit="0"+digit;
		}
	}
	return digit;
}

function playPause(){
	if(vid.paused){
		vid.play();
		playBtn.src = "Assets/pause.png";
	}
	else{
		vid.pause();
		playBtn.src = "Assets/play.png";
	}
}

function skipB10(){
	vid.currentTime = vid.currentTime-10;
	seekTimeUpdate();
}

function skipF10(){
	vid.currentTime = vid.currentTime+10;
	seekTimeUpdate();
}

function muteVid(){
	if(vid.muted){
		vid.muted = false;
		volBtn.src = "Assets/soundNone.png";
		volSlider.value = volume;
	}
	else{
		vid.muted = true;
		volBtn.src = "Assets/soundMute.png";
		volume = volSlider.value;
		volSlider.value = 0;
	}
}

function showVolSlider(){
	volSlider.style.display = "initial";
	volPopupHandler.style.display = "initial";
	document.getElementById("timeNum").style.left = "245px";
}
function hideVolSlider(){
	volSlider.style.display = "none";
	volPopupHandler.style.display = "none";
	document.getElementById("timeNum").style.left = "140px";
}

function changeVolume(){
	vid.volume = volSlider.value/100;
	vid.muted=false;
	if(volSlider.value==0){
		volBtn.src = "Assets/soundMute.png";
		vid.muted=true;
	}
	else if(volSlider.value<33){
		volBtn.src = "Assets/soundLow.png";
	}
	else if(volSlider.value<66){
		volBtn.src = "Assets/soundMed.png";
	}
	else{
		volBtn.src = "Assets/soundHigh.png";
	}
}

function fullToggle(){
	if(document.fullscreenElement){
		if (document.exitFullscreen) {
    			document.exitFullscreen();
  		} else if (document.webkitExitFullscreen) { /* Safari */
    			document.webkitExitFullscreen();
  		} else if (document.msExitFullscreen) { /* IE11 */
    			document.msExitFullscreen();
  		}
	}
	else {
		if (videoPlayer.requestFullscreen) {
			videoPlayer.requestFullscreen();
		} else if (videoPlayer.webkitRequestFullscreen) { /* Safari */
			videoPlayer.webkitRequestFullscreen();
		} else if (videoPlayer.msRequestFullscreen) { /* IE11 */
			videoPlayer.msRequestFullscreen();
		}
	}
}

function editFullIcon(){//to change icon even if user uses esc to exit fullscreen
	if(document.fullscreenElement){
		fullScreen.src = "Assets/fullscreenN.png";
	}
	else {
		fullScreen.src = "Assets/fullscreenY.png";
	}
}

function vidAud(){
	if(vid.style.visibility=="visible"){
		vid.style.visibility="hidden";
		audioOnly.style.visibility="visible";
		videoAudio.src="Assets/audioOnly.png";
	}
	else{
		vid.style.visibility="visible";
		audioOnly.style.visibility="hidden";
		videoAudio.src="Assets/videoOnly.png";
	}
}