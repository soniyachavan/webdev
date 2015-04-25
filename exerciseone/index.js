Meteor.publish("allusers",function () {
	var query = {};
	var options = {
		fields: {
			createdAt: 1
		}
	};

	return Meteor.users.find(query, options);
	
    // return Meteor.users.find({}, { fields: { createdAt: 1 }});
});

Meteor.publish("expenses",function () {
	return Expenses.find();

});
	











// 	Template.allusers.helpers({
// 		emails: function() {
// 			return Meteor.user().emails[0].address;
// 		},
// 		username: function() {
// 	    return Meteor.user().username;
// 	}
// });
// 		// createdAt: function() {
// 		// 	return Meteor.user().createdAt;
// 		// }
 	
		
// // 	})
// // }

