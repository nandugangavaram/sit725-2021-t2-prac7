<p align="center">
 <h1 align="center">Indian Cookery</h1>
 <p align="center">For all passionate people who want to share and learn Indian Cuisines</p>
</p>
  <p align="center">
<img alt="js" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="js" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
<img alt="html5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
<img alt="css" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>
<img alt="mongodb" src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>

# sit725-2021-t2-prac7

    This project is about providing people who are craving to try indian food can go through the available recipes or 
    can even post new recipes on their own, sharing their own recipes with never tried before incrediants which taste good.

# Wireframes 

The wireframes created for this application are available in `https://github.com/nandugangavaram/sit725-2021-t2-prac4/tree/master/docs` folder with the name `IndianCookery.pdf`.

# Cloning the Repository

Get this repo to your local systems by running the following command:
```
git clone https://github.com/nandugangavaram/sit725-2021-t2-prac7
```

# Installing required Modules

Install all the dependencies by running the following command:
```
npm install
```

# Running the Application

After installing, run the server using the following command: 
```
npm start
```


If instead, you get something like the following, someone is already
using the default port of 8080:

    Server running at http://127.0.0.1:8080/

    events.js:72
        throw er; // Unhandled 'error' event
                  ^
    Error: listen EADDRINUSE
        at errnoException (net.js:901:11)
        at Server._listen2 (net.js:1039:14)
        at listen (net.js:1061:10)
        at Server.listen (net.js:1127:5)
        ...

Once the server is running, test it by visiting the following URL in your
browser:

    http://localhost:8080/


## Files in this repository
--------------------------------------------------------------------------------

`server.js`

The server written with node.js.  

In this case, the contents of the file are:

    sit725-2021-t2-prac7

---

`LICENSE`

The open source license for this sample; in this case, it's licensed under
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

---

`manifest.yml`

---

`package.json`

Standard package.json file for node packages.  You will need this file for two
reasons:

* identify your node package dependencies during `npm install`

See the npm doc
*[package.json](https://npmjs.org/doc/json.html)*
for more information.

---


## Running Test cases
-------------------------------------------------------------------------------

In order to run test cases, and see the results run the below command in the terminal:

```
npm run test
```

## Docker Public Repository
-------------------------------------------------------------------------------

In order to get the latest docker build of the application you can use the below command to pull the repo:

```
docker pull nandugangavaram/indiancookery
```
