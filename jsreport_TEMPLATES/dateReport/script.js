var request = require('request')

function beforeRender(req, res, done) {
    data = req.data
    console.log("In DATA", data)
    request.post({
        url: 'http://localhost:8000/paginate/filter',
        body: data,
        json: true
    }, function (error, response, body) {
        if (error) {
            console.error(error)
        }
        console.log(body)
        req.data.d = body
        done()
    });
}