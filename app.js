/**
 * Module dependencies.
**/

var express = require('express')
  ,routes = require('./routes')
  ,user = require('./routes/userapi')
  ,skill = require('./routes/skillapi')
  ,http = require('http')
  ,invitation = require('./routes/invitation')
  ,profile = require('./routes/profile')
  ,connection = require('./routes/connection')
  ,path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3009);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});

//User routes
app.post('/user/signinver', user.signinver);
app.post('/user/signupver', user.signupver);
app.post('/user/userver', user.userver);
app.post('/user/getuserdetails', user.getuserdetails);

//Skill routes
app.post('/skill/getskills', skill.getskills);
app.post('/skill/setskills', skill.setskills);
app.post('/skill/endorseskills', skill.endorseskills);
app.post('/skill/removeskills', skill.removeskills);

//profile routes
app.post('/profile/get', profile.getprofile);
app.post('/profile/create', profile.createprofile);
app.post('/profile/update', profile.updateprofile);
app.post('/profile/updatesummary', profile.updatesummary);
app.post('/profile/getbyid', profile.getbyid);
app.post('/profile/delexp', profile.delexp);
app.post('/profile/search', profile.search);

//Invitation Routes
app.post('/invite/user', invitation.getinvitation);
app.post('/invite/sendinvitation', invitation.sendinvitation);
app.post('/invite/accept', invitation.accept);
app.post('/invite/reject', invitation.reject);
app.post('/invite/box', invitation.box);

//Connections
app.get('/connection/users', connection.getconnections);
app.get('/connection/create', connection.setconnections);
app.post('/connection/delete', connection.deleteconnections);
app.post('/connection/connectionfeed', connection.connectionfeed);
app.post('/connection/getconnectionsdetails', connection.getconnectionsdetails);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
