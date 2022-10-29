import cv2
import mediapipe as mp
import numpy as np
from flask import Flask
import threading, time, sys
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

count = 0

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

cap = cv2.VideoCapture(0)   

def collect_data():
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose
    
    direction = None
    message = None
 
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5 ) as pose:
        while cap.isOpened():
            success, im = cap.read()
            im = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
            im.flags.writeable = False
            results = pose.process(im)
            im.flags.writeable = True
            im = cv2.cvtColor(im, cv2.COLOR_RGB2BGR)

            try:
                global count
                landmarks = results.pose_landmarks.landmark

                shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
                # wrist_pos = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
                # shoulder_pos = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
                
                angle = calculate_angle(shoulder, elbow, wrist)   

                if angle <= 160 and angle >= 150:
                    direction = "up"
                if angle < 90 and direction == "up":
                    direction="down"
                    count+=1
                    print("captured:", count)
            except:
                pass

class PublishData(Resource):
    global count
    def get(self):
        print("published:", count)
        return{"Rep": count}

api.add_resource(PublishData, "/")
collect = threading.Thread(target=collect_data)
start = threading.Thread(target=start_server)

if __name__ == "__main__":  
    collect.start()
    start.start()
