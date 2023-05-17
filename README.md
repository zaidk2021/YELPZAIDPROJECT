Hello and Welcome to YelpCamp!
YelpCamp is a final project as part of a websites building course.

YelpCamp is used as a platform for searching and finding camping sites. The user will be able to search and find hundreds of different camping sites, and also will be able to filter them by price, so he can find camping sites that suit him financially.

After registering and login, the user will be able to create, update and delete camping sites. Also, the user will be able to rate and leave reviews on other camping sites. It is important to note that each user will be able to update and delete camping sites that ONLY he created (this note also applies to ratings and reviews).

A map showing all the camping sites is displayed on the site's home page.

The technologies I used to build YelpCamp:
Client Side:
HTML
CSS
EJS
Bootstrap
Server Side:
Node.js
Express.js
MongoDB
External Tools:
Cloudinary - A solution for developers and marketers to manage images, videos and other rich media assets.
Mapbox - Maps and location for developers.
Starability.css - Accessible rating with animations on top.
How to run the project:
Open the terminal and use the following command: "npm install" (or "npm i").
Paste in the root directory the .env file that has been sent to you via https://www.hackampus.com/.
For your convenience, it is possible to change the value of "PORT" in the .env file. Otherwise the project will run on "PORT" 3000.
Since the project runs on a local database (MongoDB Compass), we would like to generate some random camping sites to appear on the home page. For this purpose, the following command must be executed in the terminal: "node seeds/index.js".
Use the "npm start" command to bring up the server.
Open the browser at the following address: localhost:3000 (or on any other PORT you chose).
Register to YelpCamp!
Enter your local database (MongoDB Compass) and copy the user id of the user you just created. You will find the user id under the users collection, and it should look like this (an example): "_id: ObjectId('someNumbersAndLetters')".
Enter the following project directory: seeds/index.js, and paste the user id you just copied under the seedDB function, instead of author: "63d544cf0075392bce0a8099" // (You will see a comment on the specific line).
Shut down the server and execute in the terminal once again the following command: "node seeds/index.js".
Use the "npm start" command once again to bring up the server.
It is important for me to emphasize that, since the project runs on a local database, we would like to generate some accessible random camping sites to appear on the home page. Therefore, you must execute these commands only once.
After the initial run of the project, we can simply load the database using the command: "node seeds/index.js", and then bring up the server using the command: "npm start".
Happy Camping :)

