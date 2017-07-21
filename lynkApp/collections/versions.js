import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Versions = new Mongo.Collection('versions');

Versions.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});


VersionSchema = new SimpleSchema({
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
	printable: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	},
});

Meteor.methods({
	toggleVersionPrintable: function(id, currentState){
		Versions.update(id, {
			$set: {
				printable: !currentState
			}
		});
	},
	deleteVersion: function(id){
		Versions.remove(id);
	}
});

Versions.attachSchema(VersionSchema);

// Define set of publicFields for publishing
// --------------------------------------------
Versions.publicFields = {
  name: 1,
  desc: 1,
  signature: 1,
  publicKey: 1
};



