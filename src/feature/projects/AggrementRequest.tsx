/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Modal } from "@/components/modal/Modal";
import Loading from "@/components/others/Loading";
import {
  useGetAgreementRequestsQuery,
  useUpdateAgreementStatusMutation,
} from "@/redux/api/agreement/agreementApi";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Space, Table, Tag } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { AgreementModal } from "./AggrementModal";
import { Tag as SkillTag } from "./card/Tag";
import { toast } from "sonner";
import { UserPlaceholder } from "@/lib/placeholder";

interface ProjectType {
  id: string;
  name: string;
  skills: string[];
  budget: string;
  priceType: string;
  deadline: string;
  goal: string;
  scopeOfWork: string;
  user: {
    firstName: string;
    lastName: string;
    profilePicture: string | null;
  };
}

interface AgreementType {
  id: string;
  projectId: string;
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  project: ProjectType;
}

const AgreementRequest: React.FC = () => {
  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAgreement, setSelectedAgreement] =
    useState<AgreementType | null>(null);

  const { data: apiData, isLoading, refetch } = useGetAgreementRequestsQuery();
  const [updateAgreementStatus] = useUpdateAgreementStatusMutation();

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase()),
  });

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("YYYY-MM-DD");
  };

  const formatName = (user: { firstName: string; lastName: string }) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const tableData = Array.isArray(apiData?.data)
    ? apiData.data
      .filter((agreement: any) => agreement.project) // Ensure project exists
      .map((agreement: any) => ({
        key: agreement.id,
        date: formatDate(agreement.createdAt),
        name: formatName(agreement.project.user),
        title: agreement.project.name,
        skill: agreement.project.skills,
        amount: agreement.amount,
        requestStatus: agreement.status,
        rawData: agreement, // Store the original data for modal
      }))
    : [];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Project Name",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
      render: (skills: string[]) => (
        <div className="max-w-[200px] flex flex-wrap gap-1">
          {skills?.map((tag, index) => (
            <SkillTag key={index} name={tag} />
          ))}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Request Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      filters: [
        { text: "ACCEPTED", value: "ACCEPTED" },
        { text: "PENDING", value: "PENDING" },
        { text: "REJECTED", value: "REJECTED" },
      ],
      onFilter: (value: any, record: any) => record.requestStatus === value,
      render: (status: string) => {
        const color =
          status === "ACCEPTED"
            ? "green"
            : status === "PENDING"
              ? "orange"
              : "red";
        return <div className="">
          <Tag color={color}>{status}</Tag>
        </div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewClick(record)}>
          View
        </Button>
      ),
    },
  ];

  const handleViewClick = (record: any) => {
    setSelectedAgreement(record.rawData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgreement(null);
  };

  const handleAccept = async (id: string) => {
    try {
      const res = await updateAgreementStatus({
        id,
        status: "ACCEPTED",
      }).unwrap();
      if (res.success) {
        toast.success("Agreement accepted!");
        refetch(); // Refresh the data
        handleCloseModal();
      } else {
        toast.error("Something went wrong!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to accept agreement");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await updateAgreementStatus({
        id,
        status: "REJECTED",
      }).unwrap();
      if (res.success) {
        toast.success("Agreement rejected!");
        refetch(); // Refresh the data
        handleCloseModal();
      } else {
        toast.error("Something went wrong!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to reject agreement");
    }
  };

  if (isLoading) {
    return (
      <Loading
        message="Fetching the latest data for you"
        title="Loading Agreement Data"
      />
    );
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          pageSize: apiData?.meta?.limit,
          total: apiData?.meta?.total,
          current: apiData?.meta?.page,
        }}
        scroll={{ x: "max-content", y: 500 }}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedAgreement && (
          <AgreementModal
            className="md:min-w-[400px] w-[calc(100vw- 30px)]"
            name={`${selectedAgreement.project.user.firstName} ${selectedAgreement.project.user.lastName}`}
            avatar={
              selectedAgreement.project.user.profilePicture || UserPlaceholder.src
            }
            title={selectedAgreement.project.name}
            postedTime={selectedAgreement.createdAt}
            tags={selectedAgreement.project.skills}
            budget={selectedAgreement.project.budget}
            priceType={selectedAgreement.project.priceType}
            deadline={selectedAgreement.project.deadline}
            description={selectedAgreement.project.goal}
            scopeWork={selectedAgreement.project.scopeOfWork}
            // onClose={handleCloseModal}
            onClose={() => handleReject(selectedAgreement.id)}
            projectId={selectedAgreement.projectId}
            handleToggleFavorite={() => { }}
            status={selectedAgreement.status}
            handleAccept={() => handleAccept(selectedAgreement.id)}
          />
        )}
      </Modal>
    </div>
  );
};

export default AgreementRequest;