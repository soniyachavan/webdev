		Template.user.helpers({
	  username: function() {
	    return Meteor.user().username;
	  }
	});	

	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});

	
	Template.allusers.helpers({
		emails: function() {
			return Meteor.user().emails[0].address;
		},
		username: function() {
			return Meteor.user().username;
		},
		createdAt: function() {
			return getDateString();
		},
	});
	
	function getDateString() {
		var date = Meteor.user().createdAt;
	        var month = date.getMonth()+ 1;
	        var dateString =  month + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	        
			return dateString;
	}

	
	Meteor.subscribe("allusers");
	Meteor.subscribe("expenses");
	Meteor.subscribe("allmyexpenses_row");	 
	



	Template.allmyexpense.events({

		"click .submit": function(event,template) {
			
			// var text=event.target.text.value;
			// console.log('text',text);
			var name= template.find("#expense_name");
			console.log('name value:', name.value);

			var amount = template.find("input[name=amount]");
			console.log('amount value:',amount.value);
			var data={
				name: name.value,
				amount: amount.value,
				// username: Meteor.user().username,
				user_id: Meteor.userId(),
				currency: 'INR'
			}
			console.log('data:', data)
		
			
			Expenses.insert (data);
			// document.getElementById("myForm").reset();
			$('#myForm').trigger("reset");
		},
		
// <<<<<<<<<<<<<<<<<< delete function>>>>>>>>>>>>>>>>>>>>>>>>>


		"click .delete" :function() {
			Expenses.remove(this._id);
		}
		
		

	});

	Template.allmyexpense.helpers({
		expenses: function() {
			// username= Session.get('username');
			if(Session.get('selectedUser')) {
				return Expenses.find({ user_id: Session.get('selectedUser') }).fetch();
			}
			else {
				return Expenses.find().fetch();
			}
		},
		uniqueUsers: function(){
			var expenses = Expenses.find().fetch();
			var user_ids = _.pluck(expenses, 'user_id');
			
			user_ids = _.uniq(user_ids);
			console.log(user_ids);
			var users = Meteor.users.find({ _id: { $in: user_ids } }).fetch();
			console.log(users);
			return users;
		}
	})

	Template.allmyexpenses_row.helpers({
	    username: function() {
	     	return Meteor.users.findOne(this.user_id).username;
    	}
	});

	// Template.dropdownUsers.helpers({
	// 	username: function() {
	// 		console.log(this);

	//      	var distinctEntries = _.uniq(Meteor.users.findOne(this.user_id).username);
	//      	return distinctEntries;
	//      }
	// })

Template.dropdownUsers.helpers({
	user : function() {
		user=Expenses.find().fetch();
		console.log('user:', user);
	},
	uniqueUsers: function(){
			var expenses = Expenses.find().fetch();
			var user_ids = _.pluck(expenses, 'user_id');
			
			user_ids = _.uniq(user_ids);
			console.log(user_ids);
			var users = Meteor.users.find({ _id: { $in: user_ids } }).fetch();
			console.log(users);
			return users;
		}
});

// Template.dropdownusers.events({
//     'click .player': function(){
//         Session.set('selectedUser', 'session value test');
//         Session.get('selectedUser');

//     },
Template.dropdownUsers.events({
	// 'change select#username' : function() {
	// 	user = $('#username option:selected').attr('name');
	// 	console.log('user value:', user);
	// 	if(user)
	// 		Session.set('username', user);
	// }
	'click .unique-user' : function () {
		// user_id = Meteor.user
		console.log(this._id);
		Session.set('selectedUser', this._id)
	}
})
	
// });
