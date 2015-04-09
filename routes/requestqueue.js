var bal = require('./businesslogic');
var requestqueue = [];

function enqueue(obj) {
	requestqueue.push(obj);
}

function issomethinginqueue() {
	if (requestqueue.length > 0)
		return 1;
	else
		return 0;
}

function dequeue() {
	console.log("Yeah I'm dequeuing queue length = " + requestqueue.length)
	bal.popconnection();
	var obj = requestqueue.shift();
	callfunction(obj);
}
function callfunction(obj) {
	// function type = obj.type;
	// var req = obj.req;
	// var res = obj.res;

	switch (obj.type) {
	case '/user/signinver':
		bal.signinver(obj.request, obj.response);
		break;
	case '/user/signupver':
		bal.signupver(obj.request, obj.response);
		break;
	case '/user/userver':
		bal.signinver(obj.request, obj.response);
		break;
	case '/skill/getskills':
		bal.getskills(obj.request, obj.response);
		break;
	case '/skill/setskills':
		bal.signinver(obj.request, obj.response);
		break;
	case '/skill/endorseskills':
		bal.signinver(obj.request, obj.response);
		break;
	case '/skill/removeskills':
		bal.signinver(obj.request, obj.response);
		break;
	}
}
exports.issomethinginqueue = issomethinginqueue;
exports.enqueue = enqueue;
exports.dequeue = dequeue;