# NodeJS Web Application Example
A simple NodeJS express web application that connects to a MySQL database.

## Pre-requisites

+ [Docker](https://www.docker.com/products/docker-desktop)
+ [Docker Compose](https://docs.docker.com/compose/install/)

## Quick-Start
+ Rename the `.env-example` file to `.env`.
+ Use `docker-compose` to start up the services.
```
docker-compose up --build
```
+ The web application is available on `http://localhost:3000`.

## Development

+ Uncomment the lines for `volumes` and `working_dir` in `docker-compose.yml` file. This will mount the current directory to the working directory in the container.

+ Restart the `app` service as needed after making changes to the code.
```
docker-compose restart app
```

