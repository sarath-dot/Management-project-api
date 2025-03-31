module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        password: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        group_id: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 1 },
        last_login: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
    }, { timestamps: true },)
    return User
} 