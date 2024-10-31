import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma';

export async function GET() {
    

    const auctions = await prisma.auctionItem.findMany({
        where: { ended: false },
        orderBy: { endTime: 'asc' },
      });

    return NextResponse.json({
        code:0,
        message:"ok",
        auctions
    });
};
