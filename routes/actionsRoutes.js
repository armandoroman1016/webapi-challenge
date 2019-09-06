const express = require('express')
const actionDb = require('../data/helpers/actionModel')

const router = express.Router()

router.get('/', (req, res) =>{
    actionDb.get()
        .then( actions => res.status(200).json(actions))
        .catch( err => res.status(500).json({message: "we couldnt retrieve actions at this time."}))
})

router.post('/', (req, res) => {
    const { body } = req
    if(!body.project_id || !body.description || !body.notes){
        res.status(400).json({message:'Your action either provided an invalid project id or you forgot to include a project description, or notes.'})
    }else{
        actionDb.insert(body)
            .then( newPost => res.status(201).json(newPost))
            .catch( err => res.status(500).json({error: 'There was an error trying to create your new action'}))
    }
})

router.put('/:id', ( req, res) => {
    const { id } = req.params
    const { body } = req
    if(!body.project_id || !body.description || !body.notes){
        res.status(400).json({message:'Your action either provided an invalid project id or you forgot to include a project description, or notes.'})
    }else{
        actionDb.update(id, body)
            .then( updated =>{
                if(updated){
                    res.status(200).json({message: 'Successful update'})
                }else{
                    res.status(400).json({message: 'Please provide a valid post to update'})
                }
            })
            .catch( err => res.status(500).json({error: 'We couldnt update this post at the moment'}))
    }
})

router.delete('/:id', (req, res) =>{
    const { id } = req.params
    actionDb.remove(id)
        .then( deleted => {
            if(deleted){
                res.status(204).json({message: 'Success'})
            }else{
                res.status(400).json({message: 'Please provide a valid action'})
            }
        })
        .catch( err => res.status(500).json({error: 'We couldnt delete this post at the moment'}))
    })



module.exports = router