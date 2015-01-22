#!/usr/bin/env node

var process = require('process'),
    args = process.argv,
    CSVReader = require('./lib/csv-reader'),
    QRImage = require( './lib/qrcode-image-generator' ),
    Util = require('findhit-util'),
    fs = require('fs'),
    mkpath = require('mkpath'),
    path = require('path'),
    qrCodeGenerator = module.exports = {},

    DS = path.sep,
    __file_ext = 'svg';


var generateCodes =
    qrCodeGenerator.generateCodes =
    function( csvList, savePath ){
        var reader = fs.createReadStream( csvList );

        CSVReader.readLine( reader , function processLine( filename, siteUrl ){
            console.log(savePath + DS + filename + '.' + __file_ext);
                var writer = fs.createWriteStream(
                     savePath + filename + '.' + __file_ext
                );

                QRImage.generate( writer, siteUrl , function(){
                    console.log( filename, siteUrl );
                    console.log('-> QR Code generated for ',filename);
                } );
            },
            function processFinished(){
                console.log('All lines processed');
            }
        );
};

var _csvList = '',
    _imgPath = 'qr_images';

if(args.length == 2){
    console.error('missing csv list to process');
    return;
}

_csvList = args[2];

if(args.length == 4){
    _imgPath = args[3];
    if(_imgPath[0] != DS)
        _imgPath = path.dirname(_csvList) + DS + _imgPath;
}
else
    _imgPath = path.dirname(_csvList) + DS + _imgPath;

path.normalize(_imgPath);

if(_imgPath[_imgPath.length - 1] != DS)
    _imgPath += DS;

if ( !fs.existsSync(_imgPath) ) {
    mkpath.sync(_imgPath, 0755);
}
generateCodes( _csvList, _imgPath );
