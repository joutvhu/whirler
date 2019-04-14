const {StringType} = require('extension-props');

function convertGetRequset(body) {
    if(!StringType.forInstance(body.get)) return undefined;
    return { getter: body.get };
}

function convertPutRequset(body) {
    if(!StringType.forInstance(body.set) || body.val === undefined) return undefined;
    return {
        setter: body.set,
        value: body.val
    };
}


function convertPostRequset(body) {
    if(!StringType.forInstance(body.func)) return undefined;
    let result = { function: body.func };

    if (body.args instanceof Array && body.args.length > 0)
        result.arguments = body.args;

    return result;
}

function convertRequestBody(method, body) {
    if(!StringType.forInstance(method) || !body) return undefined;
    let result;

    if(StringType.valueOf('post').equalsIgnoreCase(method))
        result = convertPostRequset(body);
    else if(StringType.valueOf('get').equalsIgnoreCase(method))
        result = convertGetRequset(body);
    else if(StringType.valueOf('put').equalsIgnoreCase(method))
        result = convertPutRequset(body);
    else return undefined;

    if(result === undefined && result === null) return undefined;
    if ((body.nsp instanceof Array || typeof body.nsp === 'string') && body.nsp.length > 0)
        result.namespace = body.nsp;
    
    return result;
}

module.exports = convertRequestBody;
