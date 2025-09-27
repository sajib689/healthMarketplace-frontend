/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/components/shared/pagination/Pagination";
import { Table, Tabs } from "antd";
import { useState } from "react";

import ErrorState from "@/components/others/ErrorState";
import Loading from "@/components/others/Loading";
import {
  useGetPayerPaymentsQuery,
  useGetReceiverPaymentsQuery,
} from "@/redux/api/payment/paymentApi";

const columns = [
  {
    title: "Date",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "Consultation/Project",
    dataIndex: "tasks",
    key: "tasks",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const PaymentTable = () => {
  // const { user } = useAuthUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"payer" | "receiver">("receiver");

  const {
    data: receiverPayments,
    isLoading: isReceiverLoading,
    isError: isReceiverError,
    error: receiverError,
  } = useGetReceiverPaymentsQuery({ limit: 10, page: currentPage });
  const {
    data: payerPayments,
    isLoading: isPayerLoading,
    isError: isPayerError,
    error: payerError,
  } = useGetPayerPaymentsQuery({ limit: 10, page: currentPage });

  const paymentHistory =
    activeTab === "receiver" ? receiverPayments : payerPayments;
  const isLoading =
    activeTab === "receiver" ? isReceiverLoading : isPayerLoading;
  const isError = activeTab === "receiver" ? isReceiverError : isPayerError;


  // dataSource is not yet declared here, so remove or move this log if needed

  if (isLoading) {
    return (
      <div>
        <Loading
          title="Loading Payment History"
          message={`Fetching ${activeTab} payment data...`}
        />
      </div>
    );
  }

  if (isError || !paymentHistory?.success) {
    console.log(
      "Error details:",
      activeTab === "receiver" ? receiverError : payerError
    );
    return (
      <div>
        <ErrorState />
      </div>
    );
  }

  // Map API data to table format
  const dataSource = Array.isArray(paymentHistory?.data?.payments)
    ? paymentHistory.data.payments.map((payment: any, index: number) => ({
      key: payment.id || index,
      startDate: payment.createdAt
        ? new Date(payment.createdAt).toLocaleDateString()
        : "Unknown",
      clientName:
        activeTab === "receiver"
          ? payment.payer?.firstName && payment.payer?.lastName
            ? `${payment.payer.firstName} ${payment.payer.lastName}`
            : payment.payerId || "Unknown Client"
          : payment.receiver?.firstName && payment.receiver?.lastName
            ? `${payment.receiver.firstName} ${payment.receiver.lastName}`
            : payment.receiverId || "Unknown Freelancer",
      tasks:
        activeTab === "receiver"
          ? payment.booking?.consultation?.title || payment.bookingId || "N/A"
          : payment.agreement?.project?.title || payment.agreementId || "N/A",
      description:
        activeTab === "receiver"
          ? payment.booking?.consultation?.description ||
          `Payment for booking ${payment.bookingId || "N/A"}`
          : payment.agreement?.project?.description ||
          `Payment for project ${payment.agreementId || "N/A"}`,
      amount: payment.netAmount
        ? `$${payment.netAmount.toFixed(2)}`
        : "$0.00",
      status:
        payment.payment === "COMPLETED"
          ? "Completed"
          : payment.payment || "Pending",
    }))
    : [];

  console.log("dataSource:", dataSource);

  const tabItems = [
    {
      key: "receiver",
      label: "Receiver",
      children: (
        <Table
          columns={columns}
          dataSource={activeTab === "receiver" ? dataSource : []}
          pagination={false}
          bordered

          className="border border-blue-500"
          rowClassName="bg-white text-black"
        />
      ),
    },
    {
      key: "payer",
      label: "Payer",
      children: (
        <Table
          columns={columns}
          dataSource={activeTab === "payer" ? dataSource : []}
          pagination={false}
          bordered
          className="border border-blue-500"
          rowClassName="bg-white text-black"
        />
      ),
    },
  ];

  return (
    <div className="md:space-y-7 space-y-4 lg:space-y-10">
      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key as "payer" | "receiver");
          setCurrentPage(1); // Reset page when switching tabs
        }}
        items={tabItems}
      />
      {dataSource.length === 0 ? (
        <div className="p-6 text-gray-600 text-center">
          No {activeTab === "receiver" ? "received" : "paid"} payments
          available.
        </div>
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={paymentHistory?.data?.metaData?.totalPage || 1}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default PaymentTable;
