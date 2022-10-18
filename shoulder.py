from turtle import color
import cv2
import mediapipe as mp
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

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

count = 0
direction = None
message = None

with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:

    while cap.isOpened():
        ret, image = cap.read()

        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = pose.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        try:
            landmarks = results.pose_landmarks.landmark

            shoulder = [landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
            wrist_pos = landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
            shoulder_pos = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
            
            angle = calculate_angle(shoulder, elbow, wrist)

            cv2.putText(image, str(angle),
                            tuple(np.multiply(elbow, [640, 480]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255,255,255), 2, cv2.LINE_AA
                                )          
 
            if angle <= 160 and angle >= 150:
                direction = "up"
            if angle < 90 and direction == "up":
                direction="down"
                count+=1

            if wrist_pos > shoulder_pos - .025:
                message = "TOO LOW"
            else:
                message = "OK"

        except:
            pass    

        cv2.rectangle(image, (0,0), (400,73), (245, 117,16),-1)     
        cv2.putText(image, str(count), (10,60), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)   
        cv2.putText(image, message, (100,60), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,255), 2, cv2.LINE_AA)   
        

        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                        mp_drawing.DrawingSpec(color=(29,162,7), thickness=2, circle_radius=4),
                        mp_drawing.DrawingSpec(color=(185,191,184), thickness=2, circle_radius=2)
        )   

        cv2.imshow('Raw Webcam Feed', image)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()