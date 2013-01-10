
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ダッドリーメモメモ' });
};

exports.test = function(req, res){
    var name = "name";
    if(req.query.name){
        name = req.query.name;
        console.log("this is get");
    }
    if(req.body.name){
        name = req.body.name;
        console.log("this is post");
    }
    res.render('test', { title: 'test',locals: {name: name} });
};