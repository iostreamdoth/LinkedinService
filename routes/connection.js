var bal = require('./businesslogic');
exports.getconnections = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.getconnections(req, res, "/connection/getconnections")
	else {
		bal.popconnection();
		bal.getinvitation(req, res);
	}
};
exports.setconnections = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/connection/setconnections")
	else {
		bal.popconnection();
		bal.setconnections(req, res);
	}
};
exports.deleteconnections = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.deleteconnections(req, res, "/connection/deleteconnections")
	else {
		bal.popconnection();
		bal.reject(req, res);
	}
};
exports.connectionfeed = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.deleteconnections(req, res, "/connection/connectionfeed")
	else {
		bal.popconnection();
		bal.connectionfeed(req, res);
	}
};



exports.getconnectionsdetails = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.deleteconnections(req, res, "/connection/getconnectionsdetails")
	else {
		bal.popconnection();
		bal.getconnectionsdetails(req, res);
	}
};
