import { NextApiRequest, NextApiResponse } from 'next';

const sdk = require('api')('@opensea/v2.0#ezpofluujh057');

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const slug = req?.query?.slug;
    if (!slug) return res.status(400).json({ error: 'slug is required' });

    const next = req?.query?.next;
    const query = { collection_slug: slug, next };

    if (!next || next === 'undefined') delete query.next;

    sdk.auth(process.env.OPENSEA_API_KEY);
    sdk.server(process.env.OPENSEA_API_HOST);
    const data = await sdk.list_nfts_by_collection(query);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
