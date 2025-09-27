import {
  Notification,
  NotificationMetadata,
  NotificationType,
} from "@/interfaces/global";
import { UserPlaceholder } from "@/lib/placeholder";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NotificationIconProps {
  notifications: Notification[];
}

const getNotificationMessage = (
  type: NotificationType,
  metadata: NotificationMetadata
): string => {
  switch (type) {
    case "BID_RECEIVED":
      return `New bid received for ${metadata.projectName}`;
    case "BID_ACCEPTED":
      return `Your bid was accepted for ${metadata.projectName}`;
    case "BID_REJECTED":
      return `Your bid was rejected for ${metadata.projectName}`;
    case "PROJECT_DELIVERED":
      return `Project delivered: ${metadata.projectName}`;
    case "WITHDRAWAL_REQUESTED":
      return `Withdrawal request of $${metadata.amount} submitted`;
    case "WITHDRAWAL_APPROVED":
      return `Withdrawal of $${metadata.amount} approved`;
    case "WITHDRAWAL_REJECTED":
      return `Withdrawal of $${metadata.amount} rejected`;
    case "AGREEMENT_REQUESTED":
      return `Agreement requested for ${metadata.projectName}`;
    case "AGREEMENT_ACCEPTED":
      return `Agreement accepted for ${metadata.projectName}`;
    case "AGREEMENT_REJECTED":
      return `Agreement rejected for ${metadata.projectName}`;
    case "PAYMENT_RECEIVED":
      return `Payment of $${metadata.amount} received`;
    case "PAYMENT_SENT":
      return `Payment of $${metadata.amount} sent`;
    // case "NEW_MESSAGE":
    //   return `New message from ${metadata.senderName}`;
    // case "CONSULTATION_BOOKED":
    //   return `Consultation booked with ${metadata.consultantName}`;
    case "SESSION_REMINDER":
      return `Reminder: Session starting soon`;
    case "REVIEW_RECEIVED":
      return `New review received for ${metadata.projectName}`;
    case "RATING_RECEIVED":
      return `New rating received for ${metadata.projectName}`;
    default:
      return "New notification";
  }
};

const getNotificationSubtext = (
  type: NotificationType,
  metadata: NotificationMetadata
): string => {
  switch (type) {
    case "BID_RECEIVED":
    case "BID_ACCEPTED":
    case "BID_REJECTED":
      return `Bid amount: $${metadata.bidAmount}`;
    case "WITHDRAWAL_REQUESTED":
    case "WITHDRAWAL_APPROVED":
    case "WITHDRAWAL_REJECTED":
    case "PAYMENT_RECEIVED":
    case "PAYMENT_SENT":
      return metadata.projectName ? `For: ${metadata.projectName}` : "";
    case "AGREEMENT_REQUESTED":
    case "AGREEMENT_ACCEPTED":
    case "AGREEMENT_REJECTED":
      return metadata.agreementId
        ? `Agreement ID: ${metadata.agreementId.slice(0, 8)}...`
        : "";
    case "CONSULTATION_BOOKED":
    case "SESSION_REMINDER":
      return metadata.startTime
        ? `Scheduled: ${new Date(metadata.startTime).toLocaleString()}`
        : "";
    case "REVIEW_RECEIVED":
    case "RATING_RECEIVED":
      return metadata.rating ? `Rating: ${metadata.rating}/5` : "";
    default:
      return "";
  }
};

const getNotificationRedirectPath = (notification: Notification): string => {
  const { type, metadata } = notification;

  switch (type) {
    case "BID_RECEIVED":
    case "BID_ACCEPTED":
    case "BID_REJECTED":
    case "PROJECT_DELIVERED":
    case "REVIEW_RECEIVED":
    case "RATING_RECEIVED":
      return `/my-project/${metadata.projectSlug || metadata.projectId}`;
    case "WITHDRAWAL_REQUESTED":
    case "WITHDRAWAL_APPROVED":
    case "WITHDRAWAL_REJECTED":
    case "PAYMENT_RECEIVED":
    case "PAYMENT_SENT":
      return "/payment";
    case "AGREEMENT_REQUESTED":
      return `/my-project#agreement-request`;
    case "AGREEMENT_ACCEPTED":
      return `/my-project#pending-agreement`;
    case "AGREEMENT_REJECTED":
      return `/my-project#agreement-request`;
    // case "NEW_MESSAGE":
    //   return `/messages/${metadata.conversationId}`;
    case "CONSULTATION_BOOKED":
    case "SESSION_REMINDER":
      return `#`;
    default:
      return "#";
  }
};
const NotificationIcon = ({ notifications }: NotificationIconProps) => {
  const router = useRouter();

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read logic would go here if needed

    // Get the redirect path based on notification type
    const redirectPath = getNotificationRedirectPath(notification);

    // Close the notifications dropdown if provided

    // Set the notification state if needed

    // Redirect to the appropriate page
    router.push(redirectPath);
  };

  return (
    <div className="px-4 pt-4 pb-2 w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-4">
        Notifications
      </h3>

      {notifications?.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No new notifications
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {notifications?.slice(0, 5).map((notification) => (
            <li
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`py-3 px-2 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? "bg-blue-50" : ""
                }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Image
                    width={40}
                    height={40}
                    src={
                      notification.sender?.profilePicture || UserPlaceholder.src
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getNotificationMessage(
                      notification.type,
                      notification.metadata
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getNotificationSubtext(
                      notification.type,
                      notification.metadata
                    )}
                  </p>
                  <time className="text-xs text-gray-400 block mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </time>
                </div>
                <div className="flex-shrink-0">
                  <CheckCheck
                    className={`w-4 h-4 ${notification.isRead ? "text-gray-400" : "text-green-500"
                      }`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* <Link href="/notifications" className="text-primary text-sm mt-1 hover:underline">See all notifications</Link> */}
    </div>
  );
};

export default NotificationIcon;
