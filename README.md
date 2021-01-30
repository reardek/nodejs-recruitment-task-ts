# Node.js recruitment task

Simple API to uploads movies to MariaDB database. Written in Typescript and TypeORM

# Before reading

Because it is only simple task to provide my skills I made 
conscious mistakes for my and your convenience.

- I not full contenerized project, because it's not implement database. If I put database to docker-compose, it will not run on first time, because a database container starts slower then the API application need. Depends_on parametr in docker-compose not helped.
- I know that I should not put .env file to GitHub and in another situation I put that file in .gitignore. 
# Addition features
- All project was made in TypeScript
- For documentation I use Swagger, it's provide provide on path "/api-docs"

# Github actions

### Please check my Github Actions
# Paths
- /auth - (POST)  - generate JWT base on credential in body
- /users - (GET) - get all users
- /movies - (GET) - get all movies on database
- /movie - (POST) - put movie to database, base on title parametr in body, require Authorization in header, check is use basic or premium
- /api-docs - Swagger API documentation
