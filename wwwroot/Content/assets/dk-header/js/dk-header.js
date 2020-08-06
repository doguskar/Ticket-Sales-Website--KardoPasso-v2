


var dd_click;
var dropdowns = document.querySelectorAll("[data-dropdown]");
document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		dropdowns.forEach(function (e) {
			e.addEventListener("click", dkDropdown)
		});
	}
};
function dkDropdown() {
	var dropdowns = document.querySelectorAll("[data-dropdown]");
	dropdowns.forEach(function (e) {
		if (e.classList.contains("active")) {
			var ele = document.getElementById(e.getAttribute("data-dropdown"));
			e.classList.remove("active");
			ele.classList.remove("active");
		}
	});
	var dropdownId = this.getAttribute("data-dropdown");
	var ele = document.getElementById(dropdownId);
	this.classList.toggle("active");
	ele.classList.toggle("active");
	dd_click = 1;
}
document.addEventListener("click", clicks);
function clicks(e) {
	if (dd_click == 1) {
		dd_click = 2;
	}
	else if (dd_click == 2) {
		dd_click = 0;
		var dropdowns = document.querySelectorAll("[data-dropdown]");
		dropdowns.forEach(function (e) {
			if (e.classList.contains("active")) {
				var ele = document.getElementById(e.getAttribute("data-dropdown"));
				e.classList.remove("active");
				ele.classList.remove("active");
			}
		});
	}
}

