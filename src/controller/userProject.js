//importing modules
const bcrypt = require("bcrypt");
const db = require("../model/index");
const jwt = require("jsonwebtoken");
const { QueryTypes, DataTypes } = require('sequelize');

// Assigning Projects to the variable Project
const Project = db.project;


const getProject = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM projects`;
        const result = await Project.sequelize.query(selectQuery, {
            type: QueryTypes.SELECT,
        });
        //send Project data

        if (result) {
            return res.status(200).json({ projectList: result });
        } else {
            return res.status(200).json({});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

//add a Project

const add = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.body || !req.body.name || !req.body.description) {
            return res.status(400).send('Parameters are missing or invalid');
        }
        //add a Project 
        const addProject = async () => {
            try {
                req.body.created = new Date()
                const colNames = Object.keys(req.body);
                const colValues = Object.values(req.body);
                const colFields = `(${colNames.join(', ')})`;
                const placeholders = colValues.map(() => '?').join(', ');

                const query = `INSERT into projects  ${colFields} VALUES (${placeholders})`;
                await Project.sequelize.query(query, {
                    replacements: colValues,
                    type: QueryTypes.INSERT,
                });
                return { success: true }
            }
            catch (error) {
                return { success: false }
            }
        }

        const add = await addProject()
        if (add.success) {
            const selectQuery = `SELECT * FROM projects WHERE name = ?`;
            const [result] = await Project.sequelize.query(selectQuery, {
                replacements: [name],
                type: QueryTypes.SELECT,
            });
            //send Project data
            return res.status(200).json({ success: true, result: result });
        } else {
            return res.status(200).send({ success: false, result: {}, errorMsg: 'Project add fail' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};


//update Project list

const update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.body || !req.params || !req.params.id || !req.body.name || !req.body.description) {
            return res.status(400).send('Parameters are missing or invalid');
        }
        //update a Project 
        const updateProject = async () => {
            try {
                const updates = Object.entries(req.body).map(([key, value]) => {
                    // if (Array.isArray(value)) {
                    //     return `${key} = '${value.join(',')}'`;
                    // }
                    return `${key} = :${key}`;
                });

                const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = :id`;

                await Project.sequelize.query(query, {
                    replacements: {
                        ...req.body,
                        id: Number(id),
                    },
                    type: QueryTypes.UPDATE,
                });
                return { success: true }
            }
            catch (error) {
                return { success: false }
            }
        }
        const update = await updateProject()
        if (update.success) {
            const selectQuery = `SELECT * FROM projects WHERE id = ?`;
            const [result] = await Project.sequelize.query(selectQuery, {
                replacements: [Number(id)],
                type: QueryTypes.SELECT,
            });
            //send Project data
            return res.status(200).json({ success: true, projectList: result });
        } else {
            return res.status(200).send({ success: false, projectList: {}, errorMsg: 'Project edit fail' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

// delete a Project

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.params || !req.params.id) {
            return res.status(400).send('Parameters are missing or invalid');
        }

        //find a Project by Project id
        const deleteProject = async () => {
            try {
                const query = `DELETE FROM projects WHERE id = :id`;

                await Project.sequelize.query(query, {
                    replacements: { id: id },
                    type: QueryTypes.DELETE,
                });
                return { success: true }
            }
            catch (error) {
                return { success: false }
            }
        }
        const result = await deleteProject()

        if (result.success) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(200).send({ success: false, errorMsg: 'Unable to delete project' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports = {
    getProject,
    add,
    update,
    deleteProject
};