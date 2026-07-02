const { query, queryOne } = require('../database/connection');
const fs = require('fs');
const path = require('path');

// Resilient helper to parse project tags
const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags !== 'string') return [];
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed;
    return [parsed];
  } catch {
    return tags.split(',').map(t => t.trim()).filter(Boolean);
  }
};

// ──────────────────────────────────────────────────────────
// GET /api/projects  (public)
// ──────────────────────────────────────────────────────────
const getAllProjects = async (req, res, next) => {
  try {
    const featured = req.query.featured;
    let sql = 'SELECT * FROM projects';
    const params = [];
    if (featured === 'true') {
      sql += ' WHERE featured = 1';
    }
    sql += ' ORDER BY sort_order ASC, created_at DESC';
    const [projects] = await query(sql, params);

    const parsed = projects.map(p => ({
      ...p,
      tags: parseTags(p.tags)
    }));

    res.json({ success: true, data: parsed });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// GET /api/projects/:slug  (public)
// ──────────────────────────────────────────────────────────
const getProject = async (req, res, next) => {
  try {
    const project = await queryOne('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    project.tags = parseTags(project.tags);
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// POST /api/projects  (admin)
// ──────────────────────────────────────────────────────────
const createProject = async (req, res, next) => {
  try {
    const { title, slug, description, github_url, live_url, featured, sort_order } = req.body;
    let rawTags = req.body.tags || req.body['tags[]'] || [];
    const parsedTags = parseTags(rawTags);

    let image_url = req.body.image_url || null;
    if (req.file) {
      image_url = `/uploads/projects/${req.file.filename}`;
    }

    const [result] = await query(
      'INSERT INTO projects (title, slug, description, tags, image_url, github_url, live_url, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title || null,
        slug || null,
        description || null,
        JSON.stringify(parsedTags),
        image_url,
        github_url || null,
        live_url || null,
        featured === 'true' || featured === true || featured === 1 ? 1 : 0,
        parseInt(sort_order) || 0
      ]
    );

    const project = await queryOne('SELECT * FROM projects WHERE id = ?', [result.insertId]);
    project.tags = parseTags(project.tags);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// PUT /api/projects/:id  (admin)
// ──────────────────────────────────────────────────────────
const updateProject = async (req, res, next) => {
  try {
    const { title, slug, description, github_url, live_url, featured, sort_order } = req.body;
    let rawTags = req.body.tags || req.body['tags[]'] || [];
    const parsedTags = parseTags(rawTags);

    let image_url = req.body.image_url || null;
    if (req.file) {
      image_url = `/uploads/projects/${req.file.filename}`;
    }

    // Default parameters to null to avoid 'undefined' bind error
    await query(
      'UPDATE projects SET title=?, slug=?, description=?, tags=?, image_url=?, github_url=?, live_url=?, featured=?, sort_order=? WHERE id=?',
      [
        title || null,
        slug || null,
        description || null,
        JSON.stringify(parsedTags),
        image_url,
        github_url || null,
        live_url || null,
        featured === 'true' || featured === true || featured === 1 ? 1 : 0,
        parseInt(sort_order) || 0,
        req.params.id
      ]
    );

    const project = await queryOne('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    project.tags = parseTags(project.tags);
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// ──────────────────────────────────────────────────────────
// DELETE /api/projects/:id  (admin)
// ──────────────────────────────────────────────────────────
const deleteProject = async (req, res, next) => {
  try {
    const project = await queryOne('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });

    // Delete associated image file
    if (project.image_url && project.image_url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', project.image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Project deleted.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };
