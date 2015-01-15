/**
 * Created by Adetola on 1/14/15.
 */

var acl = require('acl');

var mongodb = require('mongodb');

mongodb.connect("mongodb://127.0.0.1:27017/myAclTest", function(error, db) {

    // Create MongoBackend
    var mongoACLClient = new acl.mongodbBackend(db, 'acl_');

    // Create ACL Mongo Based Client
    myACL = new acl(mongoACLClient);

    // create role/ACL for a specific concept(s) using the concept id
    // as part of the name for simplification
    myACL.allow('concept-123', 'concepts/123', ['get'])
    myACL.allow('concept-125', 'concepts/125', ['get'])

    // create a member role, just to demonstrate multiple roles
    myACL.allow('member', 'members-only', ['get'])

    // add roles to a specific user - joed
    myACL.addUserRoles('54b6bc5557c6f7296d4ac13d', 'member');
    myACL.addUserRoles('54b6bc5557c6f7296d4ac13d', 'concept-123');

    // add roles to a specific user - aaron
    myACL.addUserRoles('54b6bc7457c6f7296d4ac13e', 'super-admin');
    myACL.addUserRoles('54b6bc7457c6f7296d4ac13e', 'concept-125');


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

    dumpUserRoles('54b6bc5557c6f7296d4ac13d');
    dumpUserRoles('54b6bc7457c6f7296d4ac13e');

    // test access to a specific url/path
    myACL.isAllowed('54b6bc5557c6f7296d4ac13d', 'concepts/125', 'put', function(err, res) {
        err && console.error(JSON.stringify(err));
        console.log('isAllowed: joed - concepts/125 ' + JSON.stringify(res));
    });

   // Check Mongodb Database
    // db.acl_users.find() to see all the users and the accesses that they have

});

