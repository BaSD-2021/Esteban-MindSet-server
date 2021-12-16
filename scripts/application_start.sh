#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/BaSD-2021-Esteban-Api

#navigate into our working directory where we have all our github files
cd /home/ec2-user/BaSD-2021-Esteban-Api

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

aws s3 cp s3://basd-2021-environment/basd-esteban /tmp/.env
mv /tmp/.env /home/ec2-user/BaSD-2021-Esteban-Api/.env

#install node modules
npm install

#start our node app in the background
pm2 start npm --name "BaSD-2021-Esteban-API" -- run start
pm2 delete BaSD-2021-Esteban-API
pm2 start npm --name "BaSD-2021-Esteban-API" -- run start