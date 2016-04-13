# coding: utf-8
"""
Recupere la distance du premier obstacle et allume la camera si necessaire
"""

import _magicMirror
import multiprocessing as mp
import time
import _HCSR04
import RPi.GPIO as GPIO
import os



if __name__ == '__main__':


		distanceMin = 100
		distance = 0
		
		tempsProche = time.time()
		tempsLoin = time.time()
		proche = False
		loin = False
		etat = ""
		
		nbMesure = 10

		
		while True:

			# on recupere la distance du premier obstacle
			time.sleep(0.25)
			#totalDistance = 0
			i = 0
			vals=[]
			while i < nbMesure:
				d = HCSR04.calculDistance()
				if d == -1:
					continue
				vals.append(d)
				#totalDistance = totalDistance + d
				i = i + 1
			
			vals = sorted(vals)
			vals.pop(0)
			vals.pop(0)
			vals.pop()
			vals.pop()
			distance = sum(vals)/len(vals)
			os.system('cls' if os.name=='nt' else 'clear')
			print "distance: ", round(distance), "\netat: ", etat, len(vals)
			
			#distance = totalDistance/nbMesure

			i=0
			#totalDistance=0

			#---------------------------------------------------------------------------------------------#
			
			if distance < distanceMin:
				if time.time() - tempsProche > 0.5:
					tempsLoin = time.time()
					if proche == False :
						_magicMirror.ecrireStatus("Imade")
						proche = True
						loin = False
						etat = "proche"

			else:
				if time.time() - tempsLoin > 1:
					tempsProche = time.time()
					if loin == False:
						_magicMirror.ecrireStatus("INCONNU")
						loin = True
						proche = False
						etat = "loin"
					
