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
    tvShow: [
      {
        name: String,
        time: String
      }
    ],
    categories: [String],
    reviews: [
      {
        author: String,
        contents: String,
        imageUrl: String,
        starRate: Number,
        date: {
            created: { type: Date, default: Date.now },
            edited: { type: Date, default: Date.now }
        },
        is_edited: { type: Boolean, default: false }
      }
    ]
});

export default mongoose.model('store', Store);
