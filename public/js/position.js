var x = document.getElementById("demo");
function Position(){
  this.getPosition();
};
Position.prototype = {
  constructor: Position,
  getPosition: function(){
    var options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0
    };
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition, this.getError, options);
    }
  },
  showPosition: function(position){
    x.innerHTML = "Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude;
  },
  getError: function(error){
    if (error.code == error.TIMEOUT) {
      x.innerHTML = '获取位置信息失败，请手动输入搜索.';
    } else if (error.code == error.PERMISSION_DENIED) {
      x.innerHTML = '您拒绝了使用位置共享服务.';
    } else if (error.code == error.POSITION_UNAVAILABLE) {
      x.innerHTML = '获取位置信息失败.';
    }
  }
};
var position = new Position();