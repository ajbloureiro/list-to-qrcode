var reader = module.exports = {},
    csv = require('fast-csv'),
    Util = require('findhit-util')
;

reader.readLine = function (stream, fn , fnEnd){
    csv.fromStream(stream, {headers : true})
        .on("data", function(data){
            var elements = [];
            Util.forEach(data,function(data){
                elements.push(data);
            });

            fn( elements[0], elements[1] );
        })
        .on("end", function(){
            if(Util.is.Function(fnEnd))
                fnEnd();
        });
};
