
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'rdsdbchartweb.cabtxszlvlkn.ap-northeast-2.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'kim76050162',
  database: 'TEST',
  // connectTimeout : 10000000
});

// Database Connection
connection.connect(function(error) {
  if (error) throw error;
  console.log("Connected to RDS Database on AWS");
});

const grantPrivilegesSQL = `GRANT CREATE, SELECT, INSERT, UPDATE, DELETE ON TEST.* TO 'admin'`;

connection.query(grantPrivilegesSQL, function (error, results, fields) {
  if (error) throw error;
  // console.log("Privileges granted successfully");
});

export default connection;