var bal = require('./businesslogic');
exports.getskills = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/skill/getskills")
	else {
		bal.popconnection();
		bal.getskills(req, res)
	}
};
exports.setskills = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/skill/setskills")
	else {
		bal.popconnection();
		bal.setskills(req, res);
	}
};
exports.endorseskills = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/skill/endorseskills")
	else {
		bal.popconnection();
		bal.endorseskills(req, res);
	}
};
exports.removeskills = function(req, res) {
	if (bal.shallwequeue == 1)
		bal.enqueue(req, res, "/skill/removeskills")
	else {
		bal.popconnection();
		bal.removeskills(req, res);
	}
};
