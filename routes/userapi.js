/*
 * GET users listing.
 */
var bal = require('./businesslogic');

exports.signupver = function(req, res) {

	if (bal.shallwequeue() == 1) {

		bal.enqueue(req, res, "/user/signupver")

	} else {
		bal.popconnection();
		bal.signupver(req, res)
	}
};
exports.signinver = function(req, res) {
	console
			.log("---------------- -----------Start--------------- --------------------------------");

	if (bal.shallwequeue() == 1) {
		bal.enqueue(req, res, "/user/signinver")

	} else {
		bal.popconnection();
		bal.signinver(req, res);
	}

};
exports.userver = function(req, res) {
	if (bal.shallwequeue == 1) {
		bal.enqueue(req, res, "/user/userver")
	} else {
		bal.popconnection();
		bal.userver(req, res);

	}
};
exports.getuserdetails = function(req, res) {
	if (bal.shallwequeue == 1) {
		bal.enqueue(req, res, "/user/userver")
	} else {
		bal.popconnection();
		bal.getuserdetails(req, res);

	}
};

