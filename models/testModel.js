import mongoose from "mongoose";

const { Schema } = mongoose;

const testSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

})

const Test = mongoose.model("Test",testSchema);

export default Test;