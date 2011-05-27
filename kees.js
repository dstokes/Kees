/**
* TODOS
* Add keyup option
* 5/24
*/
var Kees = (function() {
    var shortcuts = [],
        pressed = [],
        ctrls = {'shift':16,'ctrl':17,'alt':18,'backspace':8,'tab':9,'enter':13,'pause':19,'capslock':20,'esc':27,'space':32,'pageup':33,'pagedown':34,'end':35,'home':36,'left':37,'up':38,'right':39,'down':40,'insert':45,'delete':46,'?':191};

    //Setup observers
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);

	function add(def, handler) {
        shortcuts.push({ def: def, keys: getKeys(def), cb: handler });
    }
    
    function remove(def) {
        for(var i = 0, p = [], l = shortcuts.length; i < l; i++)
            if(def !== shortcuts[i].def) p.push(pressed[i]);
        shortcuts = p;
    }

	//Parse shortcut definition for keycodes
    function getKeys(def) {
        var str = (def || '').split('+');
        for(var i = 0, keys = [], l = str.length; i < l; i++) {
	        //Get keycode from `ctrls` or  w/ charCodeAt
            var code = str[i] in ctrls ? ctrls[str[i]] : str[i].toUpperCase().charCodeAt();
            keys.push(code);
        }
        
        //Sort for later arr comparison
        return keys.sort();
    }


    function keyDownHandler(e) {
	    //If the key isnt in the pressed array, add it
        if(!~pressed.indexOf(e.keyCode))
            pressed.push(e.keyCode);
        pressed.sort();
        checkShortcuts(e);
    }

    function keyUpHandler(e) {
        for(var i = 0, p = [], l = pressed.length; i < l; i++)
            if(pressed[i] != e.keyCode) p.push(pressed[i]);
        pressed = p;
    }
    
    function checkShortcuts(e) {
	    //Check / execute shortcuts matching pressed arr
        for(var i = 0, l = shortcuts.length; i < l; i++) {
            var keys = shortcuts[i].keys;
            if(arraysEqual(keys, pressed)) {
                e.preventDefault();
                shortcuts[i].cb();
            }
        }
    }
    
    function arraysEqual(a, b) {
        return (!!a && !!b) && a.toString() === b.toString();
    }

    return { add: add, remove: remove };

})();