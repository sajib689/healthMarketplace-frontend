/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import { Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { toast } from "sonner";
import { useGetAllCancelledDeliveryQuery } from "@/redux/api/delivey/deliveryApi";


interface CancelRequest {
    key: string;
    date: string;
    name: string;
    title: string;
    reason: string;
    amount: number;
    status: string;
    action: string;
}

const CancelRequestTable: React.FC = () => {
    const { data: deliveryData, isLoading } = useGetAllCancelledDeliveryQuery({});
    // console.log(deliveryData, 'deliveryData');

    const deliveries = deliveryData?.data || [];

    const tableData: CancelRequest[] = deliveries.map((item: any) => ({
        key: item.id,
        date: moment(item.createdAt).format("DD-MM-YYYY"),
        name: `${item.agreement?.client?.firstName || ''} ${item.agreement?.client?.lastName || ''}`,
        title: item.agreement?.project?.name || '',
        reason: item.cancelReason,
        amount: item.agreement?.amount || 0,
        status: item.status,
        action: item?.agreement?.clientId,
    }));

    const columns: ColumnsType<CancelRequest> = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Cancel Reason",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
            render: (amount) => <span>${amount}</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => <span>{status === "CANCEL_APPROVED" ? "Cancelled" : "Pending"}</span>,
        },

        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (clientId: string) => <a href={`/messaging?user=${clientId}`}>Message Now</a>,
          },
    ];

    return (
        <div>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={tableData}
                pagination={{ pageSize: 10 }}
                bordered
                rowKey="key"
            />
        </div>
    );
};

export default CancelRequestTable;
