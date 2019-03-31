function getToken(headers) {
    let authorization = headers != null && headers.authorization;
    if(typeof authorization === 'string') return authorization.replace('Bearer ', '');
    return null;
}

function parseRequest(body, headers) {
    if(typeof body === 'object' && typeof body.func === 'string') {
        let result = {
            function: body.func,
            arguments: null
        };
        if(body.args instanceof Array && body.args.length > 0)
            result.arguments = body.args;

        if(headers != null) {

        }
        return result;
    } else return null;
}

module.exports = parseRequest;