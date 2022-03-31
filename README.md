# Intelligent Trip Planner

_Backend for the Capstone project - [Intelligent Trip Planner](https://wkgetaway.herokuapp.com/)._

<p align="left">
  <img src="https://user-images.githubusercontent.com/32144454/133477206-4c5804c1-3428-4f06-8aaa-c9d896c12bba.png" width="450" title="Intelligent Trip Planner">
</p>

[![Build Status](https://app.travis-ci.com/quangLinh9038/tripplanner.svg?token=n3xBwTA5sHzC8nPx9Tic&branch=master)](https://app.travis-ci.com/quangLinh9038/trip-planner)

## Features

- CRUD operations for all models of the system.
- Authentication and Authorization middleware token based.
- Querying locations of personalized interests.
- Querying full Itinerary for a new trip.

## Prerequisites

You need to have Node and NPM installed on your computer.

- Installing [Node](node) automatically comes with npm.

  - [Node.js](https://nodejs.org/en/about/): `16.x`
  - [npm](https://www.npmjs.com/): `7.x`

- Databases:
  - [PostreSQL](https://www.postgresql.org/): `13.x`
  - [Neo4j](https://neo4j.com/): `4.3.3`

## Quick Start

### Setup

- Installing the project dependencies

  > Run following command

  ```shell
  $ npm install
  ```

- Create new `.env` file that containing your database config and start both PostgreSQL and Neo4j.

- Start the server
  > Run command below
  ```shell
  $ npm run dev
  ```
- The server will be running on `http://localhost:3000` as base url for endpoints.

### API Endpoints

We have released <img align="left" width="20" height="20" src="https://seeklogo.com/images/P/postman-logo-F43375A2EB-seeklogo.com.png" alt="API Document"/> We relesased a public **[Postman API Document](https://documenter.getpostman.com/view/9508083/Tzz5vKUi)**

## Credits

- Nguyen Quang Linh
- Nguyen Thanh Dat
- Le Gia Thuan
- Mai Viet Cuong
