import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


PrintableFiles = new Mongo.Collection('printableFiles');

PrintableFiles.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});

PrintableFileSchema = new SimpleSchema({
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
	
	deletePrintableFile: function(id){
		PrintableFiles.remove(id);
	}
});

PrintableFiles.attachSchema(PrintableFileSchema);

// Define set of publicFields for publishing
// --------------------------------------------
PrintableFiles.publicFields = {
  hash: 1
};



