const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const id = new ObjectID();
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(error);
    }
    else {
        const db = client.db(databaseName);
        console.log('db connected');

        //insertion

        db.collection('tasks').insertMany([
            {
                description: 'Attend meeting',
                completed: true
            }, {
                description: 'Have seesions',
                completed: false
            }
        ], (error, result) => {
            if (error) {
                return console.log(error);
            }
            else {
                console.log(result)
            }
        })
        db.collection('users').insertOne(
            {
                username: 'John',
                password: "abg@rttgU",
                email: "abc@gmail.com",
                age: 25
            },
            (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(result)
                }
            })

        // Quering

        db.collection('users').find().toArray((error, tasks) => {
            console.log(tasks);
        })
        db.collection('users').find({ age: 25 }).toArray((error, users) => {
            console.log(users);
        })
        db.collection('tasks').findOne({ _id: new ObjectID("621ef4fdccbece911335f00d") }, (error, task) => {
            console.log(task)
        })
        db.collection('tasks').findOne((error, task) => {
            console.log(task)
        })

        //updation without callbacks

        db.collection('users').updateOne({
            username: "Mark"
        }, {
            $set: {
                age: 21
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        // updation using callbaks

        db.collection('users').updateMany({
            username: "Mike"
        }, {
            $set: {
                age: 30
            }
        }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        })

        // deletion

        db.collection('tasks').deleteOne({
            completed: false
        }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        })
        db.collection('users').deleteMany({
            age: 1
        }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        })

        //promises

        const promise = new Promise((resolve, reject) => {
            resolve('Ressolved promise');
        })
        promise.then((resolve) => {
            console.log(resolve)
        }).catch((error) => {
            console.log('Error!', error)
        })

    }
})

