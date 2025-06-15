const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
app.use(express.json());

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS();

app.post('/log', async (req, res) => {
  const log = {
    timestamp: new Date().toISOString(),
    ...req.body,
  };

  await sqs.sendMessage({
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify(log),
  }).promise();

  res.status(200).send('Log enviado');
});

app.listen(3000, () => console.log('API rodando na porta 3000'));