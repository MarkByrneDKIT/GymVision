import cv2
import mediapipe as mp
import numpy as np
import threading
import math as m
import time
import matplotlib.pyplot as plt
import secrets

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

cap = cv2.VideoCapture(0)
cap2 = cv2.VideoCapture(1)

rep = 0 
set = 0
tilt = None

graph = secrets.token_hex(8)
errorImage = secrets.token_hex(9)

def checkForm(l_shoulder, l_knee, r_shoulder, l_foot, image):
    global tilt
    if l_shoulder[0] > (l_knee[0] + 20):
        s_message = "Shoulders are too far forward"
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)

    elif l_shoulder[0] < (l_knee[0] - 20):
        s_message = "Shoulders are too far back"
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        s_message = 'Good'
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    if l_knee[0] > (l_foot[0] + 40):
        k_message = "Knees are too far forward"
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    elif l_knee[0] < (l_foot[0] - 40):
        k_message = "Knees are too far back"
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,0,255), thickness=3)
    else:
        k_message = "Good"
        cv2.line(image, (l_shoulder[0], l_shoulder[1]), (r_shoulder[0], r_shoulder[1]), color=(0,255,0), thickness=3)

    return {'Shoulder': s_message, 'Knee': k_message, 'tilt': tilt}

def checkTilt(l_shoulder, r_shoulder):
    if l_shoulder[1] > (r_shoulder[1] + (r_shoulder[1] / 25)):
        message = "Tilting to left"
    elif r_shoulder[1] > (l_shoulder[1] + (l_shoulder[1] / 25)):
        message = "Tilting to right"
    else:
        message = "Straight"
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

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
        while cap.isOpened():
            
            ret, image = cap.read()
            h, w = image.shape[:2]
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            try:
                global rep, set
                landmarks = results.pose_landmarks.landmark

                l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))

                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                    mp_drawing.DrawingSpec(color=(185,191,184), thickness=1, circle_radius=4),
                    mp_drawing.DrawingSpec(color=(255,255,255), thickness=2, circle_radius=2)
                )

                cv2.line(image, (l_foot[0] +40, 0), (l_foot[0] +40, 640), (0, 150, 0), 1)
                cv2.line(image, (l_foot[0] -40, 0), (l_foot[0] -40, 640), (0, 150, 0), 1)

                cv2.rectangle(image, (0,0), (490,50), (245, 117,16), -1)  

                feedback = checkForm(l_shoulder, l_knee, r_shoulder, l_foot, image)

                if feedback['Shoulder'] != "Good" and feedback['Knee'] != "Good":
                    badFormTimer+=1
                else:
                    badFormTimer=0

                cv2.putText(image, str(feedback['Shoulder']), (10,20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
                cv2.putText(image, str(feedback['Knee']), (10,40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)

                if badFormTimer == 70:
                    cv2.imwrite(f"{errorImage}.jpg", image)

                message = {
                    'Rep': rep,
                    'Set': set, 
                    'Feedback': feedback
                }

            except:
                pass

            cv2.imshow('Side cam', image)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

def front_cam():
    direction = None
    x = []
    y = []

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5, enable_segmentation=True) as pose:
        startTime = time.time()

        while cap2.isOpened():
            ret, image = cap2.read()
            h, w = image.shape[:2]
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            elapsed_time = round(time.time() - startTime, 2)

            try:
                global rep, set, tilt
                landmarks = results.pose_landmarks.landmark

                l_shoulder = (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h))
                r_shoulder = (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h))
                l_hip = (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h))
                l_knee = (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h))
                l_foot = (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].x * w)), (int(landmarks[mp_pose.PoseLandmark.LEFT_FOOT_INDEX.value].y * h))
                
                tilt = checkTilt(l_shoulder, r_shoulder)
                angle = calculateAngle(l_hip, l_knee, l_foot)   

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
                    plt.savefig(graph, format='jpg')
                    x = []
                    y = []
                    set += 1 

            except:
                pass

            cv2.rectangle(image, (0,0), (255,73), (245, 117,16),-1)     
            cv2.putText(image, str(rep), (10,60), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)   

            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                            mp_drawing.DrawingSpec(color=(29,162,7), thickness=2, circle_radius=4),
                            mp_drawing.DrawingSpec(color=(185,191,184), thickness=2, circle_radius=2)
            )   

            cv2.imshow('Front cam', image)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

t1 = threading.Thread(target=side_cam)
t2 = threading.Thread(target=front_cam)

t1.start()
#t2.start()

cv2.destroyAllWindows()