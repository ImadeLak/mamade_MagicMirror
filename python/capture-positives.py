"""Raspberry Pi Face Recognition Treasure Box
Positive Image Capture Script
Copyright 2013 Tony DiCola 

Run this script to capture positive images for training the face recognizer.
"""
import glob
import os
import sys
import select

import cv2

#import hardware
import config
import face


# Prefix for positive training image filenames.
POSITIVE_FILE_PREFIX = 'positive_'


def is_letter_input(letter):
	# Utility function to check if a specific character is available on stdin.
	# Comparison is case insensitive.
	if select.select([sys.stdin,],[],[],0.0)[0]:
		input_char = sys.stdin.read(1)
		return input_char.lower() == letter.lower()
	return False


if __name__ == '__main__':
	camera = cv2.VideoCapture(0)
	#box = hardware.Box()
	# Create the directory for positive training images if it doesn't exist.
	if not os.path.exists(config.POSITIVE_DIR):
		os.makedirs(config.POSITIVE_DIR)
	# Find the largest ID of existing positive images.
	# Start new images after this ID value.
	files = sorted(glob.glob(os.path.join(config.POSITIVE_DIR, 
		POSITIVE_FILE_PREFIX + '[0-9][0-9][0-9].pgm')))
	count = 0
	if len(files) > 0:
		# Grab the count from the last filename.
		count = int(files[-1][-7:-4])+1
	print 'Capturing positive training images.'
	print 'Press button or type c (and press enter) to capture an image.'
	print 'Press Ctrl-C to quit.'
	while True:
		# Check if button was pressed or 'c' was received, then capture image.
		#if is_letter_input('c'):
			#print 'Capturing image...'
			ret, frame = camera.read()
			# Convert image to grayscale.
			image = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
			# Get coordinates of single face in captured image.
			result = face.detect_single(image)
			if result is None:
				print 'Could not detect single face!  Check the image in capture.pgm' \
					  ' to see what was captured and try again with only one face visible.'
				continue


			
			#dessiner le carre
			for (x, y, w, h) in result:
		    		cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

			#Display the resulting frame
			cv2.imshow('Video', frame)
			cv2.waitKey(1) 
			
			coefW = 0.16
			coefH = 0.1
			nx = round(w*coefW) + x
			ny = round(h*coefH) + y
			nw = w - round(w*2*coefW)
			nh = h - round(h*2*coefH)

			x, y, w, h = result[0]
			# Crop image as close as possible to desired face aspect ratio.
			# Might be smaller if face is near edge of image.
			crop = face.crop(image, nx, ny, nw, nh)
			# Save image to file.
			filename = os.path.join(config.POSITIVE_DIR, POSITIVE_FILE_PREFIX + '%03d.pgm' % count)
			cv2.imwrite(filename, crop)
			print 'Found face and wrote training image', filename
			count += 1
