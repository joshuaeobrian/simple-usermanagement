# To build image run the following commands
# docker build -t db .
# docker run -d -p 3306:3306 --name db -e MYSQL_ROOT_PASSWORD=123qwe db
FROM mysql

ENV MYSQL_DATABASE usermanagement

COPY ./sql-scripts/ /docker-entrypoint-initdb.d/
