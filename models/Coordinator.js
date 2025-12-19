import mongoose from 'mongoose';

const coordinatorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true }
});

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);

export default Coordinator;
