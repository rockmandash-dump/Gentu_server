//使用express的模組 express可以協助建立API
var express = require('express');
//使用mongodb的模組 mongodb可以協助與資料庫連線
var mongodb = require('mongodb');
//使用moment的模組 moment可以協助與資料庫連線
var moment = require('moment');
//初始化express，並儲存於變數app中
var app = express();
//宣告變數，負責mongodb的連線位址 joseph是王智永的帳號，kerkerker是密碼
var bodyParser = require("body-parser");
//var uri = 'mongodb://joseph:kerkerker@ds037272.mongolab.com:37272/postdb';
var uri = 'mongodb://gentu_admin:1234@ds029824.mongolab.com:29824/gentu_server';
//宣告變數database，負責mongodb連 線成功後，儲存db實體
var database;

//public資料夾可以直接存取
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


//開始進行與mongodb的連線
mongodb.MongoClient.connect(uri, function(err, db) { //參數1 填入mongodb的位址 參數2 填寫事件監聽器
  if (err) {
    console.log('connect mongo db error ' + err);//如果err有回傳，表示出錯 使用console.log印出錯誤
  } else {
    console.log('connect mongo db success');
    database = db;//若是沒有出錯，表示連線成功 用變數database儲存db實體
  }
});
/*
app.post('/api/insertPost', function(request, response) {
  //針對連線此API傳入的參數進行檢查 若是空的，就呼叫function __sendErrorResponse()
  if (!request.query.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var userID = request.query.userID;
  var userName = request.query.userName;
  var title = request.query.title;//取出傳入的參數，存在變數title中
  var description = request.query.description;
  var categorie = request.query.categorie;
  var imgLocation = request.query.imgLocation;
  var timeMillis = moment();//使用moment()就可以取得目前 server時間的微秒
  var time = timeMillis.format('MM/DD hh:mm:ss');//將微秒轉為人眼可讀的字串 格式是「月份/天 小時:分鐘:秒」
  //組成要存入mongodb的格式
  var insert = {
    _id: timeMillis.unix(),
    userID: userID,
    userName: userName,
    title: title,
    description: description,
    categorie: categorie,
    imgLocation: imgLocation,
    time: time
  };
  var items = database.collection('post');//使用資料庫的collection post_history

  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});
*/

app.post('/api/insertPost',function(request,response){
  if (!request.body.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var userID = request.body.userID;
  var userName = request.body.userName;
  var title = request.body.title;//取出傳入的參數，存在變數title中
  var description = request.body.description;
  var categorie = request.body.categorie;
  var imgLocation = request.body.imgLocation;
  var timeMillis = moment();//使用moment()就可以取得目前 server時間的微秒
  var time = timeMillis.format('MM/DD hh:mm:ss');//將微秒轉為人眼可讀的字串 格式是「月份/天 小時:分鐘:秒」
  //組成要存入mongodb的格式
  var insert = {
    _id: timeMillis.unix(),
    userID: userID,
    userName: userName,
    title: title,
    description: description,
    categorie: categorie,
    imgLocation: imgLocation,
    time: time
  };
  var items = database.collection('post');//使用資料庫的collection post_history
  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});

app.get('/api/insertMember', function(request, response) {
  //針對連線此API傳入的參數進行檢查 若是空的，就呼叫function __sendErrorResponse()
  if (!request.query.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var userID = request.query.userID;
  var userName = request.query.userName;
  var password = request.query.password;
  var insert = {
    userID: userID,
    userName: userName,
    password: password
  };
  var items = database.collection('member');

  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});

app.get('/api/insertLike', function(request, response) {
  //針對連線此API傳入的參數進行檢查 若是空的，就呼叫function __sendErrorResponse()
  if (!request.query.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var _id = request.query._id;
  var userID = request.query.userID;
  var insert = {
    _id: _id,
    userID: userID

  };
  var items = database.collection('like');

  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});

app.get('/api/insertDislike', function(request, response) {
  //針對連線此API傳入的參數進行檢查 若是空的，就呼叫function __sendErrorResponse()
  if (!request.query.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var _id = request.query._id;
  var userID = request.query.userID;
  var insert = {
    _id: _id,
    userID: userID

  };
  var items = database.collection('dislike');

  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});

app.get('/api/insertComment', function(request, response) {
  //針對連線此API傳入的參數進行檢查 若是空的，就呼叫function __sendErrorResponse()
  if (!request.query.userID) {
    __sendErrorResponse(response, 403, 'No query parameters value');
    return;
  }
  var _id = request.query._id;
  var userID = request.query.userID;
  var userName = request.query.userName;
  var content = request.query.content;
  var insert = {
    _id: _id,
    userID: userID,
    userName: userName,
    content: content

  };
  var items = database.collection('comment');

  //將剛剛準備好的資料存到資料庫的 post_history 資料表中
  //註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
  items.insert(insert, function(err, result) {
    //若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
    if (err) {
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(result);
      response.end();
    }
  });
});

// app.get('/api/queryPost', function(request, response) {
//   var items = database.collection('post');//取得MongoDB的collection
//   //從連線進來的request找到參數limit 並以10進位的方式轉成字串
//   //要是沒有帶入limit的參數 則以100為預設
//   var limit = parseInt(request.query.limit, 10) || 100;

//   //開始搜尋collection
//   //設定排序條件，排序條件為 新→舊
//   //設定搜尋結果數量
//   //將整個搜尋結果轉為陣列
//   //註冊事件監聽器 搜尋結果轉換成陣列後監聽器會被觸發
//   items.find().sort({$natural: -1}).limit(limit).toArray(function (err, docs) {
//     //若事件觸發器收到有錯誤，就使用 __sendErrorResponse()回傳錯誤
//     if (err) {
//       console.log(err);
//       __sendErrorResponse(response, 406, err);
//     } else {
//       //若沒有收到錯誤表示搜尋成功 回給使用者MongoDB回傳的搜尋結果 並且結束使用者的連線
//       response.type('application/json');
//       response.status(200).send(docs);
//       response.end();
//     }
//   });
// });

app.get('/api/queryPost', function(request, response) {
  var items = database.collection('post');//取得MongoDB的collection
  //從連線進來的request找到參數limit 並以10進位的方式轉成字串
  //要是沒有帶入limit的參數 則以100為預設
  var limit = parseInt(request.query.limit, 10) || 100;

  //開始搜尋collection
  //設定排序條件，排序條件為 新→舊
  //設定搜尋結果數量
  //將整個搜尋結果轉為陣列
  //註冊事件監聽器 搜尋結果轉換成陣列後監聽器會被觸發
  items.find().forEach(
      function(newPost){
        newPost.userID=database.member.findOne({"userID":newPost.userID});
        database.PostReloaded.insert(newPost);
      }
    );
  
  database.PostReloaded.find().sort({$natural: -1}).limit(limit).toArray(function (err, docs) {
    //若事件觸發器收到有錯誤，就使用 __sendErrorResponse()回傳錯誤
    if (err) {
      console.log(err);
      __sendErrorResponse(response, 406, err);
    } else {
      //若沒有收到錯誤表示搜尋成功 回給使用者MongoDB回傳的搜尋結果 並且結束使用者的連線
      response.type('application/json');
      response.status(200).send(docs);
      response.end();
    }
  });
});


//對express註冊靜態網頁的位置 在專案資料夾下的public資料夾
app.use(express.static(__dirname + '/public'));
//針對express伺服器程式 做一些附加設定
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


//啟動伺服器 若伺服器有預設port，就用預設的port 沒有預設的port就開在5000
app.listen(process.env.PORT || 5000);

function __sendErrorResponse(response, code, content) {
  var ret = {
    err: code,
    desc : content 
  };
  response.status(code).send(ret);
  response.end();
}