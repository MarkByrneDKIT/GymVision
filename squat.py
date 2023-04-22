import cv2
import mediapipe as mp
import numpy as np
import threading
import math as m
import time
import matplotlib.pyplot as plt
from flask import Flask
from flask_restful import Api, Resource
from google.cloud import storage
from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory, PNOperationType
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import sys

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
set = 1
tilt = None

message = {
    'Lift Type': "Squat",
    'Rep': None,
    'Set': None, 
    'Feedback': {'Shoulder': None, 'Knee': None, 'Tilt': None},
    'Images': [],
    'Errors': None,
    'Set Length': None,
    'Session Length': None,
    'Weight': "100kg"
}

storage_client = storage.Client.from_service_account_json('gymvision-c352151a50b1.json')
bucket_name = 'gymvision-image-storage'

def time_convert(sec):
  mins = sec // 60
  sec = sec % 60
  hours = mins // 60
  mins = mins % 60
  return "{0}:{1}:{2}".format(int(hours),int(mins),round(sec,2))

def checkForm(l_shoulder, r_shoulder,  l_knee, r_knee, l_foot, r_foot, image):
    global tilt
    if l_foot[0] > (l_shoulder[0]+20) and r_foot[0] > (r_shoulder[0]+20):
        s_message = "<--"
        s_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)

    elif l_foot[0] < (l_shoulder[0]-20) and r_foot[0] < (r_shoulder[0]-20):
        s_message = "-->"
        s_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        s_message = 'Perfect'
        s_colour = (0,255,0)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    if l_foot[0] > (l_knee[0]+20) and r_foot[0] > (r_knee[0]+20):
        k_message = "<--"
        k_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    elif l_foot[0] < (l_knee[0]-20) and r_foot[0] < (r_knee[0]-20):
        k_message = "-->"
        k_colour = (0,0,255)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        k_message = "Perfect"
        k_colour = (0,255,0)
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    return s_message, k_message, tilt, s_colour, k_colour

def checkTilt(l_shoulder, r_shoulder):
    l_tilt = (l_shoulder[1] + (l_shoulder[1] * .025))
    r_tilt = (r_shoulder[1] + (r_shoulder[1] * .025))

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

def side_cam():
    badFormTimer = 0
    bucket_name = 'gymvision-image-storage'
    bucket = storage_client.get_bucket(bucket_name)
    errors = 0
    IMAGE_WIDTH = 480
    IMAGE_HEIGHT = 864
    global state, end, rep, set, message, username

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
        while cap.isOpened() :
            
            ret, image = cap.read()
            h, w = image.shape[:2]
            image = cv2.flip(image,1)
            image = cv2.resize(image, (IMAGE_HEIGHT, IMAGE_WIDTH))
            image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if state == True:
                try:
                    landmarks = results.pose_landmarks.landmark

                    l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                    r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                    l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                    l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))
                    r_knee = (int(landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y * h))
                    r_foot = (int(landmarks[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX.value].y * h))

                    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                        mp_drawing.DrawingSpec(color=(185,191,184), thickness=1, circle_radius=4),
                        mp_drawing.DrawingSpec(color=(255,255,255), thickness=2, circle_radius=2)
                    )

                    cv2.line(image, (l_foot[0] +20, 0), (l_foot[0] +20, 2000), (0, 150, 0), 1)
                    cv2.line(image, (l_foot[0] -20, 0), (l_foot[0] -20, 2000), (0, 150, 0), 1)

                    cv2.rectangle(image, (0,0), (300,55), (194, 101, 20), -1)  

                    s_message, k_message, tilt, s_colour, k_colour = checkForm(l_shoulder, r_shoulder, l_knee, r_knee, l_foot, r_foot, image)
                    
                    cv2.putText(image, str(s_message), (10,25), cv2.FONT_HERSHEY_SIMPLEX, 1, s_colour, 2, cv2.LINE_AA)
                    cv2.putText(image, str(k_message), (10,50), cv2.FONT_HERSHEY_SIMPLEX, 1, k_colour, 2, cv2.LINE_AA)

                    if s_message != "Perfect" and k_message != "Perfect":
                        badFormTimer+=1
                    else:
                        badFormTimer=0

                    if badFormTimer == 50:
                        errorImage = '{}-errorImage-{}.jpg'.format(username, time.time())
                        cv2.imwrite(f"{errorImage}", image)
                        print("Error image: " + errorImage + " has been created")
                        blob = bucket.blob(errorImage)
                        blob.upload_from_filename(errorImage)
                        message['Images'].append(errorImage)
                        errors+=1
                        
                    message["Set"] = set
                    message["Rep"] = rep
                    message["Feedback"] = {'Shoulder': s_message, 'Knee': k_message, 'Tilt': tilt}
                    message["Errors"] = errors

                except:
                    pass

                if state == True:
                    cv2.imshow('Side cam', image)

                if cv2.waitKey(1) & 0xFF == ord('q') or end == True:
                    break

def front_cam():
    direction = None
    x = []
    y = []
    global state, end, username, rep, set, tilt
    bucket_name = 'gymvision-image-storage'
    bucket = storage_client.get_bucket(bucket_name)
    prevDistanceDiff=0
    distanceDiff=0
    prevAngle=0
    angle=0
    totalTime=0
    IMAGE_WIDTH = 480
    IMAGE_HEIGHT = 864
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
        startTime = time.time()
        startSetTime = time.time()
        while cap2.isOpened():
            ret, image = cap2.read()
            h, w = image.shape[:2]
            image = cv2.resize(image, (IMAGE_HEIGHT, IMAGE_WIDTH))
            image = cv2.rotate(image, cv2.ROTATE_90_COUNTERCLOCKWISE)
            image = cv2.flip(image,1)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            setLength = round(time.time() - startSetTime, 2)
            elapsed_time = round(time.time() - startTime, 2)
            if state == True:
                try:
                    landmarks = results.pose_landmarks.landmark

                    l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                    r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                    l_hip = (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h))
                    l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                    l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))

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
                    prevAngle = angle    
                    angle = calculateAngle(l_hip, l_knee, l_foot)   

                    cv2.putText(image, str(angle),
                                    tuple(np.multiply(l_knee, [640, 480]).astype(int)),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA
                                        )
                    x.append(setLength)
                    y.append(-(l_shoulder[1]))

                    totalTime = round(elapsed_time,2)
                    
                    message["Session Length"] = time_convert(totalTime)
                    message["Set Length"] = time_convert(setLength)

                    prevDistanceDiff = distanceDiff
                    distanceDiff = l_knee[1]- l_foot[1]
                    
                    # print("new distance: " , distanceDiff, "\tprev distance: ", prevDistanceDiff, "\tnew angle: ", angle, "\tprev angle: ", prevAngle)

                    if angle > 170:
                        direction = "down"
                    if angle < 150 and distanceDiff < prevDistanceDiff and angle < prevAngle and direction == "down":
                        direction="up"
                        rep+=1

                    if rep == 2:
                        rep = 0
                        setLength = 0
                        # generates graph
                        plt.xlabel('Time (Seconds)')
                        plt.ylabel('Height (Pixels)')
                        plt.plot(x, y)
                        graph = '{}-graph-{}-{}.jpg'.format(username, set, time.time())
                        # saves graph
                        plt.savefig(graph)
                        print("Graph: " + graph + " has been created")
                        plt.cla()
                        # clears data of graph for next one
                        x.clear()
                        y.clear()
                        startSetTime = time.time()
                        set += 1 
                        blob = bucket.blob(graph)
                        blob.upload_from_filename(graph)
                        message["Images"].append(graph)
                    
                except Exception as e:
                    print(e)
                    pass

                cv2.rectangle(image, (0,0), (150,70), (194, 101, 20), -1)     
                cv2.putText(image, (f"Set: {set}"), (10,25), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)   
                cv2.putText(image, (f"Rep: {rep}"), (10,60), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)   
                
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                mp_drawing.DrawingSpec(color=(29,162,7), thickness=2, circle_radius=4),
                                mp_drawing.DrawingSpec(color=(185,191,184), thickness=2, circle_radius=2)
                )   

                if state == True:
                    cv2.imshow('Front cam', image)
                    
                if cv2.waitKey(1) & 0xFF == ord('q') or end == True:
                    break

cap = cv2.VideoCapture("mark-side.mp4")
cap2 = cv2.VideoCapture(0)


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
    global state
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
        server.join()
        print("Threads successfully closed.")
        sys.exit
        

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
        global username
        try:
            msg = message.message
            print(msg)
            key = list(msg.keys())
            value = list(msg.values())
            if key[0] == 'status':
                self.handle_event(msg)
            if key[1] == 'username':
                username = value[1]
                print(username)

        except Exception as e:
            print(message.message)
            print(e)
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