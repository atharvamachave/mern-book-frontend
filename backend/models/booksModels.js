import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  book_author: {
    type: String,
    required: true,
  },
  book_parts: {
    type: Number,
  },
});

export default mongoose.model('Books', booksSchema);
