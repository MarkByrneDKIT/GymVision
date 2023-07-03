import cv2
import mediapipe as mp
import csv
import numpy as np

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# csv_file = open('coords_and_messages.csv', mode='w', newline='')
# csv_writer = csv.writer(csv_file)
# csv_writer.writerow(['l_shoulder', 'r_shoulder', 'l_hip', 'r_hip', 'l_knee', 'r_knee', 'message'])

cap = cv2.VideoCapture("squat.MOV")
_, image = cap.read()
h, w = image.shape[:2]
blank_image = np.zeros((h, w, 3), dtype=np.uint8)

with mp_pose.Pose(min_detection_confidence=0.7, min_tracking_confidence=0.6, enable_segmentation=True) as pose:

    while True:
        ret, image = cap.read()

        if not ret:
            break

        image.flags.writeable = False
        results = pose.process(image)
        image.flags.writeable = True

        blank_image = np.zeros((h, w, 3), dtype=np.uint8)

        try:
            landmarks = results.pose_landmarks.landmark

            l_shoulder = (landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x * w), (landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y * h)
            r_shoulder = (landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x * w), (landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y * h)
            l_hip = (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].x * w), (landmarks[mp_pose.PoseLandmark.LEFT_HIP.value].y * h)
            r_hip = (landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].x * w), (landmarks[mp_pose.PoseLandmark.RIGHT_HIP.value].y * h)
            l_knee = (landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].x * w), (landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value].y * h)
            r_knee = (landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].x * w), (landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value].y * h)

            mp_drawing.draw_landmarks(blank_image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                      mp_drawing.DrawingSpec(color=(185, 191, 184), thickness=1, circle_radius=4),
                                      mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2)
                                      )

            key = cv2.waitKey(1)

            # if key == ord('w'):
            #     message = 'UP'
            #     csv_writer.writerow([l_shoulder, r_shoulder, l_hip, r_hip, l_knee, r_knee, message])
            # elif key == ord('s'): 
            #     message = 'DOWN'
            #     csv_writer.writerow([l_shoulder, r_shoulder, l_hip, r_hip, l_knee, r_knee, message])

        except:
            pass

        cv2.imshow('Pose', blank_image)
        cv2.setMouseCallback('Pose', lambda *args: None)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
# csv_file.close()