import { NextResponse } from "next/server";
import prisma from '@/prisma';

interface IParams{
    params: {
        id: string
    }
}


//GET => /api/auctions/:id
export async function GET(request: Request, { params }: IParams) {

    const auctionId = parseInt(params.id, 10);

    // Retrieve auction data using Prisma
    const auction = await prisma.auctionItem.findUnique({
      where: {
        id: auctionId,
      },
    });
  
    // Check if auction was found
    if (!auction) {
      return new NextResponse(JSON.stringify({
        code: 404,
        message: "Auction not found",
      }), { status: 404 });
    }
  
    return new NextResponse(JSON.stringify({
      code: 0,
      message: "GET",
      data: auction,
    }), { status: 200 });
  }

