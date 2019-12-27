dev_dockerfile  := docker/dev.Dockerfile
prod_dockerfile := docker/prod.Dockerfile

work_dir := $(shell pwd)

build-dev:
	docker build -f $(dev_dockerfile) -t liff-react-dev .

run-dev:
	docker run -p 3000:3000 -v /app/node_modules -v $(work_dir):/app liff-react-dev

build-prod:
	docker build -f $(prod_dockerfile) -t liff-react-prod --no-cache=true .

run-prod:
	docker run -p 80:80 -p 443:443 --rm -it liff-react-prod