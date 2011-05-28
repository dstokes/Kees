<!DOCTYPE HTML />
<html>
 <head></head>
 <body>
 <p id="out"></p>
 
 <script type="text/javascript" src="../src/kees.js"></script>
 <script type="text/javascript">
	 Kees.add('ctrl+a', function() { 
		 document.getElementById('out').innerHTML += 'Pressed ctrl+a<BR />';
	 });
	 Kees.add('ctrl+r', function() {
         Kees.remove('ctrl+a', 'down');
	 });
 </script>
 </body>
</html>
