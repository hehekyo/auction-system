'use client'
import { useEffect, useState } from 'react';
import { Table,Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface Auction {
    id: number;
    sellerAddress: string;
    minBid: number;
    highestBid: number | null;
    highestBidder: string | null;
    endTime: string;
    ended: boolean;
  }

  const columns: ColumnsType<Auction> = [
    {
      title: 'Auction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Seller Address',
      dataIndex: 'sellerAddress',
      key: 'sellerAddress',
    },
    {
      title: 'Minimum Bid',
      dataIndex: 'minBid',
      key: 'minBid',
    },
    {
      title: 'Highest Bid',
      dataIndex: 'highestBid',
      key: 'highestBid',
      render: (text: number | null) => text ?? 'No bids yet',
    },
    {
      title: 'Highest Bidder',
      dataIndex: 'highestBidder',
      key: 'highestBidder',
      render: (text: string | null) => text ?? 'No bidder yet',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Ended',
      dataIndex: 'ended',
      key: 'ended',
      render: (text: boolean) => (text ? 'Yes' : 'No'),
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <a href={`/auctions/${record.id}`}>Detail</a>,
    },
  ];
export default function Home() {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    async function fetchAuctions() {
      const res = await fetch('/api/auctions');
      const result = await res.json();

      if (result.auctions) { // 确保存在拍卖数据
        console.log("======data:", result.auctions); // 打印拍卖数据
        setAuctions(result.auctions); // 设置拍卖数据到状态
      }
    }
    fetchAuctions();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>拍卖列表</h1>
      <div className='p-4'>
        <Button href="/auctions/create" type="primary">创建拍卖</Button>
      </div>
    <Table columns={columns} dataSource={auctions} rowKey="id" />    
    </div>
    
  );
}
