import express from 'express';
import Store from '../models/store';
import mongoose from 'mongoose';

const router = express.Router();
// /api/store/register
/*
  register store
  BODY SAMPLE: {
    name: "SAMPLE",
    thumbnail: "SAMPLE",
    tell: "SAMPLE",
    address: "SAMPLE",
    lat: "SAMPLE",
    lng: "SAMPLE",
    openingHours: "SAMPLE",
    offDay: "SAMPLE",
    categories: ["SAMPLE"],
    tvShow: [{...}],
    menus: [{...}]
  }
  ERROR CODES
    1: NO PERMISSION
    2: CONTENTS IS NOT VARIFIED
*/
router.post('/register', (req, res) => {
    // 세션으로 부터 로그인 된 유저의 권한 확인
    if(req.session.loginInfo.admin === false || typeof req.session.loginInfo.admin === 'undefined') {
        return res.status(403).json({
            error: "NO PERMISSION",
            code: 1
        });
    };

    // 입력받은 콘텐츠의 데이터 타입이 문자열이 아닐 경우
    if(typeof req.body.thumbnail !== 'string' || typeof req.body.name !== 'string' ||
      typeof req.body.tell !== 'string' || typeof req.body.address !== 'string' ||
      typeof req.body.lat !== 'string' || typeof req.body.lng !== 'string' ||
      typeof req.body.openingHours !== 'string' || typeof req.body.offDay !== 'string') {
        return res.status(400).json({
            error: "CONTENTS IS NOT VARIFIED",
            code: 2
        });
    }

    let store = new Store({
        name: req.body.name,
        thumbnail: req.body.thumbnail,
        tell: req.body.tell,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
        openingHours: req.body.openingHours,
        offDay: req.body.openingHours,
        categories: req.body.categories,
        tvShow: req.body.tvShow,
        menus: req.body.menus,
        reviews: [],
        savedBy: []
    });

    // SAVE IN DATABASE
    store.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
})
// // 가게이름으로 검색
// router.get('/search_store/:region/:store_name', (req, res) => {
//   let nowRegion = req.params.region;
//   let storeName = req.params.store_name;
//   // 캐럿을 업애는 편이 나을듯! 시작말구
//   var reg = new RegExp(storeName);
//
//   if(typeof nowRegion !== 'string' || typeof storeName !== 'string') {
//       return res.status(400).json({
//           error: "SEARCH CONTENTS IS NOT STRING",
//           code: 1
//       });
//   }
//
//   Store.find({name: {$regex: reg}, region: nowRegion}, {id: true, name: true, categories:true, reviews: true, starRate: true, deliveryTime:true, availNow:true, thumbnail:true})
//   .limit(20)
//   .sort([["availNow", -1], ["deliveryTime", 1]])
//   .exec((err, stores) => {
//         if(err) throw err;
//         res.json(stores);
//     });
// });
// // 메뉴이름으로 검색
// router.get('/search_menu/:region/:menu_name', (req, res) => {
//   let nowRegion = req.params.region;
//   let menuName = req.params.menu_name;
//   var reg = new RegExp(menuName);
//
//   if(typeof nowRegion !== 'string' || typeof menuName !== 'string') {
//       return res.status(400).json({
//           error: "SEARCH CONTENTS IS NOT STRING",
//           code: 1
//       });
//   }
//
//   Store.find({menus: {$elemMatch: {name: {$regex: reg}}}, region: nowRegion}, {id: true, name: true, categories:true, reviews: true, starRate: true, deliveryTime:true, availNow:true, thumbnail:true})
//   .limit(20)
//   .sort([["availNow", -1], ["deliveryTime", 1]])
//   .exec((err, stores) => {
//         if(err) throw err;
//         res.json(stores);
//     });
// });
// // 메뉴에서 화면에서의 가게 리스트 (카테고리별)
// // /api/store/:categories/:sort
// router.get('/:region/:categories/:sort', (req, res) => {
//   let queryRegion = req.params.region; //한글로 들어옴
//   let queryCategories = req.params.categories;
//   let sortBy = req.params.sort; //필터를 통해서 변경했을 때
//   // if(sort===undefined){
//   //   sort = "_id"
//   // }
//
//   // console.log(queryCategories, sort);
//   if(queryCategories !== "kfood" && queryCategories !== "snack" && queryCategories !== "jfood" && queryCategories !== "chicken"
//     && queryCategories !== "pizza" && queryCategories !== "cfood" && queryCategories !== "jokbo" && queryCategories !== "night"
//     && queryCategories !== "soup" && queryCategories !== "packed" && queryCategories !== "cafe" && queryCategories !== "fastfood"
//     && queryCategories !== "franchise") {
//       return res.status(400).json({
//           error: "INVALID LISTTYPE",
//           code: 1
//       });
//   }
//
//   Store.find({categories: queryCategories, region: queryRegion})
//   .sort([["availNow", -1], [sortBy, 1]])
//   .exec((err, stores) => {
//     if(err) throw err;
//     return res.json(stores);
//   });
// });
//
// // 로그인한 사장님이 자신의 가게 목록 볼 때
// router.get('/owner/:user_id', (req, res) => {
//   let user_id = req.params.user_id;
//
//   // 들어온 id 값이 mongodb 형식인지 조회
//   if(!mongoose.Types.ObjectId.isValid(user_id)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 1
//       });
//   }
//   let objId = new mongoose.Types.ObjectId(user_id);
//
//   Store.find({owner_id: objId})
//   .sort({_id: -1})
//   .exec((err, stores) => {
//     if(err) throw err;
//     return res.json(stores);
//   });
// });
// /* 가게 상세정보(한 가게의 정보만을 조회) */
// router.get('/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//
//   // 들어온 id 값이 mongodb 형식인지 조회
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 1
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//     if(err) throw err;
//
//     if(!store) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 2
//         });
//     }
//     return res.json(store);
//   });
// });
//
// /*
//   가게 정보 1단계 수정
//   BODY SAMPLE: {
//     thumbnail: "SAMPLE",
//     name: "SAMPLE",
//     categories: "SAMPLE",
//     explain: "SAMPLE",
//     region: ["SAMPLE", "SAMPLE"],
//     availTime: "SAMPLE",
//     offDay: "SAMPLE",
//     tel: "SAMPLE",
//     owner: "SAMPLE"
//   }
// */
// router.put('/edit_one/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//   // 세션을 통해 로그인 여부 확인
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//   // 들어온 id 값이 mongodb 형식인지 조회
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 2
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//     if(err) throw err;
//
//     if(!store) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 3
//         });
//     }
//
//     // 검색된 메모의 작성자와 로그인된 데이터가 다른 경우 - 권한 없음
//     if(store.owner_id != req.session.loginInfo._id) {
//         return res.status(403).json({
//             error: "PERMISSION FAILURE",
//             code: 4
//         });
//     }
//
//     store.thumbnail = req.body.thumbnail;
//     store.name = req.body.name;
//     store.categories = req.body.categories;
//     store.thumbnail = req.body.thumbnail;
//     store.explain = req.body.explain;
//     store.region = req.body.region;
//     store.minPriceToOrder = req.body.minPriceToOrder
//     store.inform.availTime = req.body.availTime;
//     store.inform.offDay = req.body.offDay;
//     store.inform.tel = req.body.tel;
//     store.inform.owner = req.body.owner;
//
//     store.save((err, store) => {
//         if(err) throw err;
//         return res.json({
//             success: true,
//             store
//         });
//     });
// })
// });
//
// /*
//   가게 정보 2단계 수정
//   BODY SAMPLE: {
//     menuCategories: ["SAMPLE", "SAMPLE", ...],
//     menus: [{...}, {...}, ...]
//   }
// */
// router.put('/edit_two/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//   // 세션을 통해 로그인 여부 확인
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//   // 들어온 id 값이 mongodb 형식인지 조회
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 2
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//     if(err) throw err;
//
//     if(!store) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 3
//         });
//     }
//
//     // 검색된 메모의 작성자와 로그인된 데이터가 다른 경우 - 권한 없음
//     if(store.owner_id != req.session.loginInfo._id) {
//         return res.status(403).json({
//             error: "PERMISSION FAILURE",
//             code: 4
//         });
//     }
//
//     store.menuCategories = req.body.menuCategories;
//     store.menus = req.body.menus;
//     store.options = req.body.options;
//
//     store.save((err, store) => {
//         if(err) throw err;
//         return res.json({
//             success: true,
//             store
//         });
//     });
// })
// });
//
// /*
//   가게 정보 3단계 수정
//   BODY SAMPLE: {
//     deliveryTime: "SAMPLE",
//     availNow: true/false
//   }
// */
// router.put('/edit_three/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//   // 세션을 통해 로그인 여부 확인
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//   // 들어온 id 값이 mongodb 형식인지 조회
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID ID",
//           code: 2
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//     if(err) throw err;
//
//     if(!store) {
//         return res.status(404).json({
//             error: "NO RESOURCE",
//             code: 3
//         });
//     }
//
//     // 검색된 메모의 작성자와 로그인된 데이터가 다른 경우 - 권한 없음
//     if(store.owner_id != req.session.loginInfo._id) {
//         return res.status(403).json({
//             error: "PERMISSION FAILURE",
//             code: 4
//         });
//     }
//
//     store.deliveryTime = String(req.body.deliveryTime);
//     store.availNow = req.body.availNow;
//
//     store.save((err, store) => {
//         if(err) throw err;
//         return res.json({
//             success: true,
//             store
//         });
//     });
// })
// });
//
// //찜은 store에만 기록을 남긴다 (쿼리할 때 될거같다)
// router.post('/savestore/:store_id', (req, res) => {
//     let storeId = req.params.store_id;
//     console.log(storeId)
//     // CHECK MEMO ID VALIDITY
//     if(!mongoose.Types.ObjectId.isValid(storeId)) {
//         return res.status(400).json({
//             error: "INVALID STORE ID",
//             code: 1
//         });
//     }
//
//     // CHECK LOGIN STATUS
//     if(typeof req.session.loginInfo === 'undefined') {
//         return res.status(403).json({
//             error: "NOT LOGGED IN",
//             code: 2
//         });
//     }
//
//     // FIND Store
//     Store.findById(storeId, (err, store) => {
//         if(err) throw err;
//
//         // Store DOES NOT EXIST
//         if(!store) {
//             return res.status(404).json({
//                 error: "NO RESOURCE",
//                 code: 3
//             });
//         }
//
//         // GET INDEX OF USERNAME IN THE ARRAY
//         let index = store.saveStore.indexOf(req.session.loginInfo.username);
//
//         // CHECK WHETHER THE USER ALREADY HAS GIVEN A STAR
//         // indexOf 메소드의 결과가 없을 경우 -1 이 리턴된다.
//         let hasSaved = (index === -1) ? false : true;
//         // 결과가 없을 경우 false, 있을 경우 true
//
//         if(!hasSaved) { //결과가 없을 경우
//             // IF IT DOES NOT EXIST
//             // starre 필드에 유저이름 푸쉬(배열의 맨 뒤에 원소추가)
//             store.saveStore.push(req.session.loginInfo.username);
//         } else {
//             // ALREADY saved
//             // 이미 존재한다면 배열에서 해당유저의 원소 삭제(토글)
//             store.saveStore.splice(index, 1);
//         }
//
//         store.save((err, store) => {
//             if(err) throw err;
//             return res.json({
//                 success: true,
//                 'has_saved': !hasSaved //true 면 줌/false 면 뺌
//             });
//         });
//     });
// });
//
// router.get('/mysavestore/:username', (req, res) => {
//   let username = req.params.username;
//
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//
//   Store.find({saveStore: username})
//   .sort([["availNow", -1], ["deliveryTime", 1]])
//   .exec((err, stores) => {
//     if(err) throw err;
//     return res.json(stores);
//   });
// })
//
// router.post('/order/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID STORE ID",
//           code: 1
//       });
//   }
//
//   // CHECK LOGIN STATUS
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 2
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//       if(err) throw err;
//
//       // MEMO DOES NOT EXIST
//       if(!store) {
//           return res.status(404).json({
//               error: "NO RESOURCE",
//               code: 3
//           });
//       }
//       if(store.orderCount===undefined){
//         store.orderCount = 1
//       }else{
//         store.orderCount = store.orderCount+1
//       }
//
//       store.save((err, store) => {
//           if(err) throw err;
//           return res.json({
//               success: true
//           });
//       });
//   });
// });
//
// /*
//   리뷰 작성
//   bodySample
//   {
//     author: "sample",
//     contents: "sample",
//     imageUrl: "sample",
//     starRate: 4
//   }
//   store.reviews배열에 들어온 body를 push하고,
//   리뷰 배열안의 별점들을 모두 더한값을 리뷰배열의 길이로 나눈다 (평균값)
// */
// router.post('/review/:store_id', (req, res) => {
//   let storeId = req.params.store_id;
//
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID STORE ID",
//           code: 2
//       });
//   }
//
//   Store.findById(storeId, (err, store) => {
//       if(err) throw err;
//
//       if(!store) {
//           return res.status(404).json({
//               error: "NO RESOURCE",
//               code: 3
//           });
//       }
//
//       store.reviews.push({
//         author: req.body.author,
//         contents: req.body.contents,
//         imageUrl: req.body.imageUrl,
//         starRate: req.body.starRate,
//         date: Date.now(),
//         is_edited: false
//       })
//       let reviewsArray = store.reviews
//       let totalStar = 0;
//       for(var i=0; i < reviewsArray.length; i++){
//         totalStar = totalStar+Number(reviewsArray[i].starRate);
//         if(i===reviewsArray.length-1){
//           let willStarAvr = totalStar/reviewsArray.length
//           store.starRate = willStarAvr
//           store.save((err, store) => {
//               if(err) throw err;
//               return res.json({
//                   success: true
//               });
//           });
//         }
//       }
//     })
// });
//
// /*
//   리뷰 수정
//   스토어를 찾아서 (store_id)
//   해당 스토어의 reviews 배열의 n번째 인덱스를 수정
// */
// router.put('/review_edit/:store_id/:nth_index', (req, res) => {
//   let storeId = req.params.store_id;
//   let reviewIndex = req.params.nth_index;
//
//   if(typeof req.session.loginInfo === 'undefined') {
//       return res.status(403).json({
//           error: "NOT LOGGED IN",
//           code: 1
//       });
//   }
//
//   if(!mongoose.Types.ObjectId.isValid(storeId)) {
//       return res.status(400).json({
//           error: "INVALID STORE ID",
//           code: 2
//       });
//   }
//   Store.findById(storeId, (err, store) => {
//       if(err) throw err;
//
//       if(!store) {
//           return res.status(404).json({
//               error: "NO RESOURCE",
//               code: 3
//           });
//       }
//
//       if(store.reviews[reviewIndex].author!==req.session.loginInfo.username){
//         return res.status(403).json({
//             error: "PERMISSION FAILURE",
//             code: 4
//         });
//       }
//       store.reviews[reviewIndex].contents = req.body.contents;
//       store.reviews[reviewIndex].imageUrl = req.body.imageUrl;
//       store.reviews[reviewIndex].starRate = req.body.starRate;
//
//       let reviewsArray = store.reviews
//       let totalStar = 0;
//       for(var i=0; i < reviewsArray.length; i++){
//         totalStar = totalStar+Number(reviewsArray[i].starRate);
//         if(i===reviewsArray.length-1){
//           let willStarAvr = totalStar/reviewsArray.length
//           store.starRate = willStarAvr
//           store.save((err, store) => {
//               if(err) throw err;
//               return res.json({
//                   success: true
//               });
//           });
//         }
//       }
//   })
// });

export default router;
