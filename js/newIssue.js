(function(){
	"use strict";

	var issue = document.getElementById("issue");
	var doNow = document.getElementById("now");
	var filterControl = document.querySelectorAll(".filtersControl");
	var filter = "rgba(0,177,76, 1)";

	for(var i=0;i<filterControl.length;++i){
		filterControl[i].addEventListener("click", setFilter, false);
	}

	issue.addEventListener("click", addIssue, false);

	function createIssue(){
		var totalIssues = countTotalIssues();
		
		var h4 = $("<h4>eos-youtube.gjs</h4>").addClass("boxTitle").css("border-left", "5px solid " + filter);
		var boxNumber = $("<span>#29</span>").addClass("boxNumber");
		var mainP = $("<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores, placeat praesentium.</p>").attr("contenteditable", "true");
		var img = $("<img>").attr("src", "assets/user.png").attr("alt", "photo of a user");
		var username = $("<p>username</p>");
		var points = $("<span>13pts</span>").addClass("points");
		var footer = $("<footer></footer>").append(img[0]).append(username[0]).append(points[0]);
		var article = $("<article></article>").addClass("box").attr("id", totalIssues).attr("draggable", "true");
		article.append(h4[0]).append(boxNumber[0]).append(mainP[0]).append(footer[0]);
		article[0].addEventListener("dragstart", drag , false);
		issue = $("<div></div>").attr("id", doNow.id + (totalIssues+1)).append(article[0]);

		return issue;
	}

	function setFilter(e){
		if(e.target.nodeName == "LI"){
			var filterColor = e.target.childNodes[0].className;
			var nonFilterColor = [];

			for(var i=0;i<filterControl.length;++i){
				if (filterControl[i].childNodes[0].className != filterColor) {
					nonFilterColor[i] = filterControl[i].childNodes[0].className;
				}
			}
		
			switch(filterColor){
				case "green":
					e.target.childNodes[0].style.background = "rgba(0,177,76, 1)";
					filter = "rgba(0,177,76, 1)";
				break;
				case "purple":
					e.target.childNodes[0].style.background = "rgba(170,78,154, 1)";
					filter = "rgba(170,78,154, 1)";
				break;
				case "orange":
					e.target.childNodes[0].style.background = "rgba(255,120,0, 1)";
					filter = "rgba(255,120,0, 1)";
				break;
			}

			for(var i=0;i<nonFilterColor.length;++i){
				switch(nonFilterColor[i]){
					case "green":
						document.getElementsByClassName("green")[0].style.background = "rgba(0,177,76, .5)";
					break;
					case "purple":
						document.getElementsByClassName("purple")[0].style.background = "rgba(170,78,154, .5)";
					break;
					case "orange":
						document.getElementsByClassName("orange")[0].style.background = "rgba(255,120,0, .5)";
					break;
				}			
			}
		}

	}

	function addIssue(e){
		var issue = createIssue();
		doNow.appendChild(issue[0]);
	}

})()