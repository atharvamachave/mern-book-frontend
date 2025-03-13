import Book from '../models/booksModels.js';

export const create = async (req, res) => {
  try {
    const existingBook = await Book.findOne({
      book_name: { $regex: `^${req.body.book_name}$`, $options: 'i' }, // Case-insensitive match
    });

    if (existingBook) {
      return res.status(400).json({ msg: 'Book already exists' });
    }

    const bookData = new Book(req.body);
    const savedData = await bookData.save();
    res.status(200).json({
      msg: 'Book Added Successfully...',
      book: savedData,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const bookData = await Book.find();
    if (!bookData) {
      return res.status(404).json({ msg: 'Books data not found' });
    }
    res.status(200).json(bookData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const search = async (req, res) => {
  try {
    const bname = req.params.bname;
    console.log(bname);

    const books = await Book.find({
      $or: [{ book_name: { $regex: bname, $options: 'i' } }],
    });

    if (!books) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.status(200).json({
      msg: 'Book Found',
      books: books,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const bookExists = await Book.findById(id);

    if (!bookExists) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    res.status(200).json({
      msg: 'Book retrived successfully',
      book: bookExists,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const bookExists = await Book.findById(id);

    if (!bookExists) {
      return res.status(401).json({ msg: 'Book not found' });
    }

    const updatedData = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      msg: 'Book Updated Successfully...',
      book: updatedData,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const userExists = await Book.findById(id);

    if (!userExists) {
      return res.status(404).json({ msg: "Book doesn't exists" });
    }

    await Book.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error }); //error message
  }
};
