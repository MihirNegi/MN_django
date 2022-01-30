# %%
# import sys
import matplotlib
import librosa, librosa.display
import matplotlib.pyplot as plt
import numpy as np

# %%
def waveform():
    audio_file="small_speech.wav"
    x,sr=librosa.load(audio_file, sr=22050)    # This returns an audio time series as a numpy array with
                                           # a default sampling rate(sr) of 22KHZ mono. 'x' is audio time series. The sample rate
                                           # is the number of samples of audio carried per second, measured in Hz or kHz.

    print(type(x),type(sr))                    # o/p-> <class 'numpy.ndarray'> <class 'int'>

    print(x.shape,sr)                          # o/p-> (235200,) 22050

    return librosa.display.waveplot(x, sr=sr)

# %%
fig=waveform()

# %%
def spectrogram1(audio_file="small_speech.wav"):
    y,sr=librosa.load(audio_file, sr=22050)

    D = librosa.stft(y)  # STFT of y
    spectrogram1 = librosa.amplitude_to_db(np.abs(D))

    log_spectrogram1 = librosa.amplitude_to_db(spectrogram1)

    fig, ax = plt.subplots()
    img = librosa.display.specshow(log_spectrogram1, x_axis='time', y_axis='linear',ax=ax)
    ax.set(title='Spectrogram')
    fig.colorbar(img, ax=ax, format="%+2.f dB")

# %%
f = spectrogram1()

%%
#
# from browser import document
#
# def echo(*args):
#     print("Hello {}!".format(document["zone"].value))
#
# document["test"].bind("click", echo)
