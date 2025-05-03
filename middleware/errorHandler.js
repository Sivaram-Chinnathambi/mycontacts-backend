const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title: "VALIDATION_ERROR", message: err.message, trace: err.stackTrace});
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, trace: err.stackTrace});
            break;
        case constants.NOT_FOUND:
            res.json({title: "NOT_FOUND", message: err.message, trace: err.stackTrace});
            break;
        case constants.SERVER_ERROR:
            res.json({title: "SERVER_ERROR", message: err.message, trace: err.stackTrace});
            break;
        default:
            if(!err) {res.json({message: "All good, no error"})} else {res.json({title: "Error occured", message: err.message, trace: err.stack})}
            break;
    }
    

};

module.exports = errorHandler;