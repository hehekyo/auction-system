"use client"
import { Card, Input, Button, Typography, message } from 'antd';
import { useState, useEffect } from 'react';


const { Title } = Typography;

interface Auction {
  id: number;
  sellerAddress: string;
  minBid: number;
  highestBid: number | null;
  highestBidder: string | null;
  endTime: string;
  ended: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AuctionDetail({ params }: { params: { id: string } }) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bid, setBid] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  

  // Fetch auction details when component mounts or when id changes
  useEffect(() => {
    async function fetchAuction() {
      const res = await fetch(`/api/auctions/${params.id}`);
      
      
      const result = await res.json();

      if (result.data) { // 确保存在拍卖数据
        console.log("======data:", result.data); // 打印拍卖数据
        
        setAuction(result.data); // 设置拍卖数据到状态
      }
  
    }

    fetchAuction();
  }, [params.id]);

  async function handleBid() {
    if (!auction) return;

    setLoading(true);
    const res = await fetch(`/api/auctions/${params.id}/bid`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bidAmount: Number(bid) }),
    });
    if (res.ok) {
      message.success('Bid placed successfully!');
      
    } else {
      message.error('Failed to place bid.');
    }
  }

  if (!auction) {
    return <p>Loading...</p>; // or any other loading indicator
  }

  return (
    <div className='container mx-auto p-4'>
      <Card title={`Auction ${auction.id}`}>
        
        <p>seller Address:${auction.sellerAddress}</p>
        <p>Minimum Bid: ${auction.minBid}</p>
        <p>Current Highest Bid: ${auction.highestBid || 'No bids yet'}</p>
        <p>End Time: {new Date(auction.endTime).toLocaleString()}</p>
        <Input
          type="number"
          placeholder="Enter your bid"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleBid} loading={loading}>
         出价
        </Button>
      </Card>
    </div>
  );
}
