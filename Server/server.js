const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000

const bcrypt = require('bcryptjs')
const session = require('express-session')
const {check, validationResult} = require('express-validator')

let User = require('./models/user')
let Board = require('./models/board')
let List = require('./models/list')
let Card = require('./models/card')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

app.use(session({
    secret: "ModernWebFinalProject",
    resave: false,
    saveUninitialized: false,
    cookie: {},
}))

// const ensureLogin = (req, res, next) => {
//     if (!req.session.loggedInUser){
//         console.log(`no logged in user.`);
//         res.json({ success: true, redirectTo: '/login' });
//     }else{
//         next();
//     }
// }


//Endpoints for dashboards
// app.get('/dashboard', (req, res) => {
//     if (req.session.loggedInUser) {
//         res.json({loggedIn: true, user: req.session.loggedInUser})
//     } else {
//         res.json({ loggedIn: false, redirectTo: '/login'})
//     }
// });

//Endpoints for boards
app.post('/createBoard', async (req,res) => {
    try {
        const { title, createdBy, collaborators, color } = req.body;
        console.log("trying to add board");
        

        // Validate required fields
        if (!title || !createdBy || !color) {
            return res.status(400).json({ error: "Title, createdBy, and color are required." });
        }

        const newBoard = new Board({
            title,
            createdBy: createdBy || req.session.loggedInUser.__id,
            collaborators: [], 
            color
        });

        const savedBoard = await newBoard.save();
        res.status(201).json(savedBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.get('/Boards', async (req,res) => {
    try {
        const userId = req.query.userId; 
        
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        
        const boards = await Board.find({
            $or: [
                { createdBy: userId }, 
                { "collaborators.userId": userId } 
            ]
        })
        .populate('createdBy', 'fname lname email') 
        .populate('collaborators.userId', 'fname lname email'); 

        res.status(200).json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.delete('/deleteBoard/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the board to ensure it exists
        const board = await Board.findById(id);
        if (!board) {
            return res.status(404).json({ error: "Board not found." });
        }

        // Find all lists associated with the board
        const lists = await List.find({ board: id });

        // Collect all card IDs from the lists
        const cardIds = lists.reduce((ids, list) => ids.concat(list.cards), []);

        // Delete all associated cards
        await Card.deleteMany({ _id: { $in: cardIds } });

        // Delete all associated lists
        await List.deleteMany({ board: id });

        // Delete the board
        await Board.findByIdAndDelete(id);

        res.status(200).json({ message: "Board, associated lists, and cards deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// Update a board by ID
app.put('/updateBoard/:id', async (req, res) => {
    const { id } = req.params;
    const { title, color, collaborators } = req.body;

    try {
        const updatedBoard = await Board.findByIdAndUpdate(
            id,
            { $set: { title, color, collaborators } },
            { new: true, runValidators: true } // Return updated document and validate input
        );

        if (!updatedBoard) {
            return res.status(404).json({ error: "Board not found." });
        }

        res.status(200).json({ message: "Board updated successfully.", board: updatedBoard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update board.", details: error.message });
    }
});


//Endpoints for Lists
app.post('/createList', async (req, res) => {
    const { board, title, cards } = req.body;

    if (!board || !title) {
        return res.status(400).json({ error: 'Board ID and title are required.' });
    }

    try {
        const newList = new List({
            board,
            title,
            cards: cards || []
        });

        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create list.', details: error.message });
    }
});

app.get('/lists', async (req, res) => {
    const { board } = req.query; // Expecting a query parameter ?board=boardId

    if (!board) {
        return res.status(400).json({ error: 'Board ID is required as a query parameter.' });
    }

    try {
        const lists = await List.find({ board }).populate('cards');
        if (lists.length === 0) {
            return res.status(404).json({ error: 'No lists found for the provided board ID.' });
        }
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lists.', details: error.message });
    }
});

app.delete('/deleteLists/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the list to get associated cards
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ error: 'List not found.' });
        }

        // Delete all associated cards
        await Card.deleteMany({ _id: { $in: list.cards } });

        // Delete the list
        await List.findByIdAndDelete(id);

        res.status(200).json({ message: 'List and associated cards deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the list.', details: error.message });
    }
});


app.put('/updateList/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required." });
    }

    try {
        const updatedList = await List.findByIdAndUpdate(
            id,
            { $set: { title } },
            { new: true, runValidators: true }
        );

        if (!updatedList) {
            return res.status(404).json({ error: "List not found." });
        }

        res.status(200).json({ message: "List updated successfully.", list: updatedList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update list.", details: error.message });
    }
});


//Endpoints for cards
app.post('/createCard', async (req,res) => {
    const { title, description, listId } = req.body;

    if (!title || !listId) {
        return res.status(400).json({ error: "Title and listId are required." });
    }

    try {
        // Create the card
        const newCard = await Card.create({ title, description });

        // Add the card to the associated list
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ error: "List not found." });
        }

        list.cards.push(newCard._id);
        await list.save();

        res.status(201).json({ message: "Card created successfully.", card: newCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create card.", details: error.message });
    }
});

app.get('/cards', async (req, res) => {
    const { listId } = req.query; // Optional query parameter ?listId=

    try {
        let query = {};
        if (listId) {
            query = { _id: { $in: (await List.findById(listId))?.cards || [] } };
        }

        const cards = await Card.find(query);
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch cards.", details: error.message });
    }
}); 

app.delete('/cards/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the card to get its list reference
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ error: "Card not found." });
        }

        // Remove the card reference from the associated list
        await List.updateMany({ cards: id }, { $pull: { cards: id } });

        // Delete the card
        await Card.findByIdAndDelete(id);

        res.status(200).json({ message: "Card deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete card.", details: error.message });
    }
});


app.put('/updateCard/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title && !description) {
        return res.status(400).json({ error: "At least one field (title or description) must be provided for update." });
    }

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            id,
            { $set: { title, description } },
            { new: true, runValidators: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ error: "Card not found." });
        }

        res.status(200).json({ message: "Card updated successfully.", card: updatedCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update card.", details: error.message });
    }
});



app.post('/register', async (req,res) => {
    await check('fname', 'First Name is required').notEmpty().run(req)
    await check('lname', 'Last Name is required').notEmpty().run(req)
    await check('email', 'Email is required').notEmpty().run(req)
    await check('password', 'Password is required').notEmpty().run(req)
    await check('confirm', 'Confirm password is required').notEmpty().run(req)

    await check('email', 'Email is in invalid format').isEmail().run(req)

    await check('confirm', 'Password and confirm password must match')
    .equals(req.body.password).run(req)

    const errors = validationResult(req).errors
    console.log(`errors : ${JSON.stringify(errors)}`);

    if (!errors || errors.length <= 0){
        try{
            
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email is already in use' });
            }
            
            //create User object
            const userToCreate = new User();
            userToCreate.fname = req.body.fname;
            userToCreate.lname = req.body.lname;
            userToCreate.email = req.body.email;
            // userToCreate.password = req.body.password;

            //generate hashed password
            bcrypt.genSalt(10, (err, salt) => {
                if (err){
                    //generating salt failed.
                    console.log(`Error while generating salt : ${JSON.stringify(err)}`);
                    // res.status(500).send(`Cannot create account : ${JSON.stringify(err)}`)
                }else{
                    //salt generated; use it for password hashing
                    bcrypt.hash(req.body.password, salt, async (err, hashed_password) => {
                        if(err){
                            console.log(`Cannot generate hashed password : ${JSON.stringify(err)}`);
                            // res.status(500).send(`Cannot generate hashed password : ${JSON.stringify(err)}`)
                        }else{
                            //hashed password generated successfully; save it to database
                            userToCreate.password = hashed_password
                            console.log(`hashed_password : ${hashed_password}`);
                            
                            //save object to db
                            const newUser = await userToCreate.save()

                            if(newUser){
                                console.log(`User account created successfully. ${JSON.stringify(newUser)}`)
                                // res.redirect('/login')
                                res.status(200).json({ success: true, redirectTo: '/login' });
                            }else{
                                res.status(401).json({ success: false, message: 'Failed to register Account' });
                            }
                        }
                    })
                }
            })

        }catch(error){
            console.log(`Error while creating account  : ${JSON.stringify(error)}`);
            // res.render('register', {errors: [{msg: error}]})
        }
    }else{
        //show errors on UI
        console.log(`Error while registering user : ${JSON.stringify(errors)}`);
        // res.render("register", {errors : errors})
    }
})

app.post("/login", async (req, res) => {
    console.log(`Trying to login. Form data : ${JSON.stringify(req.body)}`);

    await check('email', 'Email is required').notEmpty().run(req)
    await check('password', 'Password is required').notEmpty().run(req)
    await check('email', 'Email is in invalid format').isEmail().run(req)

    //get the validation result from express-validator
    const errors = validationResult(req).errors
    console.log(`errors : ${JSON.stringify(errors)}`);
    
    if (!errors || errors.length <= 0){
        try{
            const emailFromUI = req.body.email
            const passwordFromUI = req.body.password

            //find the user from db with matching email
            const result = await User.find({email: emailFromUI})
            console.log(`result : ${JSON.stringify(result)}`);

            if(result){
                console.log(`result matches : matching user : ${emailFromUI}'`);

                const matchedUser = result[0];
                console.log(`matched user : ${JSON.stringify(matchedUser)}`);

                const hashedPassword = matchedUser.password
                //compare hashed password and user input password

                bcrypt.compare(passwordFromUI, hashedPassword , (err, success) => {
                    if (err){
                        console.log(`Error while validating password : ${JSON.stringify(err)}`);
                        // res.render('login', {errors: [{msg: 'Invalid credential. Please try again.'}]})
                    }

                    if (success){
                        console.log(`Successful login.`);

                        //save the logged in user info to session
                        req.session.loggedInUser = matchedUser


                        // res.render('books', {user: req.session.loggedInUser})
                        res.status(200).json({ success: true, redirectTo: '/dashboard' });
                    }else{
                        console.log(`Invalid password : ${JSON.stringify(err)}`);
                        res.status(401).json({ success: false, message: 'Login failed' });
                        // res.render('login', {errors: [{msg: 'Invalid credential. Please try again.'}]})
                    }
                })

            }else{
                console.log(`No matching user found`);
                // res.render('login', {errors: [{msg: 'No matching user found. Please try again!'}]})
            }
        }catch(err){
            console.log(`Error while siging in  : ${JSON.stringify(err)}`);
            // res.render('login', {errors: [{msg: err}]})
        }
    }else{
        //show errors on UI
        console.log(`Error while siging in user : ${JSON.stringify(errors)}`);
        // res.render("login", {errors : errors})
    }
});

app.get('/check-session', (req, res) => {
    if (req.session.loggedInUser) {
        res.json({loggedIn: true, user: req.session.loggedInUser})
        // console.log(req.session.loggedInUser)
    } else {
        res.json({ loggedIn: false, redirectTo: '/login'})
    }
});


app.post('/logout', (req, res) => {
    console.log(JSON.stringify(req.session.loggedInUser))
    req.session.destroy((err) => {
        if (err) {
            console.log('Error logging out:', err);
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }
        res.status(200).json({ success: true, redirectTo: '/login' });
        console.log('Successfully logged out');
    });
});

const connectDB = async () => {
    try {
        console.log("Attempting to connect to database")
 
 
        // Connect to MongoDB
        mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB connected!"))
        .catch(err => console.log(err));
 
 
    } catch (error) {
      console.error(error.message);  
    }
 }


const onServerStart = () => {
    console.log(`The server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+c to terminate the server`);
    connectDB()
    //connect to database
}
app.listen(PORT, onServerStart)