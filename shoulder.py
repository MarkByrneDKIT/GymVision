import cv2
import mediapipe as mp
import numpy as np
from flask import Flask
import threading
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

rep = 0
set = 0
message = None

def start_server():
    app.run()

def calculate_angle(a,b,c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360 - angle
    
    return angle

def collect_data():
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose

    cap = cv2.VideoCapture(0)   

    global rep
    global message
    global set
    direction = None
    
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5 ) as pose:
        while cap.isOpened():
            
            success, image = cap.read()
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark
                shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                left_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]

                shoulder_pos = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
                
                angle = calculate_angle(shoulder, elbow, right_wrist)   

                if angle <= 160 and angle >= 150:
                    direction = "up"
                if angle < 90 and direction == "up":
                    direction="down"
                    rep+=1

                if rep == 12:
                    rep = 0
                    set+=1

                if left_wrist[1] > shoulder_pos - .025:
                    message = "TOO LOW"
                else:
                    message = "OK"
                
            except:
                pass

class PublishData(Resource):
    global rep
    global set
    global message
    def get(self):
        return{"Rep": rep, "Set": set, "Message": message}

api.add_resource(PublishData, "/")

server = threading.Thread(target=start_server)
collect = threading.Thread(target=collect_data)

if __name__ == "__main__":  
    collect.start()
    server.start()
