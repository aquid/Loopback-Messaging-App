(function(){
	'use strict';
	var loopback = require('loopback');
	var ironWorker = require('iron_worker');

	module.exports = function(Message) {
		var worker = new ironWorker.Client();
		/*
			Function to get the sent message fron sender, initiate ironworker worker and send the message for 
			conversion from english to spanish.

			Args passed to iron wroker are 
			{
				text : mesage,(from request),
				senderId : Id of sender (from request),
				recieverId : Id of the reciever (from request),
				loopbackAccessToken : accestoken data (user token from app context),
				loopbackServerUrl : host url of server (user token from app context),
			}
		*/
		Message.sendMessage = function(arg,callback){
			/*
				Return a error if reciver , sender or text is not found;
			*/
			if(!arg.text || !arg.senderId || !arg.recieverId){
				return callback('Params not present');
			}
			/*
				Get the current context and add loopbackAccessToken , loopbackServerUrl
				to the arguments sent to iron worker.
			*/
			var ctx = loopback.getCurrentContext();
			arg.loopbackAccessToken = ctx.get('accessToken');
			arg.loopbackServerUrl = ctx.get('loopbackServerUrl');
			/*
				Queue a task to worker usign the iron worker client library.
			*/
			worker.tasksCreate('aquid/translate', arg, {}, function(error) {
				if(error){
					callback(error);
				}
				/*
					Send a processing notification to the user.
				*/
				callback(null,'Message sent for processing....');
			});
		};

		

		Message.remoteMethod(
			'sendMessage', 
			{
				accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
				returns: {arg: 'greeting', type: 'string'}
			}
		);

		Message.beforeRemote('sendMessage', function(ctx, message ,next) { 
			/*
				Initiate a insatance of  the Messenger model of the app,for doing the prior validations of data before sending 
				it to the main remote method 
			*/
			var Messenger = Message.app.models.Messenger;

			/*
				Check if the right user has sent the message.
				validation is done with respect to user token.
			*/
			if(ctx.req.accessToken.userId !== ctx.args.data.senderId){
				var err = new Error('Sender does not match with access token');
			  	err.status = 403;
			  	next(err);
			}
			else{
				if(ctx.req.accessToken){
					Messenger.findById(ctx.args.data.recieverId,function(err,user){
						if(err){
							next(err); // Return a error if there was error if finiding the reciever 
						}
						else{
							if(!user){
								/*
									Return a error if the reciver of message is not found
								*/
								err = new Error('Reciever not found.');
			  					err.status = 400;
			  					next(err);
							}
							else{
								next();
							}
						}
					});
				}
			}
		});

		/*
			Function to get all the recieved message fron another users.

			Args passed to iron wroker are 
			{
				page : message for particular page, (optional)
				read : get only read messages,(optional)
				sender : get messages fromm particular user,(optional)
			}
		*/
		Message.recievedByUser = function(page,read,sender,callback){
			/*
				Initiate a empty filter object. 
			*/
			var filter = {};
			/*
				Get current context to fetch the cuser user data. 
			*/
			var ctx = loopback.getCurrentContext();

			filter.limit = 10; // set a per page limit (hardcoder as of now, should be a constant number every where)
			filter.skip = ((page) ? (parseInt(page)-1)*10 : 0 ); // check the page if present or set to first page
			filter.where = {recieverId : ctx.get('accessToken').userId}; // filter for the current user
			if(read){
				filter.where = { is_read : true}; // if only read messages are rquired
			}
			if(sender) {
				filter.where = { senderId : sender}; // if messeges sent by particluar user is required
			}
			Message.find(filter,function(err, messages){
				if(err){
					callback(err);
				}
				else{
					callback(null,messages);
				}
			});
		};
		Message.remoteMethod(
			'recievedByUser', 
			{
				accepts: [
					{arg: 'page', type: 'number', http: { source: 'query' } },
					{arg: 'read', type: 'boolean', http: { source: 'query' } },
					{arg: 'sender', type: 'number', http: { source: 'query' } }
				],
				returns: {arg: 'messages', type: 'array'},
				http: {path: '/recievedByUser', verb: 'get'}
			}
		);
	};
})();
