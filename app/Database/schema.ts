import mongoose from 'mongoose';

const formLinkSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  
    trim: true,   
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  }
});
const FormSubmission = mongoose.models.FormSubmission || mongoose.model('FormSubmission', formLinkSchema);

export default FormSubmission;
