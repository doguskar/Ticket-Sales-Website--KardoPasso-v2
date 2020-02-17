dkNavigator = function(e){
	var dkNavDefs = {
		id: "dk-nav",
		navbtnId: "dk-navbtn",
		navTop: 0,
		//articleId: "container",
		//type: "advanced",
		//theme: "dark-theme",
		zIndex: 1000 // header's zIndex -1
	}
	//control nav id
	if(e.id != undefined)
		if(typeof e.id != "string")
			throw "error: dk-nav undefined id";
	var ele = document.getElementById((e.id == undefined)? dkNavDefs.id: e.id)
	if(ele == undefined)
			throw "error: dk-nav undefined id";
	//control navbtn id
	if(e.navbtnId != undefined)
		if(typeof e.navbtnId != "string")
			throw "error: navbtnId is not valid";
	var navbarEle = document.getElementById((e.navbtnId == undefined)? dkNavDefs.navbtnId: e.navbtnId)
	if(navbarEle == undefined)
			throw "error: navbtnId is not valid";
	//control navTop
	if(e.navTop != undefined)
		if(typeof e.navTop != "number")
			throw "error: navTop is not valid";
	var navTopPx = (e.navTop == undefined)? dkNavDefs.navTop: e.navTop;
	if(navbarEle == undefined)
			throw "error: navTop is not valid";
	//control article section id
	var articleEle = document.getElementById(e.articleId)
	if(e.articleId != undefined && articleEle == undefined)
			throw "error: articleId is not valid";
	//control zIndex
	if(e.zIndex != undefined)
		if(typeof e.zIndex != "number")
			throw "error: zIndex is not valid";
	var navZIndex = (e.navTop == undefined)? dkNavDefs.zIndex: e.zIndex;

	//create overlay
	var dkNavOverlay = document.createElement("div");
	dkNavOverlay.setAttribute("id", (e.id + "-overlay"));
	dkNavOverlay.setAttribute("class", "dk-nav-overlay");
	ele.insertAdjacentElement("beforebegin", dkNavOverlay);
	//nav obj
	dkNav = {
		id: e.id,
		el: ele,
		navbarEl: navbarEle,
		overlayEle: dkNavOverlay,
		navTop: navTopPx,
		zIndex: navZIndex,
		type: e.type,
		theme: e.theme,
		articleEl: articleEle,
		navHeaderBtn: ele.getElementsByClassName("dk-nav-header-btn")[0],
		toggleCSt(){
			dkNav.el.classList.toggle("cSt");
			dkNav.overlayEle.classList.toggle("cSt");
			if(dkNav.articleEl != undefined)
					dkNav.articleEl.classList.toggle("dk-nav-cSt");
		},
		activeSubLi(){
			var liChilds = this.children;
			for(var i = 0; i < liChilds.length; i++){
				if(liChilds[i].tagName == "UL"){
					if(liChilds[i].classList.contains("active")){
						this.classList.remove("active")
						liChilds[i].classList.remove("active");
						liChilds[i].style.maxHeight = null;
					}else{
						this.classList.add("active")
						liChilds[i].classList.add("active");
						liChilds[i].style.maxHeight = liChilds[i].scrollHeight + "px";
					}
					break;
				}
			}
		}
	};
	//add listeners
	dkNav.navbarEl.addEventListener("click", dkNav.toggleCSt);
	dkNav.overlayEle.addEventListener("click", dkNav.toggleCSt);
	dkNav.navHeaderBtn.addEventListener("click", dkNav.toggleCSt);
	//nested links
	var navChilds = dkNav.el.children;
	for(var i = 0; navChilds.length > i; i++){
		if(navChilds[i].tagName == "UL"){
			var ulChilds = navChilds[i].children;
			for(var k = 0; ulChilds.length > k; k++){
				var liChilds = ulChilds[k].children;
				for(var j = 0; liChilds.length > j; j++){
					if(liChilds[j].tagName == "UL"){
						ulChilds[k].classList.add("dk-nav-nested");
						ulChilds[k].addEventListener("click", dkNav.activeSubLi);
					}
				}
			}
		}	
	}
	//add style
	var styleEl = document.createElement("style");
	styleEl.innerHTML = ':root{--nav-top: ' + dkNav.navTop + 'px;}\n';
	if(dkNav.zIndex != undefined){
		styleEl.innerHTML += 'nav.dk-nav{z-index:' + (dkNav.zIndex+1) + ';}nav.dk-nav.advanced{z-index:' + dkNav.zIndex + ';}.dk-nav-overlay{z-index:' + (dkNav.zIndex+1) + ';}.dk-nav-overlay.advanced{z-index:' + dkNav.zIndex + ';}@media only screen and (max-width: 767px){nav.dk-nav.advanced{z-index:' + (dkNav.zIndex+1) + ';}.dk-nav-overlay.advanced{z-index:' + (dkNav.zIndex+1) + ';}';
	}
	if(dkNav.type != undefined){
		dkNav.el.classList.add(dkNav.type);
		dkNav.overlayEle.classList.add(dkNav.type);
	}else{
		styleEl.innerHTML += ':root{--nav-top:0px;}\n';
	}
	if(dkNav.theme != undefined)
		dkNav.el.classList.add(dkNav.theme);
	
	document.head.appendChild(styleEl);
	
}