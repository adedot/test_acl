/**
 * Created by Adetola on 1/14/15.
 */

var acl = require('acl');

var mongodb = require('mongodb');

mongodb.connect("mongodb://127.0.0.1:27017/acltest", function(error, db) {

    // Create Concept and Blog Post
    var conceptName = "This is the First Concept";
    var blogPost = "This is the First Blog Post";

    var mongoACLClient = new acl.mongodbBackend(db, 'acl_');

    // Create ACL Mongo Based Client
    acl = new acl(mongoACLClient);

    // Add Concept and Blog to acl to be viewed
    acl.allow(conceptName, blogPost, 'view');


    var user = 'Tola'
    acl.addUserRoles(user , conceptName);

   // Check Mongodb Database
    // db.acl_users.find() to see all the users and the accesses that they have

});

