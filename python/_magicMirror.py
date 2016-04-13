"""Raspberry Pi Face Recognition Treasure Box
Treasure Box Script
Copyright 2013 Tony DiCola 
"""
import cv2
import os
import time
import config
import face


confidenceTolerate = 2000
coefW = 0.16
coefH = 0.1
fichierStatus="_statusCam.txt"

def ecrireStatus(str):
    fichier = open(fichierStatus, "w")
    fichier.write(str)
    #print "J'ai ecrit " + str
    fichier.close()


def main():

	debut = time.time()
	ecrireStatus("INCONNU")
	reconnu=False

	# Load training data into model
	print 'Loading training data...'
	model = cv2.createEigenFaceRecognizer()
	model.load(config.TRAINING_FILE)
	print 'Training data loaded!'
	
	# Initialize camer and box.
	camera = cv2.VideoCapture(0)

	print 'Press Ctrl-C to quit.'
	
	while True:
				if time.time() - debut > 3:
					print reconnu
					reconnu=False
					ecrireStatus("INCONNU")
					print "3 secondes passees sans reconnaissance"
		
				ret, frame = camera.read()

				# Convert image to grayscale.
				image = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
				
				# Get coordinates of single face in captured image.
				result = face.detect_single(image)
				if result is None:
					os.system('cls' if os.name=='nt' else 'clear')
					print 'PAS DE VISAGE'
					continue
				
				#dessiner le carre
				for (x, y, w, h) in result:
			    		cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
				#Display the resulting frame
				#cv2.imshow('Video', frame)
				
				nx = round(w*coefW) + x
				ny = round(h*coefH) + y
				nw = w - round(w*2*coefW)
				nh = h - round(h*2*coefH)

				

				#cv2.imshow("Adding faces to traning set...", frame[ny: ny + nh, nx: nx + nw])
				cv2.waitKey(1) 
				

				x, y, w, h = result[0]
				# Crop and resize image to face.
				crop = face.resize(face.crop(image, nx, ny, nw, nh))

				# Test face against model.
				label, confidence = model.predict(crop)

				if label == config.POSITIVE_LABEL and confidence < confidenceTolerate:
					os.system('cls' if os.name=='nt' else 'clear')
					print 'OUI'
					print confidence
					print x," ",nx," "
					print y," ",ny," "
					print w," ",nw," "
					print h," ",nh," "


					if reconnu == False:
						print 'OUI'
						print "changement de status"
						ecrireStatus("Imade")
						reconnu = True

					debut = time.time()
					
					
				else:
					os.system('cls' if os.name=='nt' else 'clear')
					print 'NON'
					print confidence
					print x," ",nx," "
					print y," ",ny," "
					print w," ",nw," "
					print h," ",nh," "

if __name__ == '__main__':
		main()
				
