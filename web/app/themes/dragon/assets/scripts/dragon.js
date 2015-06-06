/* Dragon Theme JS */

function nn(n) {
  return (n < 10 ? '0' : '') + n;
}
function dragonTime(){
  var now = new Date();
  var h = nn(now.getHours());
  var m = nn(now.getMinutes());
  var s = nn(now.getSeconds()); 
  return [ h, m, s ].join(':');
}

/* onDomReady */
$(document).ready(function() {
		var t = dragonTime();
		var u = "dragon.ninja";
		var m = "HEY HEY HEY";
		var r = "-||- "+t+" -||- "+u+": "+m+" -||-";
    console.log(r);
    //alert(r);
});