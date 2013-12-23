short
=====

An url shortener for personal use

Development
-----------

### Testing Redis Client

In order to test the redis client execute the following sequence of
commands.

1. Start a redis test server

```shell
redis-server test/redis.test.conf
```

2. Run the tests with redis client

```shell
TEST_REDIS=TRUE ./node_modules/.bin/mocha --reporter spec
```

3. Flush keys

```shell
redis-cli -p 6380 FLUSHALL
```

4. Repeat ad nauseam
