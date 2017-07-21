import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import TemplateSchema from './templates.js';
import ProtocolSchema from './protocols.js';
import TestSchema from './tests.js';
import VersionSchema from './versions.js';

Projects = new Mongo.Collection('projects');

Projects.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId, doc) {
		return !!userId;
	}
});


ProtocolSchema = new SimpleSchema({
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


ProjectSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		optional: true,
	},
	desc: {
		type: String,
		label: "Description",
		optional: true,
	},
	creator: {
		type: String,
		label: "Creator",
		optional: true,
		//autoValue: function () {
		//	return this.userId
		//},
		//autoform: {
		//	type: "hidden"
		//}
	},
	ownerPubKey: {
		type: String,
		label: "Owner Public Key",
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
	template: {
		type: TemplateSchema,
		optional: true,
	},
	protocol: {
		type: ProtocolSchema,
		optional: true,
	},
	tests: {
		type: Array,
		optional: true,
	},
	"tests.$": TestSchema,

	versions: {
		type: Array,
		optional: true,
	},
	"versions.$": VersionSchema,

	printable: {
		type: Boolean,
		defaultValue: false,
		optional: true,
		autoform: {
			type: "hidden"
		}
	}
});

Meteor.methods({
	toggleProjectPrintable: function(id, currentState){
		Projects.update(id, {
			$set: {
				printable: !currentState
			}
		});
	},
	deleteProject: function(id){
		Projects.remove(id);
	}
});

Projects.attachSchema(ProjectSchema);

// Define set of publicFields for publishing
// --------------------------------------------
Projects.publicFields = {
  name: 1,
  desc: 1,
  ownerPubKey: 1,
  template: 1,
  protocol: 1,
  tests: 1,
  versions: 1
};



