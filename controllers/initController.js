const database = require("../config/config");

const initializeDatabase = async (req, res) => {
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

        const createProjectTableQuery = `
            CREATE TABLE IF NOT EXISTS projects (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                owner VARCHAR(255) NOT NULL,
                description TEXT,
                tags VARCHAR(255),
                privacy VARCHAR(50),
                members TEXT,
                start_date DATETIME,
                end_date DATETIME,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        const createTaskTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_id INT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                owner VARCHAR(255),
                assigned_to VARCHAR(255),
                assigned_by VARCHAR(255),
                priority VARCHAR(50),
                service_date DATETIME,
                next_service_date DATETIME,
                customer_id INT,
                task_type VARCHAR(50),
                start_date DATETIME,
                end_date DATETIME,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        const createCustomerTableQuery = `
            CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                phone VARCHAR(20),
                phone2 VARCHAR(20),
                address TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        const createOrderTableQuery = `
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                task_id INT,
                customer_id INT,
                price INT,
                advance_price INT,
                remaining_price INT,
                due_date DATETIME,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `

        const queries = [
            createUsersTableQuery,
            createProjectTableQuery,
            createTaskTableQuery,
            createCustomerTableQuery,
            createOrderTableQuery
        ];

        queries.forEach((query, index) => {
            database.query(query, (err, results, fields) => {
                if (err) {
                    console.error(`Error creating table ${index + 1}:`, err);
                    return;
                }
                console.log(`Table ${index + 1} ready.`);
            });
        });


        return res.status(200).json({
            message: "Database initialized successfully",
            success: "true",
            type: "success"
        });

    } catch (e) {
        console.log("error while initialization", e)
        return res.status(500).json({ error: "error while initialization" });
    }
}

module.exports = { initializeDatabase }