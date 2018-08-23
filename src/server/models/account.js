import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Account = new Schema({
    email: String,
    password: String,
    salt: String,
    adminPermission: Boolean,
    decision: [
      {
        date: { type: Date, default: Date.now },
        storeList: [
          {
            storeId:String,
            fallOrder: Number
          }
        ],
        choosenStoreId: String
      }
    ],
    created: { type: Date, default: Date.now }
});

export default mongoose.model('account', Account);
