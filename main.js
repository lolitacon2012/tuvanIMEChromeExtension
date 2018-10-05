(function() {
	var isRunning = false;
	var willChangeRunningState = false;
	var timerId = null;
	var shiftHold = false;
	var mouseX = 0;
	var mouseY = 0;
	var waitingForSecondary = false;
	var firstKey = "";
	var indicator = document.createElement("div");
	document.body.appendChild(indicator);
	indicator.style.position = "fixed"
	indicator.style.pointerEvents = "none"
	indicator.innerText = "Тв"
	indicator.style.width = "10px"
	indicator.style.height = "7px"
	indicator.style.fontSize = "5px"
	indicator.style.lineHeight = "7px"
	indicator.style.background = "black"
	indicator.style.textAlign = "center"
	indicator.style.color = "white"
	indicator.style.zIndex = "99999"
	indicator.style.display = isRunning ? "block" : "none";

	function commitToInput(event, toAppend, isReplace) {
		//isReplace not used
		var selectionEnd = event.target.selectionEnd
		var selectionStart = event.target.selectionStart
		var existingString = event.target.value
		if (event.target.tagName.toUpperCase() == 'INPUT' || event.target.tagName.toUpperCase() == 'TEXTAREA') {
			event.target.value = existingString.substring(0, selectionStart) + (event.shiftKey ? toAppend.toUpperCase() : toAppend) + existingString.substring(selectionEnd, existingString.length);
			setCaretPosition(event.target, selectionStart + toAppend.length)
		}
	}

	function getOriginLetter(input) {
		return !!singleKeyMapping[input] ? singleKeyMapping[input] : doubleKeyMapping[input][input];
	}

	function setCaretPosition(elem, caretPos) {
		if (elem != null) {
			if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.move('character', caretPos);
				range.select();
			} else {
				if (elem.selectionStart) {
					elem.focus();
					elem.setSelectionRange(caretPos, caretPos);
				} else
					elem.focus();
			}
		}
	}

	var singleKeyMapping = {
		a: "а",
		d: "д",
		q: "я",
		w: "ш",
		e: "е",
		r: "р",
		t: "т",
		i: "и",
		p: "п",
		f: "ф",
		g: "г",
		h: "х",
		k: "к",
		l: "л",
		z: "з",
		x: "ж",
		v: "в",
		b: "б",
		m: "м",
		hs_l: "ъ",
		ss_l: "ь",
		hs_u: "ъ",
		ss_u: "ь",
	}

	var doubleKeyMapping = {
		y: {
			y: "ы",
			u: "ю",
			o: "ё",
			e: "э",
			u: "ю"
		},
		c: {
			c: "ц",
			h: "ч"
		},
		j: {
			o: "ё",
			e: "э",
			u: "ю",
			j: "й"
		},
		s: {
			s: "с",
			c: "щ"
		},
		u: {
			u: "у",
			h: "ү"
		},
		o: {
			o: "о",
			h: "ө"
		},
		n: {
			n: "н",
			g: "ң"
		}
	}

	document.addEventListener("keydown", function(event) {
		var currentKey = event.key;
		if (currentKey == "'") {
			currentKey = "ss_l"
		} else if (currentKey == "`") {
			currentKey = "hs_l"
		} else if (currentKey == "\"") {
			currentKey = "ss_u"
		} else if (currentKey == "~") {
			currentKey = "hs_u"
		}
		var currentKeyLower = !!currentKey ? currentKey.toLowerCase() : "";
		if (event.ctrlKey || event.altKey || event.metaKey) {
			return;
		}
		if (event.keyCode == 16 && !shiftHold) {
			shiftHold = true;
			if (willChangeRunningState) {
				isRunning = !isRunning;
				indicator.style.display = isRunning ? "block" : "none";
				if (!!timerId) {
					clearTimeout(timerId);
					timerId = null;
					willChangeRunningState = false;
				}
			} else {
				willChangeRunningState = true;
				timerId = setTimeout(function() {
					willChangeRunningState = false;
				}.bind(this), 300)
				return;
			}
		}
		if (!isRunning) {
			return;
		}
		if (!waitingForSecondary && !!doubleKeyMapping[currentKeyLower]) {
			event.stopPropagation();
			event.preventDefault();
			waitingForSecondary = true;
			firstKey = currentKeyLower;
		} else if (waitingForSecondary) {
			event.stopPropagation();
			event.preventDefault();
			waitingForSecondary = false;
			var currentKeyMapping = doubleKeyMapping[firstKey];
			if (currentKeyMapping[currentKeyLower]) {
				commitToInput(event, currentKeyMapping[currentKeyLower]);
			} else {
				commitToInput(event, getOriginLetter(firstKey) + getOriginLetter(currentKeyLower));
			}
			firstKey = "";
		} else if (!!singleKeyMapping[currentKeyLower]) {
			event.stopPropagation();
			event.preventDefault();
			commitToInput(event, singleKeyMapping[currentKeyLower]);
		}
	}, true);
	document.addEventListener("keyup", function(event) {
		if (event.keyCode == 16 && shiftHold) {
			shiftHold = false;
		}
	}, true)
	window.addEventListener('mousemove', function(event) {
		x = event.clientX;
		y = event.clientY;
		if (typeof x !== 'undefined') {
			indicator.style.left = (x + 10) + "px";
			indicator.style.top = (y - 1) + "px";
		}
	}, false);
})();