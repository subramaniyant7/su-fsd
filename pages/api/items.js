import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'data.csv');
  const csv = fs.readFileSync(filePath, 'utf-8');
  const items = csv.trim().split('\n').map(line => {
    const [createdAt, filename] = line.split(';');
    return { createdAt, filename };
  });
  res.status(200).json(items);
}
