if(Meteor.isClient) {

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

Meteor.publish("allusers",
  function () {
    return Meteor.users.findOne({admin: true, emails:Meteor.user().emails,username:Meteor.user().username},
      {fields: {createdAt: 1}});
  });


}















// 	Template.user_details.helpers({
// 		emails: function() {
// 			return Meteor.user().emails[0].address;
// 		},
// 		username: function() {
// 	    return Meteor.user().username;
// 		}
		
// 	})
// }

