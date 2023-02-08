#! /bin/bash

function stop_services() {
  pm2 stop all | grep 'PM2'
  pm2 delete all | grep 'PM2'
}

stop_services

printf "\n> Script terminado\n\n"
