<h1 align="center">Sweet-D</h1>
<div align="center">

![Version](<https://img.shields.io/static/v1?style=for-the-badge&label=Version&message=1.0.0&color=rgb(250,188,165)>)
![License](<https://img.shields.io/static/v1?style=for-the-badge&label=License&message=Creative%20Commons%20Zero%20v1.0%20Universal&color=rgb(250,188,165)>)

</div>
<p align="center">
  <img width="90" src="https://github.com/christhian12rv/Sweet-D/blob/master/img/Logo.png" alt="Sweet-D Logo">
</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
    <li><a href="#illustrations">Illustrations</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a Website created with **Nodejs**, **React** and **MySQL** to manage a confectionery.
The architecture used in the project is the **MVCS (Models Views Controllers Services)**. The official project is working commercially. You can visit it by this link: [https://sweet-d.herokuapp.com/](https://sweet-d.herokuapp.com/)

### Built With

-   [NodeJS](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MySQL](https://mysql.com/)
-   [React](https://reactjs.org/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

#### Node

-   #### Node installation on Windows

    Just go on [official Node.js website](https://nodejs.org/) and download the installer.
    Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

-   ##### Node installation on Ubuntu

    You can install nodejs and npm easily with apt install, just run the following commands.

        $ sudo apt install nodejs
        $ sudo apt install npm

-   ##### Other Operating Systems
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.3.0

    $ npm --version
    7.24.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

####

#### MySQL

-   #### MySQL Installation
    Go to [MYSQL Community Downloads](https://dev.mysql.com/downloads/mysql/) and download and install the MySQL for your system. [Configure](https://dev.mysql.com/doc/) MySQL based on your system.

If the installation was successful, you should be able to run the following command.

    $ mysql --version
    mysql  Ver 8.0.28-0ubuntu0.20.04.3 for Linux on x86_64 ((Ubuntu))

After your check if MySQL was successful installed, you should be able to run the following command replacing "your_user" with your previously created user without quotes (Default is root).

    $ mysql -u "your_user" -p

Then, type your password for access mysql and it's ready to use.

####

#### Cloudinary

[Cloudinary](https://cloudinary.com/) is a SaaS technology company headquartered in Santa Clara, California, with offices in Israel, England, Poland, and Singapore. The company provides cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video for websites and apps.

-   #### Requisites
    Create a [Cloudinary](https://cloudinary.com/) account, go to "Media Library" and create a "Products" folder. The necessary keys for put on .env file its located on "Dashboard".

####

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/christhian12rv/Sweet-D.git
    ```
2. Go to the /backend folder and install the NPM packages
    ```sh
    npm install
    ```
3. Go to the /frontend folder and install the NPM packages
    ```sh
    npm install
    ```

### Running the project

First, create a database in mysql and a .env file in /backend. Then change the .env file

```sh
# Database
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=your_mysql_database

#JWT
JWT_SECRET=your_jwt_secret_key

#SESSION
SESSION_SECRET=your_session_secret_key

#CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

To run the frontend and backend together, go to the /backend folder and run

    $ npm run dev

To run the backend, go to the /backend folder and run

    $ npm run server

To run the frontend, go to the /frontend folder and run

    $ npm start

Or go to the /backend folder and run

    $ npm run client

<!-- USAGE EXAMPLES -->

## Illustrations

<p align="center">
  <img width="100%" src="https://github.com/christhian12rv/Sweet-D/blob/master/img/Sweet-D.png" alt="Sweet-D Logo">
</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
