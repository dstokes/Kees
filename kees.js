var Kees = (function() {
    var shortcuts = [],
        pressed = [],
        ctrls = {'shift':16,'ctrl':17,'alt':18,'backspace':8,'tab':9,'enter':13,'pause':19,'capslock':20,'esc':27,'space':32,'pageup':33,'pagedown':34,'end':35,'home':36,'left':37,'up':38,'right':39,'down':40,'insert':45,'delete':46,'?':191};

    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('keydown', keyDownHandler, false);

	function add(def, handler, evt) {
		if(!def) return false;
		var mode = evt || 'down';
        shortcuts.push({ def: def, keys: getKeys(def), cb: handler, mode: mode });
    }
    
    function remove(def) {
        for(var i = 0, p = [], l = shortcuts.length; i < l; i++)
            if(def !== shortcuts[i].def) p.push(pressed[i]);
        shortcuts = p;
    }

    function getKeys(def) {
        var chnk = (def || '').split('+'),
	        keys = [];
	        
        for(var i = 0, l = chnk.length; i < l; i++) {
            keys.push(chnk[i] in ctrls ? ctrls[chnk[i]] : chnk[i].toUpperCase().charCodeAt());
        }
        return keys.sort();
    }

    function keyDownHandler(e) {
        if(!~pressed.indexOf(e.keyCode)) {
	        pressed.push(e.keyCode);
	    }
        pressed.sort();
        checkShortcuts(e, 'down');
    }

    function keyUpHandler(e) {
        checkShortcuts(e, 'up');
        for(var i = 0, p = [], l = pressed.length; i < l; i++)
            if(pressed[i] != e.keyCode) p.push(pressed[i]);
        pressed = p;
    }
    
    function checkShortcuts(e, mode) {
        for(var i = 0, l = shortcuts.length; i < l; i++) {
            if(arraysEqual(shortcuts[i].keys, pressed) && shortcuts[i].mode == mode) {
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

Kees.add('ctrl+a', function() { console.log('ctrl+a'); }, 'up');
Kees.add('a+b+c', function() { console.log('abc'); }, 'up');