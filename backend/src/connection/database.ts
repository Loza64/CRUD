import { connect, connection, set } from "mongoose"
import { database, dburl } from "../../config"

export default function GetConnection(): void {
    connect(dburl).then(() => {
        database("connection successful");
        set('autoCreate', true);
    }).catch((error) => {
        database(`connection failed: ${error}`);
    });
}