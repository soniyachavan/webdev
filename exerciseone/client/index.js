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
	 
	



	Template.allmyexpense.events({

		"click .submit": function(event,template) {
			
			// var text=event.target.text.value;
			// console.log('text',text);
			var name= template.find("input[name=name]");
			console.log('name value:', name.value);

			var amount = template.find("input[name=amount]");
			console.log('amount value:',amount.value);
			var data={
				name: name.value,
				amount: amount.value,
				username: Meteor.user().username,
				// user_id: Meteor.userId(),
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
			return Expenses.find().fetch();
		}
	})

