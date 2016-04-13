# coding: utf-8
import RPi.GPIO as GPIO
import time
import os



def calculDistance():

	TRIG = 23
	ECHO = 24

	GPIO.setmode(GPIO.BCM)

	GPIO.setup(TRIG, GPIO.OUT)
	GPIO.setup(ECHO, GPIO.IN)

	# Envoi de l'impulsion de démarrage pdt 10 micro sec
	GPIO.output(TRIG, True)
	time.sleep(0.00001)
	GPIO.output(TRIG, False)





	# Prendre le temps où ECHO passera à 1
	d = time.time()

	while GPIO.input(ECHO) == 0:
		time.sleep(0.00005)
		if time.time() - d > 0.03 :
			GPIO.cleanup()
			return -1
	pulse_start = time.time()

	

	# Prendre le temps où ECHO passera à 0
	d = time.time()
	while GPIO.input(ECHO) == 1:
		if time.time() - d > 0.03 :
			GPIO.cleanup()
			return -1
	pulse_end = time.time()

	GPIO.cleanup()



	# durée de l'ECHO
	pulse_duration = pulse_end - pulse_start

	# en partant du principe que le son se propage dans l'air à 343m/s
	distance = pulse_duration * 17150
	return distance







def main():
	print "- Calcul de distance -"

	GPIO.setup(TRIG, GPIO.OUT)
	GPIO.setup(ECHO, GPIO.IN)

	# S'assurer que le Trig est à 0 au demarrage.
	GPIO.output(TRIG, False)
	#print "Initialisation du TRIG à 0..."
	time.sleep(1)

	totalDistance = 0
	i = 0
	while True:
		while i < nbMesure:
			d = calculDistance()
			totalDistance = totalDistance + d
			i = i + 1
		os.system('cls' if os.name=='nt' else 'clear')
		print "Distance: ", round (totalDistance/nbMesure,1), " cm"
		time.sleep(0.3)
		i=0
		totalDistance=0
	# On remet à zéro les broches du GPIO pour s'assurer que les entrées et sorties sont bien réinitialisées 
	GPIO.cleanup()
	return round(totalDistance/nbMesure, 0)
	

if __name__ == '__main__':
		res = main()
		print res



		
