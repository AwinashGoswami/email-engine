const { Client } = require('@elastic/elasticsearch');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

const connection = async () => {
    try {
        const isElasticsearchRunning = await esClient.ping();
        if (isElasticsearchRunning) {
            console.log('Elasticsearch connection established');
        } else {
            console.error('Elasticsearch connection failed');
        }
    } catch (error) {
        console.error('Elasticsearch connection failed', error);
    }
};

connection();

module.exports = esClient;
