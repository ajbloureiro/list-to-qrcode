var writer = module.exports = {},
QRImage = require('qr-image'),
Util = require('findhit-util')
;

/**
 * Generates a QRImage and returns an SVG based on the msg text
 * @param  {String}  msg
 * @return {SVGImage} Generated SVG Image readable Stream
 */
 writer.generate = function( writer, msg , fnEnd ){
    var qr_svg = QRImage.image( msg , { ec_level: 'H', type: 'svg' });
    qr_svg.pipe(
        writer
    );
    qr_svg.on('end', function() {
        if(Util.is.Function(fnEnd))
            fnEnd();
    });
};
