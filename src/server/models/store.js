import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Store = new Schema({
    name: String,
    thumbnail: String,
    tell: String,
    address: String,
    location: {
     type: { type: String },
     coordinates: []
    },
    openingHours: String,
    offDay: String,
    categories: [String],
    tvShow: [
      {
        name: String,
        time: String
      }
    ],
    menus: [
      {
        name: String,
        price: String
      }
    ],
    reviews: [
      {
        author: String,
        contents: String,
        img: String,
        starRate: Number,
        date: {
            created: { type: Date, default: Date.now },
            edited: { type: Date, default: Date.now }
        },
        is_edited: { type: Boolean, default: false }
      }
    ],
    savedBy: [String]
});
Store.index({ location: "2dsphere" });


export default mongoose.model('store', Store);
