const { query, queryOne } = require('../database/connection');

// Generic CRUD factory for simple tables
const createCRUD = (table, orderBy = 'sort_order ASC') => ({
  getAll: async (req, res, next) => {
    try {
      const [rows] = await query(`SELECT * FROM ${table} ORDER BY ${orderBy}`);
      res.json({ success: true, data: rows });
    } catch (e) { next(e); }
  },
  getOne: async (req, res, next) => {
    try {
      const row = await queryOne(`SELECT * FROM ${table} WHERE id = ?`, [req.params.id]);
      if (!row) return res.status(404).json({ success: false, message: 'Not found.' });
      res.json({ success: true, data: row });
    } catch (e) { next(e); }
  },
});

// ──────────────────────────────────────────────────────────
// SKILLS Controller
// ──────────────────────────────────────────────────────────
const getAllSkills = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM skills ORDER BY category, sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createSkill = async (req, res, next) => {
  try {
    const { name, category, icon, proficiency, sort_order } = req.body;
    const [result] = await query(
      'INSERT INTO skills (name, category, icon, proficiency, sort_order) VALUES (?, ?, ?, ?, ?)',
      [name, category, icon, proficiency, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM skills WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateSkill = async (req, res, next) => {
  try {
    const { name, category, icon, proficiency, sort_order } = req.body;
    await query(
      'UPDATE skills SET name=?, category=?, icon=?, proficiency=?, sort_order=? WHERE id=?',
      [name, category, icon, proficiency, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteSkill = async (req, res, next) => {
  try {
    await query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// EXPERIENCE Controller
// ──────────────────────────────────────────────────────────
const getAllExperience = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM experience ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createExperience = async (req, res, next) => {
  try {
    const { title, company, period, description, sort_order } = req.body;
    const [result] = await query(
      'INSERT INTO experience (title, company, period, description, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, company, period, description, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM experience WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateExperience = async (req, res, next) => {
  try {
    const { title, company, period, description, sort_order } = req.body;
    await query(
      'UPDATE experience SET title=?, company=?, period=?, description=?, sort_order=? WHERE id=?',
      [title, company, period, description, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM experience WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteExperience = async (req, res, next) => {
  try {
    await query('DELETE FROM experience WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Experience deleted.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// EDUCATION Controller
// ──────────────────────────────────────────────────────────
const getAllEducation = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM education ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createEducation = async (req, res, next) => {
  try {
    const { degree, institution, period, description, sort_order } = req.body;
    const [result] = await query(
      'INSERT INTO education (degree, institution, period, description, sort_order) VALUES (?, ?, ?, ?, ?)',
      [degree, institution, period, description, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM education WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateEducation = async (req, res, next) => {
  try {
    const { degree, institution, period, description, sort_order } = req.body;
    await query(
      'UPDATE education SET degree=?, institution=?, period=?, description=?, sort_order=? WHERE id=?',
      [degree, institution, period, description, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM education WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteEducation = async (req, res, next) => {
  try {
    await query('DELETE FROM education WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Education entry deleted.' });
  } catch (e) { next(e); }
};

module.exports = {
  getAllSkills, createSkill, updateSkill, deleteSkill,
  getAllExperience, createExperience, updateExperience, deleteExperience,
  getAllEducation, createEducation, updateEducation, deleteEducation,
};
