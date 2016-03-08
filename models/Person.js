"use strict";

module.exports = function(sequelize, DataTypes) {
	var model = {};
	model.name = "person";
	model.attributes = {
		id: { 
			type: DataTypes.INTEGER, 
			plainType: 'integer',
			primaryKey: true, 
			autoIncrement: true, 
			label: 'ID',  
			prompt: 'list'
		},
	    name: { 
	    	type: DataTypes.STRING, 
	    	plainType: 'string', 
	    	required: 'yes',
	    	label: 'Complete Name',
	    	prompt: 'list',
	    	maxlength: 100
	    },
	    age: {
	    	type: DataTypes.INTEGER,
	    	plainType: 'integer',
	    	label: 'age'
	    }
	};
	model.options = {
		tableName: 'people',
		createdAt: false,
		updatedAt: false
	};

	return sequelize.define(model.name, model.attributes, model.options);
};