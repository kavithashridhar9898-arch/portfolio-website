import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchPortfolioData = async () => {
  try {
    const [
      heroRes,
      aboutRes,
      projectsRes,
      skillsRes,
      experienceRes,
      settingsRes,
      socialRes
    ] = await Promise.all([
      api.get('/hero'),
      api.get('/about'),
      api.get('/projects?featured=true'),
      api.get('/skills'),
      api.get('/experience'),
      api.get('/settings'),
      api.get('/social')
    ]);

    return {
      hero: heroRes.data.data,
      about: aboutRes.data.data,
      projects: projectsRes.data.data,
      skills: skillsRes.data.data,
      experience: experienceRes.data.data,
      settings: settingsRes.data.data,
      social: socialRes.data.data
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
};
