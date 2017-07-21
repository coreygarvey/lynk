import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Templates = new Mongo.Collection('templates');

Templates.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});


TemplateSchema = new SimpleSchema({
	name: {
		type: String 
	},
	desc: {
		type: String
	},
	signature: {
		type: String 
	},
	publicKey: {
		type: String 
	},
});

Meteor.methods({
	deleteTemplate: function(id){
		Templates.remove(id);
	}
});

Templates.attachSchema(TemplateSchema);

// Define set of publicFields for publishing
// --------------------------------------------
Templates.publicFields = {
  name: 1,
  desc: 1,
  signature: 1,
  publicKey: 1
};



