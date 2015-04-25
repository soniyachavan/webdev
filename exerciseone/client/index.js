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
	 
	// Template.Allmyexpense.events({
	// 	'click .submit': function() {
	// 		Expenses.insert({
	// 			expenses: $('.form-control').val()
	// 		});
	// 		$('.form-control').val('');
	// 	}
	// });





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
				amount: amount.value
			}
			console.log('data:', data)
				// Expense.insert ({
				// 	name: name.value,
				// 	amount: amount.value	
				// });
		
			Expenses.insert (data);
		}
	});
