from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import json
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/output", methods=["POST"]) 
def output():
    if request.method == "POST":
        theme = request.form["theme"]
        grade = request.form["grade"]
        question = f'maak 10 verhaaltjessommen voor {grade} met {theme} termen. Doe vragen met breuken, procenten, verhoudingen, optellen, aftrekken, vermenigvuldigen en delen. Met antwoorden en uitleg in een JSON structuur als volgt '
        format = '{\"questions\":[{\"id\":1,\"context\":\"Context for question 1.\",\"question\":\"Question 1?\",\"correct_answer\":\"Answer 1\",\"explanation\":\"Explanation for answer 1.\"}'

        client = OpenAI()

        response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={ "type": "json_object" },
        messages=[
            {f"role": "system", "content": "je bent een basisschoolmeester die opdrachten maakt in JSON format"},
            {f"role": "user", "content": question + format}
        ]
        )
        
        message_content = response.choices[0].message.content
        message_json = json.loads(message_content)
    return render_template("request.html", message_json=message_json)

@app.route("/result", methods=["GET", "POST"])
def result():
    return render_template("result.html" )

# @app.route("/") #testing case 
# def output():
#     with open('sample.json') as f:
#         message_json = json.load(f)
#     return render_template("request.html", message_json=message_json)

if __name__ == '__main__':
    app.run