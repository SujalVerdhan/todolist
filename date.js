
module.exports.getdate=getdate;

function getdate(){
var today=new Date();
var options={
    weekday:'long',
    day:'numeric',
    month:'long',

}
var date=today.toLocaleDateString("en-US", options)
return date;
}
module.exports.getday=getday;
function getday(){
    var today=new Date();
    var options={
        weekday:'long',
        
    }
    var day=today.toLocaleDateString("en-US", options)
    return day;
    }