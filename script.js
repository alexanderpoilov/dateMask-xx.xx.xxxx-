'use strict';

function maskPhone(selector, masked) { 
	
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		// console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i != -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type == "blur" && this.value.length < 5) {
			this.value = "";
		}
	
		if (this.value.length > 10) {
			return value.substring(0, 10);
	}
	switch (this.value.length) {
			case 1: 
					if (this.value > 3) {
							this.value = "3";
					}
					break;
			case 2: 
			case 3:
					if (+this.value.slice(0, 2) > 31) {
						this.value = "31-";
					}
					break;
			case 4:
					if (this.value[2] !== "-") {
							this.value = this.value.substr(0, 2) + "-" + this.value[2];
					}
					if (this.value[3] > 1) {
							this.value = this.value.substr(0, 3) + "1";
					}
					break;
			case 5: 
					if (this.value.substr(3, 2) > 12) {
							this.value = this.value.substr(0, 3) + "12";
					}
					break;
			case 6:
			case 7:
					if (this.value[5] !== "-") {
							this.value = this.value.substr(0, 5) + "-" + this.value[5];
					}
					if (this.value[6] < 1) {
							this.value = this.value.substr(0, 6) + "1";
					}
					break;
			default: 
					break;
	}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
}

maskPhone('input', '__-__-____');