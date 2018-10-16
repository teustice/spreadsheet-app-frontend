#!/bin/bash

#start 3 nginx containers for reverse proxy
docker start nginx-proxy

#start lets encrypt ssl certification tunnel
docker start ssl-tunnel


#start lets encrypt auto renewal
docker start letsencryptautorenew


#build project from DOCKERFILE
docker build -t elkwoodfrontend .

docker stop $(docker ps -a -q --filter ancestor=elkwoodfrontend --format="{{.ID}}")

#start container
docker run -d -p 3000:3000 \
  -e VIRTUAL_HOST=www.elkwood.com,elkwood.com \
  -e "LETSENCRYPT_HOST=www.elkwood.com, elkwood.com" \
  -e "LETSENCRYPT_EMAIL=tanner@cheshirebeane.com" \
  --restart=always \
  elkwoodfrontend
