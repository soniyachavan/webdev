// Meteor.publish("allusers",function () {
// 	var query = {};
// 	var options = {
// 		fields: {
// 			createdAt: 1
// 		}
// 	};

// 	return Meteor.users.find(query, options);
	
//     // return Meteor.users.find({}, { fields: { createdAt: 1 }});
// });

Meteor.publish("expenses",function () {
	return Expenses.find();

});

	
 Meteor.publish('allmyexpenses_row', function() {
    var expenses = Expenses.find({	});
    var userIds = expenses.map(function(doc) { return doc.user_id });
    console.log(userIds);

    var username = Meteor.users.find({_id: {$in: userIds}});

    return [ expenses, username ];
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

