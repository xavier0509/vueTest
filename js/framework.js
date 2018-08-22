var isVisiable, firstFocus = "";
var _Lindex, _Bindex, _Index1= "";
var _Questions = new Array();
var _Addresses = new Array();
var _theme = getQueryString("theme");
var RTKFlag = "false";

var app = {

	canonical_uri: function(src, base_path) {
		var root_page = /^[^?#]*\//.exec(location.href)[0],
			root_domain = /^\w+\:\/\/\/?[^\/]+/.exec(root_page)[0],
			absolute_regex = /^\w+\:\/\//;
		// is `src` is protocol-relative (begins with // or ///), prepend protocol  
		if(/^\/\/\/?/.test(src)) {
			src = location.protocol + src;
		}
		// is `src` page-relative? (not an absolute URL, and not a domain-relative path, beginning with /)  
		else if(!absolute_regex.test(src) && src.charAt(0) != "/") {
			// prepend `base_path`, if any  
			src = (base_path || "") + src;
		}
		// make sure to return `src` as absolute  
		return absolute_regex.test(src) ? src : ((src.charAt(0) == "/" ? root_domain : root_page) + src);
	},

	rel_html_imgpath: function(iconurl) {
		console.log(app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1')));
		return app.canonical_uri(iconurl.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1'));
	},

	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		showtableinfo(_theme,_Questions,_Addresses);
		
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("backbutton", this.handleBackButton, false);
		document.addEventListener('backbuttondown', this.onBackButtonDown, false);
		document.addEventListener("resume", this.handleresume, false);
		document.addEventListener("pause", this.handlepause, false);
	},
	handlepause: function(){
		console.log("pause---");
	},
	handleresume: function() {
		console.log("resume---");
	},
	handleBackButton: function(){
		console.log("handleBackButton");
	},
	onBackButtonDown: function() {
		console.log("正在处理backbuttondown返回按键....");
        var ev=document.createEvent('HTMLEvents');
        ev.which=ev.keyCode= 27;
        ev.initEvent('keydown',true, true);
        window.dispatchEvent(ev);
	},
	onDeviceReady: function() {
		console.log("in onDeviceReady");
		app.receivedEvent('deviceready');
		app.triggleButton();
		
		// var initPhoneMap = function(obj) {
		// 	map = new coocaakeymap($(".coocaa_btn"), obj, "btn-focus", function() {}, function(val) {}, function(obj) {});
		// 	console.log("----------initPhoneMap End---------");
		// }
		// firstFocus = document.getElementsByClassName("coocaa_btn")[0];
		// initPhoneMap(firstFocus);
		// $("#listInfo").scrollTop(0);
		// _theme = getQueryString("theme");
		// themeStatus(_theme);
		
		// $(".coocaa_btn").bind("itemClick", function() {
		// 	if (RTKFlag == "true") {
		// 		document.getElementById("RTKErrorInfo").style.display = "block";
		// 		setTimeout("document.getElementById('RTKErrorInfo').style.display = 'none';",3000);
		// 	} else{
		// 		_Index1 = $(".coocaa_btn").index($(this));
		// 		console.log("_Index1 = " + _Index1);
		// 		document.getElementById("firstpage").style.display = "none";
		// 		$('.images').siblings().css('display', 'none');
		// 		$(".images")[_Index1].style.display = "block";
		// 		document.getElementById("secondpage").style.display = "block";
		// 	}
		// });
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},
	triggleButton: function() {
		cordova.require("coocaaosapi");
		
		coocaaosapi.getDeviceInfo(function(message) {
			console.log("lxw:"+ JSON.stringify(message));
			console.log("version=" + message.version + "; model=" + message.model + "; activeid=" + message.activeid); //版本号
			console.log("panel " + message.panel + "; mac=" + message.mac + "; chip=" + message.chip + "; chipid=" + message.chipid + "; devid=" + message.devid);
			var Cchip = message.chip;
			var androidSdk = message.androidsdk;
			if((Cchip.indexOf("R") > 0 ||Cchip.indexOf("r") > 0) && androidSdk<18){
				console.log("This is RTK 4.2");
				RTKFlag = "true";
			}else{
				console.log("This is not RTK 4.2");
				RTKFlag = "false";
			}
		}, function(error) {
			console.log(error);
		});
	}
};

app.initialize();

function themeStatus(theme){
	if(theme == "dark"){
		$(".coocaa_btn")[0].style.color = "#cccccc";
		document.getElementById("icon").className="icondark";
		document.getElementById("titleinfo").style.color = "#cccccc";
		document.getElementById("RTKErrorInfo").style.color = "#cccccc";
	}
	$(".coocaa_btn").bind("focus", function() {
		console.log("--------------focusssssss--------------");
		_Lindex = $(".coocaa_btn").index($(this));
		if(theme == "dark"){
			$(".coocaa_btn")[_Lindex].style.color = "#cccccc";
		}
	});
	$(".coocaa_btn").bind("blur", function() {
		_Bindex = $(".coocaa_btn").index($(this));
		if(theme == "dark"){
			$(".coocaa_btn")[_Bindex].style.color = "#000000";
		}
	});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function showtableinfo(theme,_Questions,_Addresses) {
	webapp.loadLists();
	// console.log("in showtableinfo");
	// var myUrl = "http://tc.skysrt.com/appstore/appstorev3/onlineHelp.html";
	// $.ajax({
	// 	type: "get",
	// 	async: true,
	// 	url: myUrl,
	// 	dataType: "jsonp",
	// 	jsonp: "callback",
	// 	success: function(data) {
	// 		for(var i = 0; i < data.data.length; i++) {
	// 			_Questions[i] = data.data[i].question;
	// 			_Addresses[i] = data.data[i].answerList;
	// 			var _div = '<div class="coocaa_btn">' +(i+1)+"、"+ _Questions[i] + '</div>';
	// 			$("#listInfo").append(_div);
	// 		}
	// 		console.log('hello');
	// 		var t = setTimeout(afterTimeo,100);
	// 		function afterTimeo(){
	// 			console.log("加快页面加载出来，但是第一次进二级页面会延迟");
	// 			for(var i = 0; i < _Addresses.length; i++) {
	// 				var _img = '<img class="images" src= '+_Addresses[i]+'></img>';
	// 				$("#secondpage").append(_img);
	// 			}
	// 		}
	// 	},
	// 	error: function() {
	// 		console.log('fail');
	// 	}
	// });
}

