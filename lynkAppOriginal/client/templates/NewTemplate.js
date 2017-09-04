Template.NewTemplate.events({
	'click .fa-close': function() {
		Session.set('newTemplate', false);
	}
});