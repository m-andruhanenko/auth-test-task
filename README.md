# auth-test-task

## Deploy project

Cloning a project

```bash
git clone https://github.com/m-andruhanenko/auth-test-task.git
```

Installing dependencies

```bash
npm i
```

Installing postgresql on macOS:

```bash
brew install postgresql@14
```
```
brew services start postgresql@14
```

Installing postgresql on Windows/Linux:

`https://www.enterprisedb.com/downloads/postgres-postgresql-downloads` - link to download the installer.


Creating a database

```bash
psql postgres --u postgres
```
```
CREATE DATABASE auth_test_db;
```

## Start project

```bash
npm start 
```

## IP-address
`http://localhost:3000/`

## Docker
Run in dev mode

```shell
$ docker-compose -p auth-test-task up
```