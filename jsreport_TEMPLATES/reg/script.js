function beforeRender(req, res, done) {
  require("request")(
    {
      url: "http://localhost:8000/paginate/graph_reg",
      json: true
    },
    function(err, res, body) {
      req.data.data = body;
      done();
    }
  );
}

// function afterRender(req, res, done) {
//   var SendGrid = require('sendgrid');
//   var sendgrid = new SendGrid('uselessuser4@gmail.com', 'uselessdick1')(API_KEY)

//   sendgrid.send({ to: 'pulkitjain708@gmail.com',  from: 'uselessuser4@gmail.com', subject: 'Reports are ready',
//           html: 'This is your report',
//           files: [ {filename: 'Report.pdf', content: new Buffer(res.content) }]
//   }, function(success, message) {
//           done(success);
//   });
// }
