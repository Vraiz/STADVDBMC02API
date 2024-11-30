import express from 'express'
import cors from 'cors'//remove me later

const app = express()
app.use(express.json())
app.use(cors())//remove me later

import {getAll, getGame, updateGame, deleteGame, createGame, get100, getInfo} from './index.js'

//gets 100 games
app.get("/games:id", async (req, res) =>{
    const id = req.params.id
    const games = await get100(parseInt(id.replace(":",'')))
    res.status(200).send(games)
})

//gets 1 games
app.get("/game:id", async (req, res) =>{
    const id = req.params.id
    const games = await getGame(parseInt(id.replace(":",'')))
    res.status(200).send(games)
})

//gets total number of items
app.get("/count", async (req, res) =>{
    const games = await getInfo()
    res.status(200).send(games.count)
})

//insert
app.post("/games", async (req, res) =>{
    const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
    const games = await createGame(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
    res.status(200).send(games)
})

//update
app.patch("/games:id", async (req, res) =>{
    const id = req.params.id
    const { name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners } = req.body
    const games = await updateGame(parseInt(id.replace(":",'')), name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
    res.status(200).send(games)
})

//delete
app.delete("/games:id", async (req, res) =>{
    const id = req.params.id
    const games = await deleteGame(parseInt(id.replace(":",'')))
    res.status(200).send(games)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('app is running at port 8080')
})

