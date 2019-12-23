const common = function()
{
    let that = {};
    that.sleep = function(time)
    {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    return that
}
module.exports = common;