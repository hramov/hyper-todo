#!/bin/bash

cd ./apps/web
npm run build

cd ../bot
npm run build

scp -r ./dist/ ./public/ ./db/ ./package.json hramov@server:/opt/projects/webapp

scp -r ./public/* hramov@server:/var/www/html/webapp

ssh hramov@server "cd /opt/projects/webapp && npm install && sudo service webapp restart"