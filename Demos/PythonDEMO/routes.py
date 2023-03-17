from flask import Flask, request, render_template, redirect
import requests, webbrowser

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = 'super secret'

def weatherSearch(name):
    URL = "https://api.openweathermap.org/data/2.5/weather?q="+name+"&APPID=9581e38eae9390c82ece6c4d09f43b8f&units=imperial"
    response = requests.get(URL)
    return response.json()

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/weatherSearch', methods=['GET','POST'])
def helper():
    try:
        cityName = request.form.get('city')
        result = weatherSearch(cityName)
        return render_template('home.html', weatherResponse=True, cityName=result.get("name"), temp=result.get("main").get("temp"), description=result.get("weather")[0].get("description"))
    except:
        return redirect('/')

if __name__ == "__main__":
    webbrowser.open_new('http://127.0.0.1:3003/')
    app.run(port=3003)