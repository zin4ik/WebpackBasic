import '../scss/main.scss'

import '../bootstrap-castum/castum-bootstrap.js'

console.log('yes');


jQuery(document).ready(function($){
    $('h1').css('color','red');
})

let options = {
	id: 'elem',
	color: 'blue',
	border: '1px solid red',
	font: '15px Arial'
};

function func({id, color = 'blue', border='1px dotted red', font='15px Tahoma'}) {
	let e = document.getElementById(id);
	let str = 'color:'+color+'; border:'+border+'; font:'+font;
	e.style.cssText = str;
}

func(options);
