/**
 * Created by Adetola on 1/14/15.
 */


var acl = require('acl');

// Or Using the memory backend
myACL = new acl(new acl.memoryBackend());

// create role/ACL for a specific concept(s) using the concept id
// as part of the name for simplification
myACL.allow('concept-123', 'concepts/123', ['get','put','post'])
myACL.allow('concept-125', 'concepts/125', ['get','put','post'])

// create a member role, just to demonstrate multiple roles
myACL.allow('member', 'members-only', ['get','put','post'])

// add roles to a specific user - joed
myACL.addUserRoles('joed', 'member');
myACL.addUserRoles('joed', 'concept-123');

// add roles to a specific user - aaron
myACL.addUserRoles('aaron', 'member');
myACL.addUserRoles('aaron', 'super-admin');
myACL.addUserRoles('aaron', 'concept-125');


// Helper functions..
function dumpUserRoles(_user) {
	myACL.userRoles(_user, function(err, res) {
    	err && console.error(JSON.stringify(err));
   		console.log('roles: ' + _user + " " +  JSON.stringify(res));
	});
}

function dumpRoleResources(_role) {
	myACL.whatResources(_role, function(err, res) {

    	err && console.error(JSON.stringify(err));
   		console.log('whatResources: '+ _role + " " + JSON.stringify(res));
	});
}

// Test Output

dumpRoleResources("concept-123");
dumpRoleResources("concept-125");

dumpUserRoles('joed');
dumpUserRoles('aaron');

// test access to a specific url/path
myACL.isAllowed('joed', 'concepts/125', 'put', function(err, res) {
	err && console.error(JSON.stringify(err));
   	console.log('isAllowed: joed - concepts/125 ' + JSON.stringify(res));
});


