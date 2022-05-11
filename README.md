## Installation

```bash
# install dependencies
$ yarn
# spin up postgres & redis containers
$ docker-compose up
# copy env from sample to env
$ cp .env.sample .env
```

## Running the app

```bash
# development
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## API documentation

https://jellyfish-app-kyyjr.ondigitalocean.app/api/


## Notes
If I had the time, I would have done a few things differently.
- When converting the upvote add/remove from synchronous to asynchronous, instead of changing the existing API, I should have made a new async API and used it for the v2 of the app. This is so that the existing client would be compatible with the new backend
- Right off, from the very start the article API would not be sending comments at all, maybe top 5 - 10 comments if we wanted to pre render/ SSR the article for SEO purposes.
- I would have given more thought on using polling vs web sockets for the real time upvotes feature. My reasoning for using polling to get the latest upvotes is, currently, the articles & comments are served from the same server, web sockets would eat up a connection on the server, which could be used to serve the article instead. If the architecture was a service just for serving comments, then I would have leaned towards using web sockets, This way even if web sockets occupying most of the connections, it wouldn't affect serving articles as it would be in a different service.
- Used JWT to identify the user, instead of sending the userId in the payload with every request. This would help in hiding the user id in the requests. The server can parse the JWT to identify the user.
- Base64 encode the ids and then send it to the client. To some extent it wouldn't let other guess so easily that we use uuid as id
- The queries to get data from the database fetch a lot of unnecessary data. I would try to optimize by only querying what we really need.
- The way the comments and replies are managed in the same table. I would have a single different table just for all the replies (even the nested nested replies). This would prevent the comments table from being filled with replies, later when the scale is very huge, we can just offload the replies to a different database and load the replies on clicking the main comment (The way that reddit does). Also the nesting/tree of replies would have to be done using materialized path, closure table or some other way than what I have done in this project.  