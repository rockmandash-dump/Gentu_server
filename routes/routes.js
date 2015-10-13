var chgpass = require('config/chgpass');
var register = require('config/register');
var login = require('config/login');
var mongoDatabase = require('cofig/models');


module.exports = function(app) {



	app.get('/', function(req, res) {

		res.end("Gentu-Server");
	});


	app.post('/login', function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		login.login(email, password, function(found) {
			console.log(found);
			res.json(found);
		});
	});


	app.post('/register', function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		register.register(email, password, function(found) {
			console.log(found);
			res.json(found);
		});
	});


	app.post('/api/chgpass', function(req, res) {
		var id = req.body.id;
		var opass = req.body.oldpass;
		var npass = req.body.newpass;

		chgpass.cpass(id, opass, npass, function(found) {
			console.log(found);
			res.json(found);
		});
	});


	app.post('/api/resetpass', function(req, res) {

		var email = req.body.email;

		chgpass.respass_init(email, function(found) {
			console.log(found);
			res.json(found);
		});
	});


	app.post('/api/resetpass/chg', function(req, res) {

		var email = req.body.email;
		var code = req.body.code;
		var npass = req.body.newpass;

		chgpass.respass_chg(email, code, npass, function(found) {
			console.log(found);
			res.json(found);
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
		var items = mongoDatabase.database.collection('member');

		//將剛剛準備好的資料存到資料庫的 post_history 資料表中
		//註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
		items.insert(insert, function(err, result) {
			//若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
			if (err) {
				__sendErrorResponse(response, 406, err);
			}
			else {
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
		var items = mongoDatabase.database.collection('like');

		//將剛剛準備好的資料存到資料庫的 post_history 資料表中
		//註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
		items.insert(insert, function(err, result) {
			//若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
			if (err) {
				__sendErrorResponse(response, 406, err);
			}
			else {
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
		var items = mongoDatabase.database.collection('dislike');

		//將剛剛準備好的資料存到資料庫的 post_history 資料表中
		//註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
		items.insert(insert, function(err, result) {
			//若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
			if (err) {
				__sendErrorResponse(response, 406, err);
			}
			else {
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
		var items = mongoDatabase.database.collection('comment');

		//將剛剛準備好的資料存到資料庫的 post_history 資料表中
		//註冊事件接收器，當資料存入到DB的動 作完成後，事件接收器會被觸發
		items.insert(insert, function(err, result) {
			//若事件觸發器收到有錯誤，就使用__sendErrorResponse()回傳錯誤
			if (err) {
				__sendErrorResponse(response, 406, err);
			}
			else {
				//若沒有收到錯誤表示儲存成功 回給使用者MongoDB回傳的內容 並且結束使用者的連線
				response.type('application/json');
				response.status(200).send(result);
				response.end();
			}
		});
	});

	app.get('/api/queryPost', function(request, response) {
		var items = mongoDatabase.database.collection('post'); //取得MongoDB的collection
		//從連線進來的request找到參數limit 並以10進位的方式轉成字串
		//要是沒有帶入limit的參數 則以100為預設
		var limit = parseInt(request.query.limit, 10) || 100;

		//開始搜尋collection
		//設定排序條件，排序條件為 新→舊
		//設定搜尋結果數量
		//將整個搜尋結果轉為陣列
		//註冊事件監聽器 搜尋結果轉換成陣列後監聽器會被觸發
		items.find().sort({
			$natural: -1
		}).limit(limit).toArray(function(err, docs) {
			//若事件觸發器收到有錯誤，就使用 __sendErrorResponse()回傳錯誤
			if (err) {
				console.log(err);
				__sendErrorResponse(response, 406, err);
			}
			else {
				//若沒有收到錯誤表示搜尋成功 回給使用者MongoDB回傳的搜尋結果 並且結束使用者的連線
				response.type('application/json');
				response.status(200).send(docs);
				response.end();
			}
		});
	});

	function __sendErrorResponse(response, code, content) {
		var ret = {
			err: code,
			desc: content
		};
		response.status(code).send(ret);
		response.end();
	}


};
