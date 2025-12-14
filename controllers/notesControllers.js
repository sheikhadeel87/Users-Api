import Note from '../models/Note.js';

// CRUD Operations for Notes

// Create Note
export const createNote = async (req, res) => {
    try {
        // Convert tags array to comma-separated string
        let tagString = "";
        if (Array.isArray(req.body.tag)) {
            tagString = req.body.tag.filter(t => t && t.trim() !== '').join(',');
        } else if (req.body.tag && typeof req.body.tag === 'string') {
            tagString = req.body.tag.trim();
        }
        
        const note = await Note.create({
            title: req.body.title,
            content: req.body.content,
            tag: tagString,
            user: req.user.id,
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
        const { page = 1, limit = 10, sort = "-createdAt", search } = req.query;
        let query = { user: req.user.id };

        if (search) {
            query.$text = { $search: search };
        }

        const limitNum = parseInt(limit);
        const pageNum = parseInt(page);
        const skip = (pageNum - 1) * limitNum;

        const notes = await Note.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        const total = await Note.countDocuments(query);

        res.json({
            success: true,
            count: notes.length,
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
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
        // Convert tags array to comma-separated string
        let tagString = "";
        if (Array.isArray(req.body.tag)) {
            tagString = req.body.tag.filter(t => t && t.trim() !== '').join(',');
        } else if (req.body.tag && typeof req.body.tag === 'string') {
            tagString = req.body.tag.trim();
        }
        
        const updateData = {
            title: req.body.title,
            content: req.body.content,
            tag: tagString
        };

        const note = await Note.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id,
            },
            updateData,
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
        res.status(400).json({ message: err.message})
    }
};


//     app.get("/hello", (req, res) => {
//   res.send("Hello from controller");
// });
// http://localhost:5001/hello