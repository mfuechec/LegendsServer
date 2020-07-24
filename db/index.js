const mysql = require('mysql');
const config = require('./config.js');

var connection = mysql.createConnection(config.mysqlConfig);

findTrending = function (callback) {
    connection.query(`SELECT * FROM Trending`, (error, results) => {
        if (error) {
            callback(error, null);
        } else {
            let data = [];
            results.map((result) => {
                connection.query(`SELECT * FROM PointOfInterest WHERE id = ${result.pointId}`, (error, results2) => {
                    if (error) {
                        callback(error, null);
                    } else {
                        data.push(results2);
                        if (data.length === results.length) {
                            callback(null, data);
                        }
                    }
                })
            });
        }
    })
}

signUpAttempt = function (credentials, callback) {
    connection.query(`SELECT id from Users WHERE username = '${credentials.username}'`, function (error, results) {
        if (error) {
            callback(error, null);
        } else {
            if (results.length === 0) {
                connection.query(`INSERT INTO Users (username, password) VALUES ('${credentials.username}', '${credentials.password}')`, function (error, results) {
                    if (error) {
                        callback(error, null);
                    } else {
                        callback(null, 'Sign up successful');
                    }
                })
            } else {
                callback(null, 'Username already exists');
            }
        }
    })
}

loginAttempt = function (credentials, callback) {
    connection.query(`SELECT COUNT(*) from Users WHERE username='${credentials.username}' AND password='${credentials.password}'`, function (error, results) {
        if (error) {
            callback(error, null);
        } else {
            let keys = Object.keys(results[0]);
            if (results[0][keys[0]] === 0) {
                callback(null, 'Login attempt failed')
            } else {
                callback(null, 'Login successful')
            }
        }
    })
}

module.exports.findTrending = findTrending;
module.exports.signUpAttempt = signUpAttempt;
module.exports.loginAttempt = loginAttempt;