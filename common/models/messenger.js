module.exports = function(Messenger) {
	// Messenger.sentMessages = function(id,cb){
	// 	console.log(id);
	// 	Messenger.findById(id,{include: 'Messages'},function(err,user){
	// 		if(err){
	// 			cb(err);
	// 		}
	// 		else{
	// 			console.log(user);
	// 			cb(null,user);
	// 		}
	// 	});
	// };
	// Messenger.remoteMethod('sentMessages', {
	// 	accepts: {arg: 'id', type: 'string', required: true},
	// 	returns: {arg: 'greeting', type: 'array'},
	// 	http: {path: '/:id/sentMessages', verb: 'get'}
	// });
};
