# Taiga

Plot a Greener Path, One Product at a Time.

## Table of Contents

- [Project Name](#project-name)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Description

A marketplace for eco-friendly products and their economincal footprint.

![Development Diagram](<public/images/Process Diagram.png>)

## Features

- One stop sustainability shopping
- User account to save and share product browsing
- Review product carbon, energy, an waste footprint

## Getting Started

### Prerequisites
 - Express.js
 - Node.js
 - Handlebars.js
 - MySQL
 - Insomnia
 - Heroku
 - JAWSDB
 
 ### Installation

 - Clone the repository: git clone https://github.com/yourusername/your-project.git
 - Navigate to the project directory: cd your-project
 - Install dependencies: npm install
 - Configure the application: cp config.example.json config.json
 - Start the server: npm start

 ## Usage
 
[Deployed App](https://immense-tor-19935-d43f1bf06a0b.herokuapp.com/)

 Configure settings for Database URl and API Keys.
 Save changes and return to main page and use application. 
 *configuration may vary if opting to use other languages*

## Configuration

The application can be configured by modifying the config.js file located in the project root directory. Here are the available configuration options:

- Port: Set the port on which the application will listen.
- Database URL: Specify the URL for the database connection.
- API Key: 55957bf446b7d4d67ca04f80971ff021bac036f5439867faa62438a3271337d0

*config.js*
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL, {
    define: {
      underscored: false,
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
  );
}

module.exports = sequelize;


## Contributing
  *tb added*

## License

