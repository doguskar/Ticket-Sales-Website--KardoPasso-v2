/*close-btn*/
var closeable = document.querySelectorAll("[data-closeable]");
closeable.forEach(function(e){
	e.addEventListener("click", function(){
		var ele = document.getElementById(this.getAttribute("data-closeable"));
		ele.parentNode.removeChild(ele);
	});
});
/*close-btn end*/
/*dk-accordion-content*/
var accs = document.querySelectorAll(".dk-accordion-content");
accs.forEach(function(e){
	var headEle = e.querySelector(".dk-acc-header");
	headEle.addEventListener("click", function(){
		var content = this.nextElementSibling;
		if(this.parentNode.classList.contains("active")){
			this.parentNode.classList.remove("active");
			content.style.maxHeight = null;
		}else{
			this.parentNode.classList.add("active");
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
})
/*dk-accordion-sec content*/
/*TextInputEffects*/
var inputs = document.querySelectorAll(".input__field");
inputs.forEach(function(e){
	e.addEventListener("blur", function(){
		if(e.value == undefined || e.value == null || e.value == "")
			e.parentNode.classList.remove("input--filled");
	})
	e.addEventListener("focus", function(){
		if(!e.parentNode.classList.contains("input--filled"))
			e.parentNode.classList.add("input--filled");
	})
});
/*TextInputEffects*/
