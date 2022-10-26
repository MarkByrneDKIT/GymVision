from flask import *
import json, time

app = Flask(__name__)

@app.route('/', methods=['GET'])
def test():
    data={'Page': 'Home', 'Message': 'Success', 'Timestamp': time.time()}
    json_dump = json.dumps(data)

    return json_dump

if __name__ == '__main__':
    app.run(port=7777)