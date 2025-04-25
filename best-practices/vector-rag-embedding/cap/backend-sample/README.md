# Getting Started

npm install
cds deploy --to hana:ai-rag-embedding-cap-backend-demo-db
npm run watch



#### Test with curl
```bash
curl --request PUT --url http://localhost:4004/odata/v4/rag/ScienceDataUpload/content \
  --header 'Content-Type: text/csv' \
  --data '@./test/science-data-sample.csv'
```