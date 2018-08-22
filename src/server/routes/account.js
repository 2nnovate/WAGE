import express from 'express';
import Account from '../models/account'; //mongoose 모델 임포트
import mongoose from 'mongoose';
import bkfd2Password from 'pbkdf2-password';
const hasher = bkfd2Password();

const router = express.Router();
/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "email": "test", "password": "test" }
    ERROR CODES:
        1: BAD email
        2: BAD PASSWORD
        3: EMAIL EXISTS
*/
router.post('/signup', (req, res) => {
    // CHECK email
    let emailRegexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if(!emailRegexp.test(req.body.email)) {
        return res.status(400).json({ // HTTP 요청에 대한 리스폰스 (json 형식으로)
            error: "BAD EMAIL",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    // 비밀번호 유형 검사 (4보다 작거나, 들어온 비밀번호의 값이 문자열이 아닐 경우)
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    // 기존에 존재하는 email 이 있는지 DB 에서 확인
    Account.findOne({ email: req.body.email }, (err, exists) => { //Model.findOne 메소드
        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "EMAIL EXISTS",
                code: 3
            });
        }

        // CREATE ACCOUNT
        // 위의 코드 1~3 의 결격 사항이 없을 경우 db에 저장
        // hasher 를 이용해 비밀번호 보안
        hasher({password:req.body.password}, function(err, pass, salt, hash){
          let account = new Account({
              email: req.body.email,
              password: hash,
              salt: salt
          });
          account.save( err => {
              if(err) throw err;
              return res.json({ success: true });
          });
        });
    });
});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "email": "test", "password": "test" }
    ERROR CODES:
        1: PASSWORD IS NOT STRING
        2: THERE IS NO USER
        3: PASSWORD IS NOT CORRECT
*/
router.post('/signin', (req, res) => {
    // 비밀번호 데이터 타입 검사 (문자열인지 아닌지)
    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "PASSWORD IS NOT STRING",
            code: 1
        });
    }

    // FIND THE USER BY EMAIL
    // Model.findOne 메소드로 email 이 같은 DB 검색 (첫번째 인자 : Query)
    Account.findOne({ email: req.body.email}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        // 검색 결과가 존재하지 않는 경우
        if(!account) {
            return res.status(401).json({
                error: "THERE IS NO USER",
                code: 2
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        // 유저검색 결과가 있으면 검사 salt값으로 해쉬
        const validate = hasher({password:req.body.password, salt:account.salt}, function(err, pass, salt, hash){
          // 입력한 비밀번호를 이용해 만는 해쉬와 DB에 저장된 비밀번호가 같을 경우
          if(hash === account.password){
            let session = req.session;
            session.loginInfo = {
                _id: account._id,
                email: account.email
            };

            // RETURN SUCCESS
            return res.json({
                success: true,
                user_id: session.loginInfo._id
            });
          }else{
            // 다른 경우
            return res.status(401).json({
                error: "PASSWORD IS NOT CORRECT",
                code: 3
            });
          }
        });

    });
});
//
// /*
//     GET CURRENT USER INFO GET /api/account/getInfo
//     ERROR CODES:
//         1: THERE IS NO LOGIN DATA
// */
// router.get('/getinfo', (req, res) => {
//     if(typeof req.session.loginInfo === "undefined") {
//         return res.status(401).json({
//             error: "THERE IS NO LOGIN DATA",
//             code: 1
//         });
//     }
//
//     res.json({ info: req.session.loginInfo });
// });
//
// /*
//     LOGOUT: POST /api/account/logout
// */
// router.post('/logout', (req, res) => {
//     // req.session.destroy() 메소드로 세션을 파괴
//     req.session.destroy(err => { if(err) throw err; });
//     return res.json({ sucess: true });
// });
//
// /* 지역변경 */
// router.put('/editregion/:id', (req, res) => {
//   let willRegion = req.body.region;
//   console.log(willRegion);
//   //로그인 여부 확인
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//   //현재 가능한 지역은 수택동, 토평동, 인창동 셋 뿐임
//   if(willRegion!=="수택동" && willRegion!=="토평동" && willRegion!=="인창동"){
//     return res.status(400).json({
//         error: "INVALID REGION",
//         code: 2
//     });
//   }
//   //_id 값이 mongodb 형식인지 확인
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 3
//       });
//   }
//
//   Account.findById(req.params.id, (err, account) => {
//     if(err) throw err;
//     // _id는 형식에 맞지만 해당 데이터가 존재하지 않는 경우
//     if(!account) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 4
//         });
//     }
//     account.region = willRegion;
//
//     account.save((err, account) => {
//         if(err) throw err;
//         return res.json({
//             success: true,
//             account
//         });
//     });
//   })
// });
// /*
//   주문하기
//   body sample:
//   {
//     storeId: "sample",
//     storeCategories: "sample",
//     storeName: "sample",
//     menuPrice: 14000,
//     menuName: "sample",
//     selectedOptions: "sample",
//     optionPrice: 3000,
//     payPrice: 17000,
//   }
// */
// router.post('/order/:id', (req, res) => {
//   let userId = req.params.id;
//
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//
//   if(!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 2
//       });
//   }
//
//   Account.findById(userId, (err, account) => {
//     if(err) throw err;
//     // _id는 형식에 맞지만 해당 데이터가 존재하지 않는 경우
//     if(!account) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 3
//         });
//     }
//     account.order.push({
//       storeId: req.body.storeId,
//       storeImage: req.body.storeImage,
//       storeCategories: req.body.storeCategories,
//       storeName: req.body.storeName,
//       menuPrice: req.body.menuPrice,
//       menuName: req.body.menuName,
//       selectedOptions: req.body.selectedOptions,
//       optionPrice: req.body.optionPrice,
//       payPrice: req.body.payPrice,
//       date: Date.now()
//     });
//
//     account.save((err, account) => {
//         if(err) throw err;
//         return res.json({
//             success: true,
//             account
//         });
//     });
//   })
// })
//
// router.get('/check/:id', (req, res) => {
//   let userId = req.params.id
//   Account.findById(userId, (err, account) => {
//     return res.json({
//         account
//     });
//   })
// })
export default router;
// module.exports = router;
