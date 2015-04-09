var bal = require('./businesslogic');
exports.getprofile = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/get")
	else {
		bal.popconnection();
		bal.getprofile(req, res);
	}
};

exports.createprofile = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/create")
	else {
		bal.popconnection();
		bal.createprofile(req, res)
	}
};

exports.updateprofile = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/update")
	else {
		bal.popconnection();
		bal.updateprofile(req, res)
	}
};
exports.updatesummary = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/updatesummary")
	else {
		bal.popconnection();
		bal.updatesummary(req, res)
	}
};
exports.getbyid = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/getbyid")
	else {
		bal.popconnection();
		bal.getbyid(req, res)
	}
};
exports.delexp = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/delexp")
	else {
		bal.popconnection();
		bal.delexp(req, res)
	}
};

exports.search = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/profile/search")
	else {
		bal.popconnection();
		bal.search(req, res)
	}
};




