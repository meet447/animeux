from flask import Flask, render_template ,json, request
import json
import requests

app = Flask(__name__)

@app.route("/")
def home():
    url = "https://api.consumet.org/anime/gogoanime/top-airing"
    response = requests.get(url, params={"page": 1})
    popular = response.json()

    url = "https://api.consumet.org/anime/gogoanime/recent-episodes"
    response1 = requests.get(url, params={"page": 1, "type": 1})
    recent = response1.json()
    
    url3 = "https://api.consumet.org/meta/anilist/random-anime"
    response3 = requests.get(url3)
    random = response3.json()
    
    return render_template("home.html", popular=popular, recent=recent, random=random)

@app.route("/<id>")
def anime(id):
    url = f"https://api.consumet.org/anime/gogoanime/info/{id}"
    response = requests.get(url)
    data = response.json()
    
    print(data)
    
    return render_template("anime.html", info=data)

@app.route('/search')
def search():
    query = request.args.get('query')
    url = f"https://api.consumet.org/anime/gogoanime/{query}"
    response = requests.get(url, params={"page": 1})
    data = response.json()
    return render_template("search.html", data=data)

@app.route('/watch/<id>-episode-<num>')
def watch(id, num):
    url = f"https://api.consumet.org/meta/anilist/watch/{id}-episode-{num}"
    response = requests.get(url)
    data = response.json()
    return render_template("watch.html", data=data)

app.run(host="0.0.0.0")
