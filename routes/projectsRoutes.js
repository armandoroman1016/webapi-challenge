const express = require('express')
const projectsDb = require('../data/helpers/projectModel')

const router = express()

router.get('/:id', (req, res) => {
    let { id } = req.params

    projectsDb.get(id)
        .then( project => {
            if(project){
                res.status(400).json(project)
            }else{
                res.status(400).json({message:"We couldn't find a post that matches our records"})
            }})
        .catch( err => res.status(500).json({message: "We couldn't get that post for you at the moment."}))
})

router.post('/', (req, res) => {
    const { body } = req
    if(!body.name || ! body.description){
        res.status(400).json({message: "The name and description field are required."})
    }else{
        projectsDb.insert(body)
            .then( project => res.status(201).json(body))
            .catch( err => res.status(500).json({message: "We couldn't add this post at this time."}))
    }
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { body } = req
    if(!body.name || ! body.description){
        res.status(400).json({message: "The name and description field are required."})
    }else{
        projectsDb.update(id, body)
            .then( updated => {
                if(updated){
                    res.status(201).json(body)
                }else{
                    res.status(404).json({message: "We could't find the project your looking to update."})
                }
            })
            .catch( err => res.status(500).json({message: "We couldn't add this project at this time."}))
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    projectsDb.remove(id)
        .then( deleted => {
            if(deleted){
                res.status(204).json({"message": "Success"})
            }else{
                res.status(404).json({'message': "We couldn't find a project that matches our records"})
            }
        })
        .catch( err => res.status(500).json({error: "We couldn't deleted the project at this time"}))
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    projectsDb.getProjectActions(id)
        .then( projects => {
            if(!projects){
                res.status(404).json({message: "We couldn't find a project that matches our records"})
            }else{
                res.status(200).json(projects)
            }
        })
        .catch( err => res.status(500).json({message: "There was an error getting this projects "}))
})


module.exports = router