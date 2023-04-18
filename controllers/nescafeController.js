const { query } = require('express')
const sampleModel = require('../models/nescafe/sampleModel')

const sampleAdd = async (req,res) => {
    try {
        const newData = new sampleModel({name : req.body.value})
        await newData.save()
        console.log("A New Dummy Record Was Added Successfully!")
        res.status(201).send("Record Added")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const sampleEdit = async (req,res) => {
    try {
        await sampleModel.findOneAndUpdate(
            {name : req.body.value},
            {name : req.body.edit}
        )
        console.log("An Existing Dummy Record was Successfully Updated!")
        res.status(200).send("Record Updated")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const sampleDelete = async (req,res) => {
    try {
        await sampleModel.findOneAndDelete({name:req.body.value})
        console.log("A Dummy Record was Successfully Deleted!")
        res.status(200).send("Record Deleted")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {sampleAdd, sampleEdit, sampleDelete}