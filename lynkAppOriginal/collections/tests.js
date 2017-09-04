import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tests = new Mongo.Collection('tests');

Tests.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});


TestSchema = new SimpleSchema({
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
	deleteTest: function(id){
		Tests.remove(id);
	}
});

Tests.attachSchema(TestSchema);

// Define set of publicFields for publishing
// --------------------------------------------
Tests.publicFields = {
  name: 1,
  desc: 1,
  signature: 1,
  publicKey: 1
};



