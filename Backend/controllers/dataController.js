const {request, response} = require('express')
const Data = require('../data/data')
const dataModel = require('../models/dataModel')

const getAllData = async(request, response) => {
    try{
        let datas = await dataModel.find();
        if(datas.length === 0)
        {
            const initialDatas = await dataModel.insertMany(Data);
            datas = await dataModel.find();
        }
        response.status(200).json(datas);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getDataById = async (request, response) => {
    const IdtoFetch = request.params.id;
    try{
        let datas = await dataModel.find();
        if(datas.length === 0)
        {
            const initialDatas = await dataModel.insertMany(Data);
            datas = await dataModel.find();
        }
        const expectedData = await dataModel.findOne({id: IdtoFetch})
        if(expectedData)
        {
            return response.status(200).json(expectedData);
        }
        return response.status(404).json({message: `No Data was found with Id ${IdtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewData = async(request, response) => {
    const newData = request.body
    try{
        const existingData = await dataModel.findOne({id: newData.id})
        if(existingData)
        {
            return response.status(409).json({message: `A Data with ${newData.id} already exists`})
        }
        const insertedData = await dataModel.create(newData)
        response.status(201).json({message : "SUCCESSFULLY ADDED."})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateData = async (request, response) => {
    const dataTobeUpdated = request.body;
    try{
        const updatedData = await dataModel.findOneAndUpdate({id : dataTobeUpdated.id}, dataTobeUpdated, { new : true});
        if(updatedData) {
            return response.status(200).json({message: 'SUCCESSFULLY UPDATED.', updatedData})
        }
        else {
            return response.status(404).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const deleteData = async(request, response) => {
    const id = request.params.id;
    try{
        const deleteData = await dataModel.findOneAndDelete({id : id});
        if(deleteData) {
            return response.status(200).json({message: 'SUCCESSFULLY DELETED.'});
        }
        else {
            return response.status(400).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

module.exports = {getAllData, getDataById, addNewData, updateData, deleteData};