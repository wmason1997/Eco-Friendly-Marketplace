# Taiga

Plot a Greener Path, One Product at a Time.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Screenshots](#screenshots)
- [Figma Wireframing](#figma-wireframing)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Description

A marketplace for eco-friendly products and their economincal footprint. Taiga is where sustainable shopping is revolutionized for the eco-conscious consumer. Effortlessly browse categories or search items, each with clear carbon, energy, and waste footprints. Our platform empowers you with eco-scores on products, making your choices both informed and impactful. Join our journey to a greener future with every purchase.


## Screenshots
![Development Diagram](/public/images/Taiga%20User%20Control%20Flow%20Diagram.png)
![Taiga Screenshot 1](/public/images/Taiga-Screenshot-1.png)
![Taiga Screenshot 2](/public/images/Taiga-Screenshot-2.png)
![Taiga Screenshot 3](/public/images/Taiga-Screenshot-3.png)
![Taiga Screenshot 4](/public/images/Taiga-Screenshot-4.png)
![Taiga Screenshot 5](/public/images/Taiga-Screenshot-5.png)
![Taiga Screenshot 6](/public/images/Taiga-Screenshot-6.png)
![Taiga Screenshot 7](/public/images/Taiga-Screenshot-7.png)
![Taiga Screenshot 8](/public/images/Taiga-Screenshot-8.png)
![Taiga Screenshot 9](/public/images/Taiga-Screenshot-9.png)
![Taiga Screenshot 10](/public/images/Taiga-Screenshot-10.png)

## Figma Wireframing
The [Figma Ideation](https://www.figma.com/file/XdPShwohSlsWUqvNwLLtak/Taiga?type=design&node-id=0-1&mode=design) occurred here for those interested.


## Features

- One-stop sustainability shopping
- User account to save and share product browsing
- Review product carbon, energy, an waste footprint

## Getting Started

### Prerequisites
 - Express.js
 - Node.js (and nodemon)
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
```js
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
```

## Contributing
Please reach out to William Mason, Lauren Palmer, or Kianna Young at https://github.com/wmason1997, https://github.com/lepalmer01, or https://github.com/Baiyine respectively with any suggestions.

