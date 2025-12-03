import Note from '../models/Note.js';

// CRUD Operations for Notes

// Create Note
export const createNote = async (req, res) => {
    try {
        const note = await Note.create({
            ...req.body,
            user: req.user.id, // from authMiddleware
        });

        res.status(201).json({
            success: true,
            data: note
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Get All Notes for Logged-in User
export const getNotes = async (req, res) => {
    try {
        const { page = 1, limit = 3, sort = "-createdAt", search } = req.query;

        let query = { user: req.user.id };

        if (search) {
            query.$text = { $search: search };
        }

        const notes = await Note.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Note.countDocuments(query);

        res.json({
            success: true,
            count: notes.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            data: notes
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
};

// Get Note by ID
export const getNote =async (req,res) => {
    try {
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if(!note) return res.status(404).json({ message: "Note not found"});
        res.json({ success:true, data: note});

    } catch (err) {
        res.status (400).json({ message: "Invalid Note ID" });
    }
};

// Update Note by ID
export const updateNote = async (req,res) =>{
    try {
        const note = await Note.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id,
            },
            req.body,
            { new: true }
    );

        if(!note) return res.status(404).json({ message: "Note not found"});
        res.json({ success:true, data: note});

    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

// Deleted By ID
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if(!note) return res.status(404).json({ message: "Note not found"});
        res.json({ success:true, message: "Note deleted" });
    
    } catch (err) {
    res.status(400).json({ message: "err.message"})
    }
};


//     app.get("/hello", (req, res) => {
//   res.send("Hello from controller");
// });
// http://localhost:5001/hello