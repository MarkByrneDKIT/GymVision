import cv2
import mediapipe as mp
import numpy as np
import threading
import math as m
import time
import matplotlib.pyplot as plt
import secrets
from flask import Flask
from flask_restful import Api, Resource
import csv
from pymongo import MongoClient
import gridfs
from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory, PNOperationType
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import json

app = Flask(__name__)
api = Api(app)

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

pnconfig = PNConfiguration()
pnconfig.subscribe_key = "sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36"
pnconfig.publish_key = "pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80"
pnconfig.uuid = 'liamdenningsetstats'
pubnub = PubNub(pnconfig)

my_channel = 'Setstats'

state = True
end = False
rep = 0 
set = 0
tilt = None
message = None
images=[]
connection = MongoClient('mongodb+srv://SetStatsAdmin:SetStats123@cluster0.cgmbyt4.mongodb.net/?retryWrites=true&w=majority')
LshoulderSideArray = ["Left Shoulder"]
RshoulderSideArray = ["Right Shoulder"]
LKneeSideArray = ["Left Knee"]
LfootSideArray = ["Left Foot"]

LshoulderArray = ["Left Shoulder"]
RshoulderArray = ["Right Shoulder"]
LKneeArray = ["Left Knee"]
LfootArray = ["Left Foot"]
repArray = ["Rep"]
setArray = ["Set"]
tiltArray = ["Tilt"]

def write_front_to_csv(LshoulderArray, RshoulderArray ,LKneeArray, LfootArray, repArray, setArray, tiltArray):
    with open("FrontCam.csv", 'w') as file:     # a = append    w = write
        writer = csv.writer(file)
        writer.writerow(repArray)
        writer.writerow(setArray)
        writer.writerow(tiltArray)
        writer.writerow(LshoulderArray)
        writer.writerow(RshoulderArray)
        writer.writerow(LKneeArray)
        writer.writerow(LfootArray)


def write_side_to_csv(LshoulderSideArray, RshoulderSideArray ,LKneeSideArray, LfootSideArray, repArray, setArray):
    with open("SideCam.csv", 'w') as file:     # a = append    w = write
        writer = csv.writer(file)
        writer.writerow(repArray)
        writer.writerow(setArray)
        writer.writerow(LshoulderSideArray)
        writer.writerow(RshoulderSideArray)
        writer.writerow(LKneeSideArray)
        writer.writerow(LfootSideArray)


def checkForm(l_shoulder, l_knee, r_shoulder, l_foot, image):
    global tilt
    if l_shoulder[0] > (l_knee[0] + 20):
        s_message = "<--"
        s_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)

    elif l_shoulder[0] < (l_knee[0] - 20):
        s_message = "-->"
        s_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        s_message = 'Perfect'
        s_colour = (0,255,0)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    if l_knee[0] > (l_foot[0] + 40):
        k_message = "<--"
        k_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    elif l_knee[0] < (l_foot[0] - 40):
        k_message = "-->"
        k_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        k_message = "Perfect"
        k_colour = (0,255,0)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    return s_message, k_message, tilt, s_colour, k_colour

def checkTilt(l_shoulder, r_shoulder):
    l_tilt = (l_shoulder[1] + (l_shoulder[1] * .10))
    r_tilt = (r_shoulder[1] + (r_shoulder[1] * .10))

    if l_shoulder[1] > r_tilt:
        message = "\\"   
    elif r_shoulder[1] > l_tilt:
        message = "/"
    else:
        message = "---"
    return message

def findAngle(x1, y1, x2, y2):
    theta = m.acos( (y2-y1)*(-y1) / (m.sqrt(
        (x2 - x1)**2 + (y2-y1)**2) *y1))
    degree = int(180/m.pi)*theta
    return degree

def calculateAngle(a,b,c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)

    if angle > 180.0:
        angle = 360 - angle
    
    return angle

def sendImages(images):
    global connection 
    database = connection['images']

    fs = gridfs.GridFS(database)

    for image in images:
        with open(image, 'rb') as f:
            contents = f.read()

        fs.put(contents, filename=image)

def side_cam():
    badFormTimer = 0
    global images,state,end

    while state == True:
        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
            while cap.isOpened() :
                
                ret, image = cap.read()
                h, w = image.shape[:2]
                image = cv2.flip(image,1)
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
                results = pose.process(image)
                image.flags.writeable = True
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

                try:
                    global rep, set, message
                    landmarks = results.pose_landmarks.landmark

                    l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                    r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                    l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                    l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))

                    LshoulderSideArray.append(l_shoulder)
                    LKneeSideArray.append(l_knee)
                    LfootSideArray.append(l_foot)
                    RshoulderSideArray.append(r_shoulder)
                    repArray.append(rep)
                    setArray.append(set)

                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                        mp_drawing.DrawingSpec(color=(185,191,184), thickness=1, circle_radius=4),
                        mp_drawing.DrawingSpec(color=(255,255,255), thickness=2, circle_radius=2)
                    )

                    cv2.line(image, (l_foot[0] +40, 0), (l_foot[0] +40, 640), (0, 150, 0), 1)
                    cv2.line(image, (l_foot[0] -40, 0), (l_foot[0] -40, 640), (0, 150, 0), 1)

                    cv2.rectangle(image, (0,0), (300,55), (245, 117,16), -1)  

                    s_message, k_message, tilt, s_colour, k_colour = checkForm(l_shoulder, l_knee, r_shoulder, l_foot, image)

                    if s_message != "Good" and k_message != "Good":
                        badFormTimer+=1
                    else:
                        badFormTimer=0

                    cv2.putText(image, str(s_message), (10,25), cv2.FONT_HERSHEY_SIMPLEX, 1, s_colour, 2, cv2.LINE_AA)
                    cv2.putText(image, str(k_message), (10,50), cv2.FONT_HERSHEY_SIMPLEX, 1, k_colour, 2, cv2.LINE_AA)

                    if badFormTimer == 70:
                        errorImage = secrets.token_hex(9)
                        cv2.imwrite(f"{errorImage}.jpg", image)
                        file=(f"{errorImage}.jpg")
                        images.append(file)
                        

                    message = {
                        'Rep': rep,
                        'Set': set, 
                        'Feedback': {'Shoulder': s_message, 'Knee': k_message, 'Tilt': tilt}
                    }

                except:
                    pass

                if state == True:
                    cv2.imshow('Side cam', image)
                else:
                    cv2.rectangle(image, (0,0), (1000,1000), (0, 0,0),-1) 

                if cv2.waitKey(1) & 0xFF == ord('q') or end == True:
                    #write_side_to_csv(LshoulderSideArray, RshoulderSideArray ,LKneeSideArray, LfootSideArray, repArray, setArray)
                    break

def front_cam():
    direction = None
    x = []
    y = []
    global state,end

    while state == True:
        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
            startTime = time.time()
            while cap2.isOpened():
                ret, image = cap2.read()
                h, w = image.shape[:2]
                image = cv2.flip(image,1)
                image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
                results = pose.process(image)
                image.flags.writeable = True
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

                elapsed_time = round(time.time() - startTime, 2)

                try:
                    global rep, set, tilt, images
                    landmarks = results.pose_landmarks.landmark

                    l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                    r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                    l_hip = (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h))
                    l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                    l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))
                    
                    LshoulderArray.append(l_shoulder)
                    LKneeArray.append(l_knee)
                    LfootArray.append(l_foot)
                    RshoulderArray.append(r_shoulder)
                    repArray.append(rep)
                    setArray.append(set)

                    tilt= checkTilt(l_shoulder, r_shoulder)
                    if tilt == "\\":
                        if counter != 30:
                            counter+= 2
                        cv2.circle(image, l_shoulder, (10+counter), (0,0,255), -1)
                    elif tilt == "/":
                        if counter != 30:
                            counter+= 2
                        
                        cv2.circle(image, r_shoulder, (10+counter), (0,0,255), -1)
                    else:
                        counter = 0
                    angle = calculateAngle(l_hip, l_knee, l_foot)   

                    tiltArray.append(tilt)

                    cv2.putText(image, str(angle),
                                    tuple(np.multiply(l_knee, [640, 480]).astype(int)),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA
                                        )

                    x.append(elapsed_time)
                    y.append(-(l_hip[1])+1)

                    if angle > 160:
                        direction = "down"
                    if angle < 100 and direction == "down":
                        direction="up"
                        rep+=1

                    if rep == 12:
                        rep = 0
                        plt.xlabel('Time (Secs)')
                        plt.ylabel('Height (Pixels)')
                        plt.plot(x, y)
                        graph = secrets.token_hex(8)
                        plt.savefig(f'{graph}.jpg')
                        file=(f'{graph}.jpg')
                        x = []
                        y = []
                        set += 1 
                        images.append(file)

                except:
                    pass

                cv2.rectangle(image, (0,0), (150,70), (245, 117,16),-1)     
                cv2.putText(image, (f"Set: {set}"), (10,25), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)   
                cv2.putText(image, (f"Rep: {rep}"), (10,60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)   
                

                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color=(29,162,7), thickness=2, circle_radius=4),
                                mp_drawing.DrawingSpec(color=(185,191,184), thickness=2, circle_radius=2)
                )   

                if state == True:
                    cv2.imshow('Front cam', image)
                else:
                    cv2.rectangle(image, (0,0), (1000,1000), (0, 0,0),-1) 
                    

                if cv2.waitKey(1) & 0xFF == ord('q') or end == True:
                    #write_front_to_csv(LshoulderArray, RshoulderArray ,LKneeArray, LfootArray, repArray, setArray, tiltArray)
                    break

cap = cv2.VideoCapture(0)
cap2 = cv2.VideoCapture(1)

class PublishData(Resource):
    global message
    def get(self):
        return message

def start_server():
    pubnub.add_listener(MySubscribeCallback())
    pubnub.subscribe().channels(my_channel).execute()
    app.run()
    
def main():
    global images
    run_event = threading.Event()
    run_event.set()
    api.add_resource(PublishData, "/")
    server = threading.Thread(target=start_server)
    server.setDaemon(True)
    server.start()
    sideCam = threading.Thread(target=side_cam)
    frontCam = threading.Thread(target=front_cam)
    sideCam.start()
    frontCam.start()
    
    try: 
        while 1:
            time.sleep(.1)
    except KeyboardInterrupt:
        print("Attempting to close threads.")
        run_event.clear()     
        sideCam.join()
        frontCam.join()  
        print("Threads successfully closed.")
        if len(images) != 0:
            print("Sending images to database (This may take some time)")
            sendImages(images)
            print("All images have been successfully sent")    
        cv2.destroyAllWindows()
        exit()

def publish(channel, msg):
    pubnub.publish().channel(channel).message(msg).pn_async(my_publish_callback)

def my_publish_callback(envelope, status):
    if not status.is_error():
        pass
    else:
        pass

class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass

    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass 
        elif status.category == PNStatusCategory.PNConnectedCategory:
            pubnub.publish().channel(my_channel).message('Starting...').pn_async(my_publish_callback)
        elif status.category == PNStatusCategory.PNReconnectedCategory:
            pass
        elif status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass

    def message(self, pubnub, message):
        try:
            msg = message.message
            print(msg)
            key = list(msg.keys())
            if key[0] == 'status':
                self.handle_event(msg)
        except Exception as e:
            print(message.message)
            print("-=Error=-", e)
            pass

    def handle_event(self, msg):
        global state,end
        key = list(msg.keys())
        value = list(msg.values())
        if key[0] == 'status':
            if value[0] == 'on':
                print("Starting data collection")
                state = True
            elif value[0] == 'off':
                print("Stopping data collection")
                state = False
            elif value[0] == 'end':
                print("Ending session")
                end = True

if __name__ == "__main__":  
    main()