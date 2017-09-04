import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


ProjectFiles = new Mongo.Collection('projectFiles');

ProjectFiles.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

ProjectFileSchema = new SimpleSchema({
	hash: {
		type: String,
		label: "hash"
	},
	name: {
		type: String,
		label: "Name"
	}
});

Meteor.methods({
	
	deleteTestFile: function(id){
		ProjectFiles.remove(id);
	}
});

ProjectFiles.attachSchema(ProjectFileSchema);

// Define set of publicFields for publishing
// --------------------------------------------
ProjectFiles.publicFields = {
  hash: 1
};



