// // alert("HELLO");

document.querySelector(".play").addEventListener("click", function(){
    makeSound();
});

function makeSound(){
    var randomNumber = Math.floor(Math.random()*10) + 1;
    switch (randomNumber) {
        case 1:
            var hello = new Audio('static/sounds/hello.mp3');
            document.querySelector(".word-window").innerHTML = "HELLO";
            setTimeout(function(){hello.play();}, 500);
            break;
        case 2:
            var wow = new Audio('static/sounds/wow.mp3');
            document.querySelector(".word-window").innerHTML = "WOW";
            setTimeout(function(){wow.play();}, 500);
            break;
        case 3:
            var yes = new Audio('static/sounds/yes.mp3');
            document.querySelector(".word-window").innerHTML = "YES";
            setTimeout(function(){yes.play();}, 500);
            break;
        case 4:
            var happy = new Audio('static/sounds/happy.mp3');
            document.querySelector(".word-window").innerHTML = "HAPPY";
            setTimeout(function(){happy.play();}, 500);
            break;
        case 5:
            var handsome = new Audio('static/sounds/handsome.mp3');
            document.querySelector(".word-window").innerHTML = "HANDSOME";
            setTimeout(function(){handsome.play();}, 500);
            break;
        case 6:
            var gorgeous = new Audio('static/sounds/gorgeous.mp3');
            document.querySelector(".word-window").innerHTML = "GORGEOUS";
            setTimeout(function(){gorgeous.play();}, 500);
            break;
        case 7:
            var excellent = new Audio('static/sounds/excellent.mp3');
            document.querySelector(".word-window").innerHTML = "EXCELLENT";
            setTimeout(function(){excellent.play();}, 500);
            break;
        case 8:
            var example = new Audio('static/sounds/example.mp3');
            document.querySelector(".word-window").innerHTML = "EXAMPLE";
            setTimeout(function(){example.play();}, 500);
            break;
        case 9:
            var dangerous = new Audio('static/sounds/dangerous.mp3');
            document.querySelector(".word-window").innerHTML = "DANGEROUS";
            setTimeout(function(){dangerous.play();}, 500);
            break;
        case 10:
            var beautiful = new Audio('static/sounds/beautiful.mp3');
            document.querySelector(".word-window").innerHTML = "BEAUTIFUL";
            setTimeout(function(){beautiful.play();}, 500);
            break;
        default:
            break;
    }

}


'use strict';

/* globals MediaRecorder */

let mediaRecorder;   // reference to mediaRecorder
let recordedBlobs;   // reference to recorded data
//let stream

// Get references to all variables declared in HTML file
const MsgElement = document.querySelector('span#Msg');
const startButton = document.querySelector('button#start');
const stopButton = document.querySelector('button#stop');
const recordedAudio = document.querySelector('audio#recorded');
const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');

stopButton.addEventListener('click', () => {
	startButton.disabled = false;
	stopButton.disabled = true;
  recordButton.textContent = 'Record';
	recordButton.disabled = true;
  playButton.disabled = true;
  downloadButton.disabled = true;
	MsgElement.innerHTML = 'Microphone stopped succefully.';
});

recordButton.addEventListener('click', () => {
  if (recordButton.textContent === 'Record') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Record';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
});


playButton.addEventListener('click', () => {
  const superBuffer = new Blob(recordedBlobs, {type: 'audio/mp3'});
  recordedAudio.src = null;
  recordedAudio.srcObject = null;
  recordedAudio.src = window.URL.createObjectURL(superBuffer);
  recordedAudio.controls = true;
  recordedAudio.play();
});


downloadButton.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, {type: 'audio/wav'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recorded_clip.wav';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);

});

function handleDataAvailable(event) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function startRecording() {
  recordedBlobs = [];
  let options = {mimeType: 'audio/webm'};
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder:', e);
    MsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
    return;
  }

  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  stopButton.disabled = true;
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
    console.log('Recorded Blobs: ', recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log('MediaRecorder started', mediaRecorder);
  MsgElement.innerHTML = `Recording started.`;
}

function stopRecording() {
  mediaRecorder.stop();
  stopButton.disabled = false;
  MsgElement.innerHTML = `Recording stopped.`;
}

function handleSuccess(stream) {
  startButton.disabled = true;
  stopButton.disabled = false;
  recordButton.disabled = false;
  console.log('getUserMedia() got stream:', stream);
  window.stream = stream;
}

startButton.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    handleSuccess(stream);
	  MsgElement.innerHTML = 'Microphone detected succefully.';
  }
  catch (e) {
    console.error('navigator.getUserMedia error:', e);
    MsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
});
