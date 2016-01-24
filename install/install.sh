#!/bin/bash
wget https://nodejs.org/dist/v4.0.0/node-v4.0.0-linux-armv7l.tar.gz 
tar -xvf node-v4.0.0-linux-armv7l.tar.gz 
cd node-v4.0.0-linux-armv7l
sudo cp -R * /usr/local/
cd ..
sudo npm install -g node-gyp
sudo apt-get -y install bluetooth bluez libbluetooth-dev libudev-dev
cd ..
sudo npm install noble
sudo npm install sensortag


