import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


TestFiles = new Mongo.Collection('testFiles');

TestFiles.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

TestFileSchema = new SimpleSchema({
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
		TestFiles.remove(id);
	}
});

TestFiles.attachSchema(TestFileSchema);

// Define set of publicFields for publishing
// --------------------------------------------
TestFiles.publicFields = {
  hash: 1
};



