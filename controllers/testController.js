import Test from "../models/testModel.js";

const createTest = async (req,res) =>{

    try {
        const test = await Test.create(req.body)
        res.status(201).json({
            succeded: true,
            test,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        });
    }

}

export {createTest}