import mongoose from 'mongoose';

const formLink = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const FormSubmission = mongoose.models.FormSubmission || mongoose.model('FormSubmission', formLink);

export default FormSubmission;
