/**
* TODOS
* Add remove function
* Add keyup option
* Improve pressed tracking
* Simplify array comparison in arraysEqual
* 5/24
*/
var Kees = (function() {
    var shortcuts = [],
        pressed = [],
        ctrls = {
	        'shift':16,
	        'ctrl':17,
	        'alt':18,
	        'backspace':8,
	        'tab':9,
	        'enter':13,
	        'pause':19,
	        'capslock':20,
	        'esc':27,
		    'space':32,
		    'pageup':33,
		    'pagedown':34,
		    'end':35,
		    'home':36,
		    'left':37,
		    'up':38,
		    'right':39,
		    'down':40,
		    'insert':45,
		    'delete':46,
		    '?':191
		};

    //Setup observers
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);

    //Add a key combo to the list
    function add(def, handler) {
        shortcuts.push({
            keys: parseDef(def),
            cb: handler
        });
    }

    //Parse shortcut definition
    function parseDef(def) {
        var str = (def || '').split('+'),
            keys = [];

        for (var i = 0, l = str.length; i < l; i++) {
            var code = str[i] in ctrls ? ctrls[str[i]] : str[i].toUpperCase().charCodeAt();
            keys.push(code);
        }
        return keys.sort();
    }

    function keyDownHandler(e) {
        if(!(~pressed.indexOf(e.keyCode)))
            pressed.push(e.keyCode);
        
        checkShorts(e);
    }

    function keyUpHandler(e) {
        var p = [];
        for(var i = 0, l = pressed.length; i < l; i++)
            if(pressed[i] != e.keyCode) p.push(pressed[i]);
        pressed = p;
    }
    
    //Check pressed against defined shortcuts
    function checkShorts(e) {
        for(var i = 0, l = shortcuts.length; i < l; i++) {
            var keys = shortcuts[i].keys;
            if(arraysEqual(keys, pressed)) {
                e.preventDefault();
                shortcuts[i].cb();
            }
        }
    }
    
    //Compare pressed array and shortcut array
    function arraysEqual(a, b) {
        if(!a || !b) return false;
        if(a.length !== b.length) return false;
        for(var i = 0, l = a.length; i < l; i++) {
            if(a[i] !== b[i]) return false;
        }
        return true;
    }

    return { add: add };

})();