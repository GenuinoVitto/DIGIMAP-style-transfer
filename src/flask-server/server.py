from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/hello", methods=['POST'])
def hello():
    print("REQ: " + request.args.get('imgUrl'))
    return {"stringout":"hello world"}

if __name__ == "__main__":
    app.run(debug=True)