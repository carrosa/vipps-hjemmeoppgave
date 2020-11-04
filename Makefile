download-go-mod:
	cd backend && go mod download
build-backend:
	cd backend && ./build.sh
download-npm-serve:
	npm i -g serve
serve-frontend:
	serve -s frontend/build -n
serve-backend:
	./backend/backend &

start: download-npm-serve download-go-mod build-backend serve-backend serve-frontend

.PHONY: start
