from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/hello")
def hello():
<<<<<<< Updated upstream
=======
    print("" + request.args.get('contentUrl'))
    print(request.args.get('styleUrl'))
>>>>>>> Stashed changes
    return {"stringout":"hello world"}

#

if __name__ == "__main__":
    app.run(debug=True)