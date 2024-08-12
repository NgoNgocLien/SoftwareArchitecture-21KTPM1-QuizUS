const successCode = (res, data, message) =>{
    res.status(200).json({
        message,
        content:data
    });
}
const failCode = (res, data, message) =>{
    res.status(400).json({
        message,
        content:data
    });
}
const errorCode = (res) =>{
    res.status(500).send("Lỗi hệ thống");
}
module.exports = {
    successCode,
    failCode,
    errorCode
}