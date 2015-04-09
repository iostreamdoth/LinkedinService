var mysqlobj = require('./mysql');
var pbkdf2 = require('pbkdf2-sha256');
var queue = require('./requestqueue');
// User functions
function rtype(req, res, type) {
	this.request = req;
	this.response = res;
	this.type = type;
};
function signupver(req, res) {
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var username = req.param("username");
	var password = req.param("password");
	console.log(firstname);
	console.log(lastname);
	console.log(username);
	console.log(password);
	var sqlQuery;
	var key = password;
	var salt = 'salt';
	var result = pbkdf2(key, salt, 1, 64);
	password = result.toString('hex');
	// console.log(password);
	var params = "0, '" + firstname + "', '" + lastname + "', '" + username
			+ "', '" + password + "', '" + "" + "', " + 0 + ", " + 0 + ", '','"
			+ "I'";
	var sqlQuery = "call spgetsetusers(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(console.log(JSON.stringify(results)));
		res.send({
			signup : "success"
		});
	}, sqlQuery);

}

function signinver(req, res) {
	var username = req.param("username");
	var password = req.param("password");
	// console.log(username);
	// console.log(password);
	var sqlQuery;
	var key = password;
	var salt = 'salt';
	var result = pbkdf2(key, salt, 1, 64);
	password = result.toString('hex');
	// console.log(password);
	var params = "0, '" + "" + "', '" + "" + "', '" + username + "', '"
			+ password + "', '" + "" + "', " + 0 + ", " + 0 + ",'' ,'" + "GU'";
	var sqlQuery = "call spgetsetusers(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		// console.log(console.log(JSON.stringify(results)));
		console.log(results[0][0].status);
		if (results[0][0].status != 0) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				status : "success",
				message : "signin successfull",
				data : results[0][0].status
			}));
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({
				status : "fail",
				message : "signin failure"
			}));
		}
	}, sqlQuery);
}

function userver(req, res) {
	var username = req.param("username");
	res.send({
		status : "success",
		message : "user verification success"
	})
}

function getuserdetails(req, res) {
	calluser(req, res, "G");
}
function updatesummary(req, res) {
	calluser(req, res, "US");
}

function calluser(req, res, strop) {
	var userid = req.param("userid");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var username = req.param("username");
	var password = req.param("password");
	var imagedetail = req.param("imagedetail");
	var invitation = req.param("invitation");
	var totalconnection = req.param("totalconnection");
	var summary = req.param("summary");

	var sqlQuery;
	var key = password;
	var salt = 'salt';
	var result = pbkdf2(key, salt, 1, 64);
	password = result.toString('hex');

	var params = userid + ", '" + firstname + "', '" + lastname + "', '"
			+ username + "', '" + password + "', '" + imagedetail + "', "
			+ invitation + ", " + totalconnection + ",'" + summary + "' ,'"
			+ strop + "'";
	var sqlQuery = "call spgetsetusers(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success",
			data : JSON.stringify(results[0])
		});
	}, sqlQuery);

}

// Skill functions

function getskills(req, res) {
	var userid = req.param("userid")
	var sqlQuery;
	var params = "0, " + userid + ", '" + "" + "', '" + 0 + "', '" + "" + "',"
			+ 0 + ",'" + "GU'";
	var sqlQuery = "call spgetsetskills(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success",
			data : JSON.stringify(results[0])
		});

	}, sqlQuery);
}

function setskills(req, res) {
	var userid = req.param("userid")
	var skillname = req.param("skillname")
	var sqlQuery;
	var params = "0, " + userid + ", '" + skillname + "', '" + 0 + "', '" + ""
			+ "'," + 0 + ",'" + "I'";
	var sqlQuery = "call spgetsetskills(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success"
		});
	}, sqlQuery);
}

function endorseskills(req, res) {
	var userid = req.param("userid");
	var skillid = req.param("skillid");
	var endorsedby = req.param("endorsedby");
	var sqlQuery;
	var params = skillid + ", " + userid + ", '" + "" + "', '" + 0 + "', '"
			+ "" + "'," + endorsedby + ",'" + "SE'";
	var sqlQuery = "call spgetsetskills(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success"
		});
	}, sqlQuery);
}
function removeskills(req, res) {
	var userid = req.param("userid");
	var skillid = req.param("skillid");
	var sqlQuery;
	var params = skillid + ", " + userid + ", '" + "" + "', '" + 0 + "', '"
			+ "" + "',0" + "" + ",'" + "DS'";
	var sqlQuery = "call spgetsetskills(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success"
		});
	}, sqlQuery);
}

function shallwequeue() {
	return mysqlobj.shallwequeue();
}
function enqueue(req, res, type) {
	return queue.enqueue(new rtype(req, res, type));
}

// profile
function getprofile(req, res) {
	callprofile(req, res, 'GU')
}
function createprofile(req, res) {
	callprofile(req, res, 'I')
}
function updateprofile(req, res) {
	callprofile(req, res, 'SU')
}

function getbyid(req, res) {
	callprofile(req, res, 'GP')
}
function delexp(req, res) {
	callprofile(req, res, 'DE')
}

function search(req, res) {
	var uname1 = req.param("uname1");
	var uname2 = req.param("uname2");
	var uname3 = req.param("uname3");
	var userid = req.param("userid");
	if (userid == '') {
		userid = 0;
	}
	var sqlQuery;
	var params = "'" + uname1 + "', '" + uname2 + "', '" + uname3 + "',"
			+ userid;

	var sqlQuery = "call spsearchuser(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success",
			data : JSON.stringify(results[0])
		});
	}, sqlQuery);

}

function callprofile(req, res, strop) {
	var userid = req.param("userid");
	var profileid = req.param("profileid");
	var organisation = req.param("organisation");
	var type = req.param("type");
	var desc = req.param("desc");
	var as = req.param("as");
	var from = req.param("from");
	var to = req.param("to");
	var location = req.param("location");
	var summary = req.param("summary");

	var sqlQuery;
	var params = profileid + "," + userid + ", '" + organisation + "', '"
			+ type + "', '" + desc + "', '" + as + "','" + from + "','" + to
			+ "','" + location + "','" + summary + "','" + strop + "'";

	var sqlQuery = "call spgetsetprofile(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			status : "success",
			data : JSON.stringify(results[0])
		});
	}, sqlQuery);
}

// Invitations

// profile
function getinvitation(req, res) {
	callinvitation(req, res, 'GU')
}
function sendinvitation(req, res) {
	callinvitation(req, res, 'I')
}
function accept(req, res) {
	callinvitation(req, res, 'SA')
}
function reject(req, res) {
	callinvitation(req, res, 'SR')
}
function box(req, res) {
	callinvitation(req, res, 'GD')
}

function callinvitation(req, res, strop) {
	var idinvitations = req.param("idinvitations");
	var touserid = req.param("touserid");
	var fromuserid = req.param("fromuserid");
	var connectiontype = req.param("connectiontype");
	var message = req.param("message");
	var sqlQuery;
	var params = idinvitations + "," + touserid + ", " + fromuserid + ", '"
			+ connectiontype + "', '" + message + "','" + strop + "'";

	var sqlQuery = "call spgetsetinvitation(" + params + ")";
	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results));
		res.send({
			signup : "success",
			data :results[0]
		});
	}, sqlQuery);
}
// Connections
function getconnections(req, res) {
	callconnections(req, res, 'GA')
}
function setconnections(req, res) {
	callconnections(req, res, 'I')
}
function deleteconnections(req, res) {
	callconnections(req, res, 'SR')
}
function connectionfeed(req, res) {
	callconnections(req, res, 'GI')
}
function getconnectionsdetails(req, res) {
	callconnections(req, res, 'GC')
}

function callconnections(req, res, strop) {
	var idconnections = req.param("idconnections");
	var userid = req.param("userid");
	var touserid = req.param("touserid");
	var sqlQuery;
	var params = idconnections + "," + userid + ", " + touserid + ", '" + strop
			+ "'";

	var sqlQuery = "call spgetsetconnections(" + params + ")";

	mysqlobj.fetchdata(function(err, results) {
		console.log(JSON.stringify(results[0]));
		res.send({
			status : "success",
			data : JSON.stringify(results[0])
		});
	}, sqlQuery);

}

function popconnection() {
	mysqlobj.popconnection();
}

// exports
exports.signupver = signupver;
exports.signinver = signinver;
exports.getskills = getskills;
exports.setskills = setskills;
exports.endorseskills = endorseskills;
exports.removeskills = removeskills;
exports.shallwequeue = shallwequeue;
exports.enqueue = enqueue;
exports.getprofile = getprofile;
exports.createprofile = createprofile;
exports.updateprofile = updateprofile;
exports.getinvitation = getinvitation;
exports.sendinvitation = sendinvitation;
exports.accept = accept;
exports.reject = reject;
exports.getconnections = getconnections;
exports.connectionfeed = connectionfeed;
exports.setconnections = setconnections;
exports.deleteconnections = deleteconnections;
exports.popconnection = popconnection;
exports.getuserdetails = getuserdetails;
exports.updatesummary = updatesummary;
exports.getbyid = getbyid;
exports.delexp = delexp;
exports.search = search;
exports.getconnectionsdetails = getconnectionsdetails;
exports.box = box;
