(function(){
	'use strict';
	module.exports = function(app){
		if (app.dataSources.db.name !== 'Memory') return;
		
		var Messenger = app.models.Messenger;
		var Role = app.models.Role;
		var RoleMapping = app.models.RoleMapping;
		// Admin Messenger data
		var userData = [
		{
			name:'Aquid Shahwar',
			username: 'shahwarcoder',
			email: 'aquid.shahwar@gmail.com', 
			password: 'aquid123',
			createdAt: new Date(),
		},
		{
			name:'Nazam Islam',
			username: 'nazam',
			email: 'nazam@gmail.com', 
			password: 'nazam',
			createdAt: new Date(),
		},
		{
			name:'Harsh Vardhan',
			username: 'harsh',
			email: 'harsh@gmail.com', 
			password: 'harsh',
			createdAt: new Date(),
		},
		{
			name:'Vinit Thaker',
			username: 'vinit',
			email: 'vinit.thaker@gmail.com', 
			password: 'vinit',
			createdAt: new Date(),
		},
		];
		Messenger.create(userData,function(err,user){
			if(err){
				throw err;
			}
			console.log(user);
			
			//  Create a role as admin in Role model
			Role.create({
				name: 'admin'
			},function(err,role){
				if (err) throw err;
      			console.log(role);

      			// make Aquid as admin
      			role.principals.create({
      				principalType: RoleMapping.USER,
      				principalId: user[0].id
      			}, function(err,principal){
      				if (err) throw err;
      				console.log(principal);
      			});
			});
		});
	};
})();