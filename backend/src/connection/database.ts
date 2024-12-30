import { connect, connection, set } from "mongoose"
import { database, dburl } from "../../config"

export default function GetConnection(): void {
    connect(dburl)
    set("strictQuery", true)
    connection.on("open", () => { database('connection sucess') })
    connection.on("error", (err) => { database(`connection error ${err}`) })
}