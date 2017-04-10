"use strict";

function myGroup(node){
	if((node.id =="now") || (node.id =="later") || (node.id =="hold") || (node.nameNode == "HTML")){
		return node.id;
	}
	return myGroup(node.parentNode);
}

function myGroupLine(node){
	if((node.id.includes("now")) || (node.id.includes("later")) || (node.id.includes("hold")) || (node.nameNode == "HTML")){
		return node.id;
	}
	return myGroupLine(node.parentNode);
}

function searchArticleId(node){
	if((node.nodeName == "ARTICLE") || (node.nodeName == "HTML")){
		return node.id;
	}
	return searchArticleId(node.parentNode);
}	

function countNodes(parentElement,nodeNameToCount){
	var containerCount = 0;
	var parentElementChilds = parentElement.childNodes;
	for(var i=0; i<parentElementChilds.length;++i){
    		if(parentElementChilds[i].nodeName == nodeNameToCount){
    			++containerCount;
    		}
    	}
	return containerCount;
}

function countTotalIssues(){
	var doNow = document.getElementById("now");
	var doLater = document.getElementById("later");
	var holdOn = document.getElementById("hold");

	var containerCountNow = countNodes(doNow, "DIV");
	var containerCountLater = countNodes(doLater, "DIV");
	var containerCountHold = countNodes(holdOn, "DIV");

	var totalIssues = containerCountNow + containerCountLater + containerCountHold;

	return totalIssues;
}

//Events

function allowDrop(e){
    e.preventDefault();
}

function drag(e){
	 e.dataTransfer.setData("text", e.target.id);
}
	
function drop(e){
    e.preventDefault();
    var myGroupId = myGroup(e.target);

    if(myGroupId != null){
    	var data = e.dataTransfer.getData("text");
    	var dropedBox = document.getElementById(data);
    	var dropedBoxGroupId = myGroup(dropedBox);

    	if((myGroupId == dropedBoxGroupId)){ //and a box está no mesmo grupo do que está sedo arrastado
    			
    		//switch, trocando articles entre divs slot para ordenar.
    		//pegando o Id da div que pai de dropedBox(article sendo arrastado) e standbox(article que será substituido)
    		var dropedBoxLineId = myGroupLine(dropedBox);
    		var standBoxLineId = myGroupLine(e.target);
    		//achando a Id da tag article, pois o article tem sub-tags e mesmo clicando nelas, o article inteiro será trocado.
    		var targetArticleId = searchArticleId(e.target);

    		//referencias para os slots, para fazer append dos articles que uero trocar 
    		var dropedBoxContainer = document.getElementById(dropedBoxLineId);
    		var standBoxContainer = document.getElementById(standBoxLineId);
    		var targetArticle = document.getElementById(targetArticleId);

    		//fazendo a troca.
    		dropedBoxContainer.appendChild(targetArticle);
    		standBoxContainer.appendChild(dropedBox);
    	}
    	else{
    		var group = document.getElementById(myGroupId); //Grupo para onde o article está indo
    		var dropedBoxLineId = myGroupLine(dropedBox); //id do container do elemento arrastado 
    		var dropedBoxContainer = document.getElementById(dropedBoxLineId);
    		var containerParent = dropedBoxContainer.parentNode;

    		containerParent.removeChild(dropedBoxContainer);
    		var containerCount = countNodes(group,"DIV");

    		var newContainer = $("<div></div>").attr('id', group.id + (containerCount+1)).append(dropedBox);
    		group.appendChild(newContainer[0]);
    	}
    }
}