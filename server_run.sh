cd ./mongodb/mongodb/bin/
./mongod --dbpath ../data &
cd ../../../Backend/
sleep 5
npm install -y
npm start