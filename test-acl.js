/**
 * Created by Adetola on 1/14/15.
 */


var acl = require('acl');


//Using the memory backend
acl = new acl(new acl.memoryBackend());
acl.allow('guest', 'blogs', 'view');

acl.addUserRoles('joed', 'guest');

console.log(acl.userRoles('joed'));
