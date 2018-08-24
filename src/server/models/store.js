import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Store = new Schema({
    name: String,
    thumbnail: String,
    tell: String,
    address: String,
    lat: String,
    lng: String,
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

export default mongoose.model('store', Store);
