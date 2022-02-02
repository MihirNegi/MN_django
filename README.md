# Final Year Project #

## Working of the site for the user ##
Play the audio using the SELECT button on the left hand side.<br />
Listen to the audio. <br />
On the right hand side, press the START button to start your part.<br />
Press the RECORD button to record your voice. <br />
You could you the PLAY button to hear your recorded voice.<br />
You then press the SEND button to send the audio for processing.<br />
After processing you get the AUDIO WAVEFORM and SPECTROGRAM of your recorded audio on the site. <br />

## Working of the site on the backend ##
Audio is recorded using JavaScript’s WebRTC module in the .wav file format.<br />
Recorded audio is processed and plotted using Python libraries.<br />

## Problem ##
We are not able to take the recorded audio from JavaScript and give it as input to Python code.<br />

We also want get the Python output onto our HTML.<br />

Any solution using Django as well as Flask will do.<br />

