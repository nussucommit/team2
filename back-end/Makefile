postgres:
	docker run --name postgres12 -p 8080:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -d postgres

createdb:
	docker exec -it postgres12 createdb --username=postgres --owner=postgres commitWinterProject

dropdb:
	docker exec -it postgres12 dropdb commitWinterProject

migrateup:
	migrate -database "postgres://postgres:password@localhost:8080/commitWinterProject?sslmode=disable" -path db/migrations up 

migratedown:
	migrate -database "postgres://postgres:password@localhost:8080/commitWinterProject?sslmode=disable" -path db/migrations down

.PHONY:
	postgres createdb dropdb migrateup migratedown