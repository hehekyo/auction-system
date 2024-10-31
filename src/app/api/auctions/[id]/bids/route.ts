import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';  // Ensure this path is correct to your Prisma setup

interface Bid {
  id: number;
  auctionItemId: number;
  bidderAddress: string;
  bidAmount: number;
  timestamp: Date;
}

// Define the response type
interface Data {
  code: number;
  message: string;
  bids?: Bid[];
}

export default async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;  // Get the auction ID from the URL parameter

  if (!id || typeof id !== 'string') {
    res.status(400).json({ code: 400, message: "Invalid auction ID provided" });
    return;
  }

  const auctionId = parseInt(id, 10);
  if (isNaN(auctionId)) {
    res.status(400).json({ code: 400, message: "Auction ID must be a number" });
    return;
  }

  try {
    const bids = await prisma.bid.findMany({
      where: {
        auctionItemId: auctionId,
      },
      orderBy: {
        id: 'asc' // Or order by amount, date, etc.
      }
    });

    if (bids.length === 0) {
      res.status(404).json({ code: 404, message: "No bids found for this auction" });
    } else {
      res.status(200).json({ code: 0, message: "GET Bids", bids });
    }
  } catch (error) {
    console.error('Fetching bids failed:', error);
    res.status(500).json({ code: 500, message: "Error fetching bids" });
  }
}
