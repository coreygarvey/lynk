import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


VersionFiles = new Mongo.Collection('versionFiles');

VersionFiles.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

VersionFileSchema = new SimpleSchema({
	hash: {
		type: String,
		label: "hash"
	},
	fileHex: {
		type: String,
		label: "File Hex"
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	},
});

Meteor.methods({
	
	deleteVersionFile: function(id){
		VersionFiles.remove(id);
	}
});

VersionFiles.attachSchema(VersionFileSchema);

// Define set of publicFields for publishing
// --------------------------------------------
VersionFiles.publicFields = {
  hash: 1
};



