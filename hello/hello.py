# virtualenv -p C:\Python36\python.exe hello
# from itertools import chain
    
#     class SolarSystem:
#         planets = [list (chain (planet, (index + 1,))) for index, planet in enumerate ((
#             ('Mercury', 'hot', 2240),
#             ('Venus', 'sulphurous', 6052),
#             ('Earth', 'fertile', 6378),
#             ('Mars', 'reddish', 3397),
#             ('Jupiter', 'stormy', 71492),
#             ('Saturn', 'ringed', 60268),
#             ('Uranus', 'cold', 25559),
#             ('Neptune', 'very cold', 24766) 
#         ))]
        
#         lines = (
#             '{} is a {} planet',
#             'The radius of {} is {} km',
#             '{} is planet nr. {} counting from the sun'
#         )
        
#         def __init__ (self):
#             self.lineIndex = 0
        
#         def greet (self):
#             self.planet = self.planets [int (Math.random () * len (self.planets))]
#             document.getElementById ('greet') .innerHTML = 'Hello {}'.format (self.planet [0])
#             self.explain ()
            
#         def explain (self):
#             document.getElementById ('explain').innerHTML = (
#                 self.lines [self.lineIndex] .format (self.planet [0], self.planet [self.lineIndex + 1])
#             )
#             self.lineIndex = (self.lineIndex + 1) % 3
            
#     solarSystem = SolarSystem ()

from itertools import chain
import smtplib
import ssl
import csv
import time
import random

# sending function
def email_bot():
    port = 465  # google port
    smtp_server = "smtp.gmail.com"

    fmessage = ("Subject:" + Subject + "\n" + "Hello " + fn + ",\n" + message)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, fmessage)
    return None


# open file (need to change to user input)
file = open("test_names.csv")
csvreader = csv.reader(file)
header = next(csvreader)
print(header)

# user input message information
sender_email = input("Enter User Email: ")  # Enc3ladus2024@gmail.com (test account, no personal info)
password = input("Enter User Password: ")  # Superj2902
Subject = input("Enter Subject line: ")
message = input("Enter Message to send: ")

# reading rows and converting to list to be used in mail (0 column first name, 2 is email), prone to change
# n is the time variable, set to send out emails at ~400 per day (12 hours)
row = []
for row in csvreader:

    print(row)
    n = random.randint(80,160)
    print(n)
    fn = row[0]
    receiver_email = row[2]
    email_bot()
    time.sleep(n)