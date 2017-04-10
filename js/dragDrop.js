(function(){
	"use strict";

	var doNow = document.querySelector(".doNow");
	var doLater = document.querySelector(".doLater");
	var holdOn =  document.querySelector(".holdOn");

	doNow.addEventListener("drop", drop, false);
	doLater.addEventListener("drop", drop, false);
	holdOn.addEventListener("drop", drop, false);

	doNow.addEventListener("dragover", allowDrop, false);
	doLater.addEventListener("dragover", allowDrop, false);
	holdOn.addEventListener("dragover", allowDrop, false);
})()