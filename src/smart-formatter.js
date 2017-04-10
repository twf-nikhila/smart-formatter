/*!
 * Smart Formatter v0.0.1 (https://github.com/twf-nikhila/smart-formatter)
 * Copyright The Web Fosters
 * Licensed Apache License (https://github.com/twf-nikhila/smart-formatter/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') { throw new Error('Smart Formatter requires jQuery') }

$.extend( $.fn, {

	smart_format: function( options ) {
        
		if ( !this.length ) {
            console.warn( "Nothing selected, can't format, returning nothing." );
			return;
		}
        
        var input_elements = $( this ).find( "input, select, textarea" );
        
        input_elements.each( function() {
            element = $( this );
            var options = element.attr( 'sf' );
            
            options = options.split( " " );
            
            options.forEach( function( currentValue, index, arr ) {
                formatter( currentValue, element );
            });
            
        });
        
    }
    
});

function formatter( formattype, element ) {
    
    switch( formattype ) {
        
        //Transform all into uppercase
        case 'uc':
            element.css( 'text-transform', 'uppercase' );
            break;
        
        //Transform only first character of each word into uppercase
        case 'ucfirst':
            element.css( 'text-transform', 'capitalize' );
            
            break;
        
        //Transform the sentence into sentence case, capitalize word after (., ?, !)
        case 'sc':
            element.on( 'input', function (evt) {
                var re = /(^|[.!?]\s+)([a-z])/g;
                var val = $(evt.target).val().replace( re, function ( m, $1, $2 ) {
                    return $1 + $2.toUpperCase();
                });
                $( evt.target ).val( val );
            });
            
            break;
        
        //Transform all into lowercase
        case 'lc':
            element.css('text-transform', 'lowercase');
            
            break;
        
        //Allow only numbers in input fields
        case 'numbers':
            element.on( 'keypress', function (evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if ( charCode > 31 && (charCode < 48 || charCode > 57) )
                    return false;
                else
                    return true;
            });
            
            break;
        
        //Converts input field value into money format.
        case 'money':
            //TODO: Accept dynamic seperator and decimal symbols to support European format
            
            element.on( 'keypress', function (evt) {
                var charCode = ( evt.which ) ? evt.which : event.keyCode
                if ( charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44 && charCode != 46 )
                    return false;
                else
                    return true;
            });
            
            element.on( 'change', function (evt) {
                var n = $( this ).val().replace (/,/g, ""), 
                    c = isNaN(c = Math.abs(c)) ? 2 : c, 
                    d = d == undefined ? "." : d, 
                    t = t == undefined ? "," : t, 
                    s = n < 0 ? "-" : "", 
                    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
                    j = (j = i.length) > 3 ? j % 3 : 0;
                    
                var value =  s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                $( this ).val(value);
            });
            
            break;
        
        //When input field is clicked select all value of it
        case 'select-all':
            element.on( 'focus', function (evt) {
                $(this).select();
            });
            
            break;
        
        default:
            console.log( formattype + ' is invalid formatter option' );
    }
    
};