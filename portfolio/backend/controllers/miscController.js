const { query, queryOne } = require('../database/connection');

// ──────────────────────────────────────────────────────────
// CONTACT (Public)
// POST /api/contact
// ──────────────────────────────────────────────────────────
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    await query(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || '', message]
    );

    res.status(201).json({ success: true, message: 'Message received. Thank you!' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// MESSAGES (Admin)
// GET /api/messages
// ──────────────────────────────────────────────────────────
const getAllMessages = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM messages ORDER BY created_at DESC');
    const unreadCount = rows.filter(r => !r.read_at).length;
    res.json({ success: true, data: rows, unreadCount });
  } catch (e) { next(e); }
};

// PATCH /api/messages/:id/read
const markRead = async (req, res, next) => {
  try {
    await query('UPDATE messages SET read_at = NOW() WHERE id = ? AND read_at IS NULL', [req.params.id]);
    res.json({ success: true, message: 'Message marked as read.' });
  } catch (e) { next(e); }
};

// DELETE /api/messages/:id
const deleteMessage = async (req, res, next) => {
  try {
    await query('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// HERO CONTENT
// GET /api/hero  (public)
// ──────────────────────────────────────────────────────────
const getHero = async (req, res, next) => {
  try {
    const hero = await queryOne('SELECT * FROM hero_content WHERE id = 1');
    res.json({ success: true, data: hero });
  } catch (e) { next(e); }
};

// PUT /api/hero  (admin)
const updateHero = async (req, res, next) => {
  try {
    const { title, subtitle, cta_text, cta_link, status_text } = req.body;
    let bg_image_url = req.body.bg_image_url;
    let avatar_url = req.body.avatar_url;

    if (req.files) {
      if (req.files.bg_image) bg_image_url = `/uploads/hero/${req.files.bg_image[0].filename}`;
      if (req.files.avatar) avatar_url = `/uploads/hero/${req.files.avatar[0].filename}`;
    }

    // Upsert hero row
    await query(
      `INSERT INTO hero_content (id, title, subtitle, cta_text, cta_link, bg_image_url, avatar_url, status_text)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title=VALUES(title), subtitle=VALUES(subtitle), cta_text=VALUES(cta_text),
         cta_link=VALUES(cta_link), bg_image_url=VALUES(bg_image_url),
         avatar_url=VALUES(avatar_url), status_text=VALUES(status_text)`,
      [title, subtitle, cta_text, cta_link, bg_image_url, avatar_url, status_text]
    );

    const hero = await queryOne('SELECT * FROM hero_content WHERE id = 1');
    res.json({ success: true, data: hero });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// ABOUT CONTENT
// ──────────────────────────────────────────────────────────
const getAbout = async (req, res, next) => {
  try {
    const about = await queryOne('SELECT * FROM about_content WHERE id = 1');
    res.json({ success: true, data: about });
  } catch (e) { next(e); }
};

const updateAbout = async (req, res, next) => {
  try {
    const { section_label, headline, body, stat_value, stat_label, feature_title, feature_body, card2_title, card2_body } = req.body;
    let card2_image_url = req.body.card2_image_url;
    if (req.file) card2_image_url = `/uploads/images/${req.file.filename}`;

    await query(
      `INSERT INTO about_content (id, section_label, headline, body, stat_value, stat_label, feature_title, feature_body, card2_title, card2_body, card2_image_url)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         section_label=VALUES(section_label), headline=VALUES(headline), body=VALUES(body),
         stat_value=VALUES(stat_value), stat_label=VALUES(stat_label), feature_title=VALUES(feature_title),
         feature_body=VALUES(feature_body), card2_title=VALUES(card2_title), card2_body=VALUES(card2_body),
         card2_image_url=VALUES(card2_image_url)`,
      [section_label, headline, body, stat_value, stat_label, feature_title, feature_body, card2_title, card2_body, card2_image_url]
    );

    const about = await queryOne('SELECT * FROM about_content WHERE id = 1');
    res.json({ success: true, data: about });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// SEO SETTINGS
// ──────────────────────────────────────────────────────────
const getSEO = async (req, res, next) => {
  try {
    const page = req.query.page || 'home';
    const seo = await queryOne('SELECT * FROM seo_settings WHERE page = ?', [page]);
    res.json({ success: true, data: seo });
  } catch (e) { next(e); }
};

const updateSEO = async (req, res, next) => {
  try {
    const { page, title, description, og_image, keywords, canonical_url, twitter_handle } = req.body;
    await query(
      `INSERT INTO seo_settings (page, title, description, og_image, keywords, canonical_url, twitter_handle)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title=VALUES(title), description=VALUES(description), og_image=VALUES(og_image),
         keywords=VALUES(keywords), canonical_url=VALUES(canonical_url), twitter_handle=VALUES(twitter_handle)`,
      [page || 'home', title, description, og_image, keywords, canonical_url, twitter_handle]
    );
    const seo = await queryOne('SELECT * FROM seo_settings WHERE page = ?', [page || 'home']);
    res.json({ success: true, data: seo });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// ANALYTICS
// ──────────────────────────────────────────────────────────
const trackPageView = async (req, res, next) => {
  try {
    const { page } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await query(
      'INSERT INTO analytics (page, user_agent, ip_address, referrer) VALUES (?, ?, ?, ?)',
      [page || '/', req.headers['user-agent'], ip, req.headers['referer'] || null]
    );
    res.json({ success: true });
  } catch (e) { next(e); }
};

const getAnalytics = async (req, res, next) => {
  try {
    const [totalViews] = await query('SELECT COUNT(*) as count FROM analytics');
    const [last7Days] = await query(`
      SELECT DATE(created_at) as date, COUNT(*) as views
      FROM analytics
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);
    const [topPages] = await query(`
      SELECT page, COUNT(*) as views
      FROM analytics
      GROUP BY page
      ORDER BY views DESC
      LIMIT 10
    `);
    const [messageCount] = await query('SELECT COUNT(*) as count FROM messages');
    const [unreadCount] = await query('SELECT COUNT(*) as count FROM messages WHERE read_at IS NULL');

    res.json({
      success: true,
      data: {
        totalViews: totalViews[0]?.count || 0,
        last7Days,
        topPages,
        totalMessages: messageCount[0]?.count || 0,
        unreadMessages: unreadCount[0]?.count || 0,
      }
    });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────
const getSettings = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT `key`, value FROM site_settings');
    const settings = {};
    rows.forEach(r => { settings[r.key] = r.value; });
    res.json({ success: true, data: settings });
  } catch (e) { next(e); }
};

const updateSettings = async (req, res, next) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await query(
        'INSERT INTO site_settings (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value=VALUES(value)',
        [key, value]
      );
    }
    res.json({ success: true, message: 'Settings updated.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// SOCIAL LINKS
// ──────────────────────────────────────────────────────────
const getAllSocial = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM social_links ORDER BY sort_order ASC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createSocial = async (req, res, next) => {
  try {
    const { platform, url, icon, sort_order } = req.body;
    const [result] = await query(
      'INSERT INTO social_links (platform, url, icon, sort_order) VALUES (?, ?, ?, ?)',
      [platform, url, icon, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM social_links WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateSocial = async (req, res, next) => {
  try {
    const { platform, url, icon, sort_order } = req.body;
    await query(
      'UPDATE social_links SET platform=?, url=?, icon=?, sort_order=? WHERE id=?',
      [platform, url, icon, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM social_links WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteSocial = async (req, res, next) => {
  try {
    await query('DELETE FROM social_links WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Social link deleted.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// RESUME
// ──────────────────────────────────────────────────────────
const getResume = async (req, res, next) => {
  try {
    const resume = await queryOne('SELECT * FROM resume ORDER BY id DESC LIMIT 1');
    res.json({ success: true, data: resume });
  } catch (e) { next(e); }
};

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });
    const file_url = `/uploads/resume/${req.file.filename}`;
    const file_name = req.file.originalname;

    // Clear old resumes and insert new
    await query('DELETE FROM resume');
    await query('INSERT INTO resume (file_url, file_name) VALUES (?, ?)', [file_url, file_name]);

    const resume = await queryOne('SELECT * FROM resume ORDER BY id DESC LIMIT 1');
    res.json({ success: true, data: resume });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// GALLERY
// ──────────────────────────────────────────────────────────
const getAllGallery = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const addGalleryImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });
    const { title, alt_text, sort_order } = req.body;
    const image_url = `/uploads/gallery/${req.file.filename}`;
    const [result] = await query(
      'INSERT INTO gallery (title, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)',
      [title, image_url, alt_text, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM gallery WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteGalleryImage = async (req, res, next) => {
  try {
    const item = await queryOne('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    if (!item) return res.status(404).json({ success: false, message: 'Image not found.' });
    const fs = require('fs'), path = require('path');
    if (item.image_url && item.image_url.startsWith('/uploads/')) {
      const fp = path.join(__dirname, '..', item.image_url);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    await query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Image deleted.' });
  } catch (e) { next(e); }
};

// ──────────────────────────────────────────────────────────
// ACHIEVEMENTS & CERTIFICATES
// ──────────────────────────────────────────────────────────
const getAllAchievements = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM achievements ORDER BY sort_order ASC, year DESC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createAchievement = async (req, res, next) => {
  try {
    const { title, description, icon, year, sort_order } = req.body;
    const [result] = await query(
      'INSERT INTO achievements (title, description, icon, year, sort_order) VALUES (?, ?, ?, ?, ?)',
      [title, description, icon, year, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM achievements WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateAchievement = async (req, res, next) => {
  try {
    const { title, description, icon, year, sort_order } = req.body;
    await query(
      'UPDATE achievements SET title=?, description=?, icon=?, year=?, sort_order=? WHERE id=?',
      [title, description, icon, year, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM achievements WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteAchievement = async (req, res, next) => {
  try {
    await query('DELETE FROM achievements WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Achievement deleted.' });
  } catch (e) { next(e); }
};

const getAllCertificates = async (req, res, next) => {
  try {
    const [rows] = await query('SELECT * FROM certificates ORDER BY sort_order ASC, issue_date DESC');
    res.json({ success: true, data: rows });
  } catch (e) { next(e); }
};

const createCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issue_date, expiry_date, credential_url, sort_order } = req.body;
    let image_url = req.body.image_url;
    if (req.file) image_url = `/uploads/certificates/${req.file.filename}`;
    const [result] = await query(
      'INSERT INTO certificates (title, issuer, issue_date, expiry_date, image_url, credential_url, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, issuer, issue_date, expiry_date, image_url, credential_url, sort_order || 0]
    );
    const row = await queryOne('SELECT * FROM certificates WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: row });
  } catch (e) { next(e); }
};

const updateCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issue_date, expiry_date, credential_url, sort_order } = req.body;
    let image_url = req.body.image_url;
    if (req.file) image_url = `/uploads/certificates/${req.file.filename}`;
    await query(
      'UPDATE certificates SET title=?, issuer=?, issue_date=?, expiry_date=?, image_url=?, credential_url=?, sort_order=? WHERE id=?',
      [title, issuer, issue_date, expiry_date, image_url, credential_url, sort_order || 0, req.params.id]
    );
    const row = await queryOne('SELECT * FROM certificates WHERE id = ?', [req.params.id]);
    res.json({ success: true, data: row });
  } catch (e) { next(e); }
};

const deleteCertificate = async (req, res, next) => {
  try {
    await query('DELETE FROM certificates WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Certificate deleted.' });
  } catch (e) { next(e); }
};

module.exports = {
  submitContact, getAllMessages, markRead, deleteMessage,
  getHero, updateHero, getAbout, updateAbout,
  getSEO, updateSEO, trackPageView, getAnalytics,
  getSettings, updateSettings,
  getAllSocial, createSocial, updateSocial, deleteSocial,
  getResume, uploadResume,
  getAllGallery, addGalleryImage, deleteGalleryImage,
  getAllAchievements, createAchievement, updateAchievement, deleteAchievement,
  getAllCertificates, createCertificate, updateCertificate, deleteCertificate,
};
