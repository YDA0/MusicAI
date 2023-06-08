function init(Sequelize, connection) {
    /* 
      boardNo: 1, title: "제목", writer: "윤다영",
      viewCount: 1, writeDate: "2023-03-23"
    */
    global.Board = connection.define("board", {
        boardNo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
        },
        writer: {
            type: Sequelize.STRING,
        },
        body: {
            type: Sequelize.TEXT,
        },
        viewCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        writeDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        }
    })

    global.User = connection.define("user", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        joinDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    })
    Board.belongsTo(User, {
        as: "user",
        foreignKey: "userId"
    })
    User.hasMany(Board, {
        as: "boards",
        foreignKey: "userId"
    })

    connection.sync({
        alter: true
    })
}

module.exports = init