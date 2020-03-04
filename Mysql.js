class connectMysql {
    constructor (){
        this.connect = require('mysql');
        this.Mysql = this.connect.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"demoso1"
            
        })

    }
    all(){
        let data = "SELECT * FROM users";
        this.Mysql.query(data,(err,reslut)=>{
            if(err) throw err;
            return reslut;
        })
    }
}
// export default Mysql;
module.exports = connectMysql;