import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const node0 = mysql.createPool({
    host: process.env.MYSQL_HOST0,
    user: process.env.MYSQL_USER0,
    password: process.env.MYSQL_PASS0,
    database: process.env.MYSQL_SCHEMA0
}).promise()


//get
export async function getAll() {
    const result = await node0.query(`
        SELECT *
        FROM fact_game;
    `)
    return result[0]
}

export async function get100(start) {
    const result = await node0.query(`
        SELECT *
        FROM fact_game
        LIMIT 100 OFFSET ?;
    `, [start])
    return result[0]
}

export async function getGame(id) {
    const result = await node0.query(`
        SELECT *
        FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0][0]
}

export async function getInfo() {
    const result = await node0.query(`
        SELECT COUNT(*) as count FROM fact_game;
    `)
    return result[0][0]
}

//create
export async function createGame(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node0.query(`
        INSERT INTO fact_game(name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners])
    return result[0]
}

//update
export async function updateGame(id, name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners) {
    const result = await node0.query(`
        UPDATE fact_game SET name = ?, windows = ?, linux = ?, mac = ?, price = ?, release_date = ?, required_age = ?, dlc_count = ?, metacritic_score = ?, achievements = ?, positive = ?, negative = ?, estimated_owners = ?
        WHERE game_id = ?;
    `, [ name, windows, linux, mac, price, release_date, required_age, dlc_count, metacritic_score, achievements, positive, negative, estimated_owners, id])
    return result[0]
}


//delete
export async function deleteGame(id) {
    const result = await node0.query(`
        DELETE FROM fact_game
        WHERE game_id = ?;
    `, [id])
    return result[0]
}

