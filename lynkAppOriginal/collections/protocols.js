import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Protocols = new Mongo.Collection('protocols');

Protocols.allow({
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

Meteor.methods({
	deleteProtocol: function(id){
		Protocols.remove(id);
	}
});

Protocols.attachSchema(ProtocolSchema);

// Define set of publicFields for publishing
// --------------------------------------------
Protocols.publicFields = {
  name: 1,
  desc: 1,
  signature: 1,
  publicKey: 1
};



