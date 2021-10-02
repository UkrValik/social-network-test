# Social network test app
Small back-end app as test task for [mobidev](https://mobidev.com.ua/) internship.

### Preparations

Run these commands:

`docker build -t server .`

`docker-compose up`

`node seed_data.js`

Now the service is up and listening on port 3000.
### Routs:
- /popular - returns json with the most popular users;
- /friendscount - return only number of friends
