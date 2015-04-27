﻿if(Meteor.isClient) {

	Template.user.helpers({
	  username: function() {
	    return Meteor.user().username;
	  }
	});	

	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	})

	if(Meteor.user()){
    Meteor.subscribe('allusers');
}
}


if(Meteor.isServer) {

Meteor.publish("allusers",function () {
    return Meteor.users.find({_id:this.userId},
      {fields: {createdAt: 1}});
  });
}
