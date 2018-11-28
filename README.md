# NeatStreet

A prototype app that leverages the sharing economy to facilitate the direct donation of surplus clothes by interacting with the local homeless community at designated transactional locations around the neighborhood.

Demo Link : https://neatstreet.herokuapp.com/

## Technology stack
```
Front-end: 
HTML, CSS, jQuery, Bootstrap
Back-end: 
Node.js, Express.js, jQuery, Postgresql
```
## Style Guide
```
http://neatstreet.herokuapp.com/StyleGuide.html
```
## Operation instructions
```
git clone https://github.com/NeatStreet/NeatStreet
cd NeatStreet
npm install
npm start
Start your server at: localhost:3000
```
## Limitations
```
Didn't save password in a more secure way (like pwd_hash and salt);
Didn't check for too short password or name;
Didn't verify login status;
Hard code location suggestions based on zip code;
Didn't support upload unsaved image to heroku;
Messages not implemented with sockets for dynamic sessions;
Fixed results for search/filter of clothes, queries not implemented;
```

