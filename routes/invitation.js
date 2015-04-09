var bal = require('./businesslogic');
exports.getinvitation = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/invite/getinvitation")
	else {
		bal.popconnection();
		bal.getinvitation(req, res)
	}
};
exports.sendinvitation = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/invite/sendinvitation")
	else {
		bal.popconnection();
		bal.sendinvitation(req, res);
	}
};
exports.reject = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/invite/reject")
	else {
		bal.popconnection();
		bal.reject(req, res);
	}
};
exports.accept = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/invite/accept")
	else {
		bal.popconnection();
		bal.accept(req, res);
	}
};
exports.box = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/invite/box")
	else {
		bal.popconnection();
		bal.box(req, res);
	}
};