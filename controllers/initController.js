const database = require("../config/config");

const initializeDatabase = (req, res) => {
    try {
        const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fname VARCHAR(255) NOT NULL,
                lname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL DEFAULT '1',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        database.query(createUsersTableQuery, (err, results, fields) => {
            if (err) {
                console.error('Error creating table:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ "message": "Users Database Created Successfully!", "success": true });
        });

    } catch (e) {
        console.log("error while initialization", e)
        return res.status(500).json({ error: "error while initialization" });
    }
}

module.exports = { initializeDatabase }