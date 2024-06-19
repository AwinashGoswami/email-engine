const axios = require('axios');
const esClient = require('../config/elasticsearch');

async function fetchEmailData(accessToken) {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages', {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data.value;
}

async function saveEmailData(emails) {
    for (let email of emails) {
        await esClient.index({
            index: 'emails',
            body: {
                subject: email.subject,
                from: email.from.emailAddress.address,
                bodyPreview: email.bodyPreview,
                receivedDateTime: email.receivedDateTime
            }
        });
    }
}

exports.syncEmails = async (req, res) => {
    if (!req.session.outlookToken) {
        return res.redirect('/auth/outlook');
    }
    const emails = await fetchEmailData(req.session.outlookToken);
    await saveEmailData(emails);
    res.send('Email data synchronized!');
};


exports.getEmails = async (req, res) => {
    try {
        const { body } = await esClient.search({
            index: 'emails',
            body: {
                query: {
                    match_all: {}
                }
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json(body.hits.hits);
    } catch (error) {
        console.error('Error searching emails:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
