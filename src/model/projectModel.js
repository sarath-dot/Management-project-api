module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("projects", {
        id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        description: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        created: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
    }, { timestamps: false },)
    return Project
} 