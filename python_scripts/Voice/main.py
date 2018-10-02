import speech_recognition as sr
import pyaudio
import urllib.request
import urllib.parse
import re
import webbrowser
import requests
import json


p = pyaudio.PyAudio()

r = sr.Recognizer()
r.dynamic_energy_threshold = False
r.energy_threshold = 400

questions = [" ou ", " où ", " quand ", " pourquoi ", " c'est quoi ", "quelle", "qui est", "est-ce que", "qui", "comment"]
equations = ["x", "/", "+", "-"]


def listening():
    with sr.Microphone() as source:
        audio = r.listen(source)

    try:
        speech = r.recognize_google(audio, language="fr-CA")
        print(speech)
        verify(speech.lower())
    except sr.UnknownValueError:
        print("Je n'ai pas compris!")
    except sr.RequestError as e:
        print("La requête n'a pas pu être envoyer {0}".format(e))

    listening()


def verify(speech):
    good = 0

    # Checks if first word from command is Monsieur
    if speech.split(' ')[0] == "monseigneur" or speech.split(' ')[0] == "mon seigneur" or speech.split(' ')[0] == "seigneur":
        good = 1
        print(speech)
        tmp_json = {"say": "{}".format(speech)}
        tmp_json = json.dumps(tmp_json)
        print(tmp_json)
        r = requests.post("http://localhost:8080", data=tmp_json)
        r.close()

    # If the speech captured is a command (starts with : monsieur)
    if good == 1:
        for qWord in questions:
            if qWord in speech:
                query = speech.split(qWord, 1)[1]
                lmgtfy(qWord, query)
                break
        if "joue" in speech:
            query_string = urllib.parse.urlencode({"search_query": speech.split('joue')[1]})
            html_content = urllib.request.urlopen("http://www.youtube.com/results?" + query_string)
            search_results = re.findall(r'href=\"\/watch\?v=(.{11})', html_content.read().decode())
            webbrowser.open_new_tab("http://www.youtube.com/watch?v=" + search_results[0])
        for symbol in equations:
            if symbol in speech:
                it = 0
                for word in speech.split():
                    if word in symbol:
                        firstNum = speech.split(' ')[it-1]
                        secNum = speech.split(' ')[it + 1]
                        if symbol == "x":
                            result = int(firstNum) * int(secNum)
                            print(firstNum + " x " + secNum + " = " + str(result))
                        if symbol == "/":
                            result = int(firstNum) / int(secNum)
                            print(firstNum + " / " + secNum + " = " + str(result))
                        if symbol == "+":
                            result = int(firstNum) + int(secNum)
                            print(firstNum + " + " + secNum + " = " + str(result))
                        if symbol == "-":
                            result = int(firstNum) - int(secNum)
                            print(firstNum + " - " + secNum + " = " + str(result))
                    it += 1


def lmgtfy(qWord, query):
    template = "http://lmgtfy.com/?q="
    length = 1 + len(query)

    formatted = qWord

    for x in query.split():
        formatted = formatted + "+" + x

    webbrowser.open_new_tab(template + formatted)


listening()


