import { useState } from "react";
import { InfoModal } from "./InfoModal";
import CancelOrder from "./CancelOrder";
import { ModalTransition } from "../../../components/modal/ModalTransition";
import ConfirmModal from "./ConfirmModal";
import { ReviewPayload } from "@/redux/api/review/reviewApi";

const OrderModal = ({
    id,
  actions,
  name,
  avatar,
  title,
  postedTime,
  tags,
  budget,
  priceType,
  deadline,
  description,
  scopeOfWork,
  location,
  projectId,
  reviewedUserId,
  handleCreteReview,
}: {
  actions: "cancel" | "confirm" | "infoModal";
  id: string;
  name: string;
  avatar: string;
  title: string;
  postedTime?: string;
  tags: string[];
  budget: string;
  priceType: string;
  deadline: string;
  description: string;
  scopeOfWork: string;
  location: string;
  reviewedUserId: string;
  projectId: string;
  handleCreteReview: (payload: ReviewPayload) => void;
}) => {
  const [modalState, setModalState] = useState("infoModal");

  const samplePost = {
    id,
    name,
    avatar,
    title,
    postedTime,
    tags,
    budget,
    priceType,
    deadline,
    description,
    scopeOfWork,
    location,
  };
  console.log(tags);
  return (
    <div className="overflow-hidden">
      {modalState === "infoModal" && (
        <ModalTransition>
          <InfoModal
            actions={actions}
            samplePost={samplePost}
            setModalState={setModalState}
          />
        </ModalTransition>
      )}
      {modalState === "CancelOrder" && (
        <ModalTransition>
          <CancelOrder samplePost={samplePost} setModalState={setModalState} />
        </ModalTransition>
      )}
      {modalState === "confirmOrder" && (
        <ModalTransition>
          <ConfirmModal
            handleCreteReview={handleCreteReview}
            projectId={projectId}
            reviewedUserId={reviewedUserId}
            samplePost={samplePost}
            setModalState={setModalState}
          />
        </ModalTransition>
      )}
    </div>
  );
};

export default OrderModal;
