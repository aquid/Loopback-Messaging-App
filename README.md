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
in Spanish language. For message translation [Iron WOrker](https://www.iron.io/platform/ironworker/) is used which again uses 
[Google Translate Api](https://translate.google.co.in/) for text conversion.

** NOTE: This app doesn't show any reference for `Iron Worker Api` or `Google Translate Api` usage. To understand these you can look my [Iron Worker Project](https://github.com/aquid/Iron_worker_Translate) **