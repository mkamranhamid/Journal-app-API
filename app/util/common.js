
exports.errorResponse = (msg = 'Unauthenticated!! Please sign in to perform this action', code = 501) => {
    var errResp = {
        "data": {
            "error": {
                message: msg,
                code: code,
            }
        }
    }
    return errResp;
}