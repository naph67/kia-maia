const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'naph67';
const REPO_NAME = 'kia-maia';
const FILE_PATH = 'songs.json';

router.post('/', async (req, res) => {
  const newSong = req.body;

  try {
    const getRes = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    const sha = getRes.data.sha;
    const content = Buffer.from(getRes.data.content, 'base64').toString('utf-8');
    const songs = JSON.parse(content);

    songs.push(newSong);
    const updatedContent = Buffer.from(JSON.stringify(songs, null, 2)).toString('base64');

    await axios.put(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      message: `Add new song: ${newSong.title}`,
      content: updatedContent,
      sha: sha
    }, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    res.status(200).send({ message: 'Song added successfully!' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send({ error: 'Failed to update songs.json' });
  }
});

module.exports = router;