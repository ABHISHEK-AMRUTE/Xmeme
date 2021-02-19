sudo apt update -y
sudo apt install nodejs npm -y
mkdir mongodb
cd mongodb/
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.7.tgz
tar xvf mongodb-linux-x86_64-3.4.7.tgz
mv mongodb-linux-x86_64-3.4.7 mongodb
cd mongodb
export PATH=$PATH:/../../mongodb/mongodb/bin
mkdir data
cd bin
./mongod --dbpath ../data &