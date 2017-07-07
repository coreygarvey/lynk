Template.Templates.onCreated(function(){
	var self = this;
	self.autorun(function() {
		self.subscribe('recipes');
	});
});

Template.Templates.helpers({
	templates: ()=> {
		return Recipes.find({});
	}
});

Template.Templates.events({
	'click .new-template': () => {
		Session.set('newTemplate', true);
	}
});