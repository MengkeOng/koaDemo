export var message = {};

var navigatorMsg;
var screenMsg;
//var locationMsg;

message.getMessage = function(){
  var reportObject = new Object();
  //reportObject.loanId = loanId;
  reportObject.navigator = collectNavigatorMsg();
  reportObject.screen = collectScreenMsg();
  return getReportString(reportObject,'Data');
}

/**
 * 获取Navigator 浏览器信息
 */
function collectNavigatorMsg() {
  //alert('collectNavigatorMsg');// TODO
  navigatorMsg = new Object();

  // 由客户机发送服务器的 user-agent 头部的值
  navigatorMsg.userAgent = navigator.userAgent;
  // 运行浏览器的操作系统平台
  navigatorMsg.platform = navigator.platform;
  // 浏览器的名称
  navigatorMsg.appName = navigator.appName;
  // 浏览器的代码名
  navigatorMsg.appCodeName = navigator.appCodeName;
  // 浏览器的平台和版本信息
  navigatorMsg.appVersion = navigator.appVersion;
  // 是否启用 cookie
  navigatorMsg.cookieEnabled = navigator.cookieEnabled;
  navigatorMsg.javaEnabled = navigator.javaEnabled();

  var plugins = new Array();
  var pluginsLength = navigator.plugins.length;
  for (var i = 0; i < pluginsLength; i++) {
    var plugin = new Object();
    plugin.name = navigator.plugins[i].name;
    plugin.filename = navigator.plugins[i].filename;
    plugin.description = navigator.plugins[i].description;
    plugins[i] = plugin;
  }
  navigatorMsg.plugins = plugins;
  return navigatorMsg;
}

/**
 * 获取Screen 屏幕信息
 */
function collectScreenMsg() {
  //alert('collectScreenMsg');// TODO
  screenMsg = new Object();

  // 返回显示屏幕的高度。
  screenMsg.height = screen.height;
  // 返回显示器屏幕的宽度。
  screenMsg.width = screen.width;
  // 返回显示屏幕的高度 (除 Windows 任务栏之外)。
  screenMsg.availHeight = screen.availHeight;
  // 返回显示屏幕的宽度 (除 Windows 任务栏之外)。
  screenMsg.availWidth = screen.availWidth;
  // 分辨率
  screenMsg.pixelDepth = screen.pixelDepth;

  return screenMsg;
}



/**
 * 组装数据
 */
function getReportString(reportJsonObject,dataType){
  reportJsonObject.dataType = dataType;
  reportJsonObject.sdkVerson = "1.0";
  reportJsonObject.platform = "H5";
  reportJsonObject.appKey = "FED683BE4F664C7CB1356CED06D1CA64";
  reportJsonObject.href = location.href;

  var myDate = new Date();
  reportJsonObject.collectTime = myDate.getTime();
  reportJsonObject.timeZone = myDate.getTimezoneOffset();

  var broswerId = getCookie("broswerId");
  if (!checkValueExist(broswerId)) {
    broswerId = getUUID();
    setCookie("broswerId", broswerId, 3650);
  }
  reportJsonObject.broswerId = broswerId;

  return reportJsonObject;
}


function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1)
        c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return "";
}

function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  if (value != null && value != "" && value != "null" ) {
    exdate.setDate(exdate.getDate() + expiredays);
  } else {
    exdate.setDate(exdate.getDate() -1);
  }
  document.cookie = c_name + "=" + escape(value)
    + ((expiredays == null) ? "" : "; expires=" + exdate.toGMTString());
}

function checkValueExist(value) {
  if (value != null && value != "" && value != "null") {
    return true;
  } else {
    return false;
  }
}

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix) length - the desired number of characters
 * radix - the number of allowable values for each character.
 *
 * EXAMPLES: // No arguments - returns RFC4122, version 4 ID >>> Math.uuid()
 * "92329D39-6F5C-4520-ABFC-AAB64544E172" // One argument - returns ID of the
 * specified length >>> Math.uuid(15) // 15 character ID (default base=62)
 * "VcydxgltxrVZSTV" // Two arguments - returns ID of the specified length, and
 * radix. (Radix must be <= 62) >>> Math.uuid(8, 2) // 8 character ID (base=2)
 * "01001010" >>> Math.uuid(8, 10) // 8 character ID (base=10) "47473046" >>>
 * Math.uuid(8, 16) // 8 character ID (base=16) "098F4D35"
 */
function getUUID() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    .split('');

  // Math.uuid = function (len, radix) {
  var len = 32;
  var radix = 16;
  var chars = CHARS, uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++)
      uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};