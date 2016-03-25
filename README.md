** This is the simple light weight application app to understand nodejs loopback framework basics and test its deployment**

## Prerequisites

You must have already installed [Node.js](https://nodejs.org/).

Install StrongLoop:
```
$ npm install -g strongloop
```

If you run into any issues, see [Installing StrongLoop](http://docs.strongloop.com/display/LB/Installing+StrongLoop)
for more information.

## Loopback Messaging App

Loopback Messaging App is a simple application to understand the Strongloop node js framework. This application provides api
for sending messages between registered users. The sender send the message in English language and reciever recievve the messages 
in Spanish language. For message translation [Iron Worker](https://www.iron.io/platform/ironworker/) is used which again uses 
[Google Translate Api](https://translate.google.co.in/) for text conversion.

** NOTE: This app doesn't show any reference for `Iron Worker Api` or `Google Translate Api` usage. To understand these you can look my [Iron Worker Project](https://github.com/aquid/Iron_worker_Translate) **

### Run the application

Start the application back-end by running the following command:

```
$ cd message-app
$ npm install
$ node . 

```
To send message you need to set your IRONWORKER credentials, see `IRONWORKER CONFIGURATION` for more details.

To connect and use any other DB connector you can specify the connector details in `server/datasource.local.js` file and use the command

```
$ DB=connector_name node . or DB=connector_name slc run .

```


## REST APIs

 - `/Messages/recievedByUser` Recieve all the messages sent by other Messenger
 - `/Messages/sendMessage` Send message to another user.
 - `/Messages`  Get all the messages in database, Only allowed for admin users
 - `/Messagers` Get the list of all the user whom you want to send message
 - `/Messenger/login` allows a Messenger to login
 - `/Messenger/logout` allows a Messenger to logout



## SAMPLE DATA

You can see some initial users data which are created at app boot time for memory database at `server/boot/admin-user.js`
Sample creates few dummy users data creates a custom user role as `admin` and makes the first user as admin for the application which has no restrictions in the applications. Note: You can change permissions according to [User Roles](https://docs.strongloop.com/display/public/LB/Defining+and+using+roles) 


## IRONWORKER CONFIGURATION 

This application uses [iron_worker_node](https://github.com/iron-io/iron_worker_node) to make connection to worker. You need to create/edit a `iron.json` file in the root folder of the project and provide your crerdentials.

After setting your credentials you need to create a worker upload it to [hud.iron.io](https://hud.iron.io/).

Once uploaded you need to specify a url in `server/server.js`. The url which our worker will use to send back the converted message data back to server.

```
app.use(function setCurrentUser(req, res, next) {
    .........
    .........
    .........
    .........
    var loopbackContext = loopback.getCurrentContext();
    var loopbackServerUrl = "YOUR SERVER URL ex: myapp.domain.com";
    if (loopbackContext) {
      loopbackContext.set('currentUser', user);
    }
    if(loopbackServerUrl) {
      loopbackContext.set('loopbackServerUrl', loopbackServerUrl);
    }
    ........

```

### Contact ###

Thank you for your interest.

This project was just to understand the basics of Strongoop nodejs framework. There are lot of improvements that can be done.
In case of any query or suggestion you can contact me at `aquid.shahwar@gmail.com`.

