
// // const [contact, setContact] = useState({
// //     phone: "(319) 555-0115",
// //     email: "deanna.curtis@example.com",
// //     address: "132 Dartmouth Street Boston, Massachusetts 02156 United States",
// // });
// // const [dob, setDob] = useState("10/21/1995");
// // {/* Contact Info Section */ }
// // <section className="border-b pb-6">
// //     <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-lg font-medium">Contact Info</h2>
// //         <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1" onClick={() => toggleEdit("contact")}>
// //             {isEditing.contact ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
// //             <span className="text-sm">{isEditing.contact ? "Save" : "Edit Contact"}</span>
// //         </button>
// //     </div>
// //     {isEditing.contact ? (
// //         <div className="space-y-3">
// //             <input className="w-full p-2 border rounded" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
// //             <input className="w-full p-2 border rounded" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
// //             <input className="w-full p-2 border rounded" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
// //         </div>
// //     ) : (
// //         <div className="space-y-3">
// //             <p className="text-sm"><Phone className="inline w-4 h-4 text-gray-500" /> {contact.phone}</p>
// //             <p className="text-sm"><Mail className="inline w-4 h-4 text-gray-500" /> {contact.email}</p>
// //             <p className="text-sm"><MapPin className="inline w-4 h-4 text-gray-500" /> {contact.address}</p>
// //         </div>
// //     )}
// // </section>

// // {/* Birthday Section */ }
// // <section>
// //     <div className="flex items-center justify-between mb-4">
// //         <h2 className="text-lg font-medium">Birthday</h2>
// //         <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1" onClick={() => toggleEdit("dob")}>
// //             {isEditing.dob ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
// //             <span className="text-sm">{isEditing.dob ? "Save" : "Edit DOB"}</span>
// //         </button>
// //     </div>
// //     {isEditing.dob ? (
// //         <input className="w-full p-2 border rounded" value={dob} onChange={(e) => setDob(e.target.value)} />
// //     ) : (
// //         <p className="text-sm text-gray-700">{dob}</p>
// //     )}
// // </section>

// generator client {
//     provider = "prisma-client-js"
// }
  
//   datasource db {
//     provider = "mongodb"
//     url = env("DATABASE_URL")
// }
  
//   model User {
//     id              String @id @default (auto()) @map("_id") @db.ObjectId
//     firstName       String
//     lastName        String
//     email           String @unique
//     profilePicture  String ?
//         password        String
//     role            String
//     slug            String @unique
//     stripeAccountId String ?

//         isOnline      Boolean @default (false)
//     lastSeen      DateTime ?
//         isDeleted     Boolean @default (false)
//     emailVerified Boolean @default (false)
//     userStatus    UserStatus @default (ACTIVE)
//     otp           Int ?
//         otpExpiresAt  DateTime ?
//             createdAt     DateTime @default (now())
//     updatedAt     DateTime @updatedAt
  
//     about       About ?
//         companyInfo companyInfo ?
//             wallet      Wallet ?
//                 education   Education[]
//     experiences Experience[]
  
//     projects     Project[]
//     jobs         Job[]
//     blogs        Blog[]
//     Bid          Bid[]
//     Rating       Rating[]
//     Review       Review[]
//     Booking      Booking[]
//     Session      Session[]
//     Consultation Consultation[]
//     Withdrawal   Withdrawal[]
  
//     clientAgreements     Agreement[]    @relation(name: "ClientAgreements")
//     freelancerAgreements Agreement[]    @relation(name: "FreelancerAgreements")
//     PayPayer             Payment[]      @relation(name: "PaymentPayer")
//     PayReceiver          Payment[]      @relation(name: "PaymentReceiver")
//     notificationUser     Notification[]
//     notificationSender   Notification[] @relation(name: "NotificationSender")
//     sender               Message[]      @relation(name: "SentMessages")
//     receiver             Message[]      @relation(name: "ReceivedMessages")
// }
  
//   model companyInfo {
//     id             String @id @default (auto()) @map("_id") @db.ObjectId
//     userId         String @unique @db.ObjectId
//     companyName    String ?
//         companyDetails String ?
//             phoneNumber    String ?
//                 address        String ?
//                     establish      String ?
//                         createdAt      DateTime @default (now())
//     updatedAt      DateTime @updatedAt
//     user           User @relation(fields: [userId], references: [id])
// }
  
//   model About {
//     id          String @id @default (auto()) @map("_id") @db.ObjectId
//     userId      String @unique @db.ObjectId
//     phoneNumber String ?
//         address     String ?
//             dateOfBirth String ?
//                 bio         String ?
//                     skills      String[]
//     resume      String ?
//         createdAt   DateTime @default (now())
//     updatedAt   DateTime @updatedAt
//     user        User @relation(fields: [userId], references: [id])
// }
  
//   model Education {
//     id           String @id @default (auto()) @map("_id") @db.ObjectId
//     userId       String @db.ObjectId
//     institute    String
//     degree       String
//     startDate    String
//     endDate      String
//     descriptions String
//     createdAt    DateTime @default (now())
//     updatedAt    DateTime @updatedAt
//     user         User @relation(fields: [userId], references: [id])
// }
  
//   model Experience {
//     id           String @id @default (auto()) @map("_id") @db.ObjectId
//     userId       String @db.ObjectId
//     companyName  String
//     location     String
//     startDate    String
//     endDate      String
//     descriptions String
//     createdAt    DateTime @default (now())
//     updatedAt    DateTime @updatedAt
//     user         User @relation(fields: [userId], references: [id])
// }
  
//   model Rating {
//     id          String @id @default (auto()) @map("_id") @db.ObjectId
//     raterId     String @db.ObjectId // The user who is giving the rating
//     ratedUserId String @db.ObjectId // The user who is being rated
//     rating      Int @default (0)
//     createdAt   DateTime @default (now())
//     updatedAt   DateTime @updatedAt

//     // Relations
//     rater User @relation(fields: [raterId], references: [id])

//     @@unique([raterId, ratedUserId], name: "uniqueRating")
// }
  
//   model Review {
//     id             String @id @default (auto()) @map("_id") @db.ObjectId
//     reviewerId     String @db.ObjectId // The user who is writing the review
//     reviewedUserId String @db.ObjectId // The user who is being reviewed
//     content        String
//     createdAt      DateTime @default (now())
//     updatedAt      DateTime @updatedAt

//     // Relations
//     reviewer User @relation(fields: [reviewerId], references: [id])
// }
  
//   model Project {
//     id              String @id @default (auto()) @map("_id") @db.ObjectId
//     userId          String @db.ObjectId
//     name            String
//     category String
//     skills          String[]
//     budget          String
//     priceType       ProjectPriceType @default (Fixed)
//     deadline        String
//     goal            String
//     scopeOfWork     String
//     experienceLevel String ?
//         status          ProjectStatus @default (OPEN)
//     slug            String @unique
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt
  
//     user      User @relation(fields: [userId], references: [id])
//     bid       Bid[]
//     Agreement Agreement[]
// }
  
//   model Bid {
//     id        String @id @default (auto()) @map("_id") @db.ObjectId
//     userId    String @db.ObjectId
//     projectId String @db.ObjectId
//     amount    Float
//     status    BidStatus @default (PENDING)
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt

//     //relation
  
//     bidUser   User @relation(fields: [userId], references: [id])
//     project   Project @relation(fields: [projectId], references: [id])
//     Agreement Agreement[]
// }
  
//   model Agreement {
//     id            String @id @default (auto()) @map("_id") @db.ObjectId
//     projectId     String @db.ObjectId
//     bidId         String @db.ObjectId
//     clientId      String @db.ObjectId // User who posted the project
//     freelancerId  String @db.ObjectId // User who placed the bid
//     amount        Float
//     status        AgreementStatus @default (PENDING)
//     paymentStatus PaymentStatus @default (PENDING)
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt

//     // Relations
//     project    Project @relation(fields: [projectId], references: [id])
//     bid        Bid @relation(fields: [bidId], references: [id])
//     client     User ? @relation(name: "ClientAgreements", fields: [clientId], references: [id])
//     freelancer User ? @relation(name: "FreelancerAgreements", fields: [freelancerId], references: [id])
//     payments   Payment[]
// }
  
//   model Job {
//     id                   String @id @default (auto()) @map("_id") @db.ObjectId
//     userId               String @db.ObjectId
//     jobPosition          String
//     yourPosition         String
//     location             String
//     jobType              String
//     salaryRange          String
//     experienceLevel      String
//     aboutTheJob          String
//     responsibilities     String
//     reqQualifications    String
//     reqSkills            String[]
//     companyName          String ?
//         aboutTheCompany      String ?
//             companyLogo          String ?
//                 workScheduleBenefits String ?
//                     // slug        String   @unique

//                     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt
//     user      User ? @relation(fields: [userId], references: [id])
//   }
  
//   model Category {
//     id       String @id @default (auto()) @map("_id") @db.ObjectId
//     name     String ?
//         parentId String ? @db.ObjectId

//     // Relations should be simpler for MongoDB
//     parent Category ? @relation(name: "CategoryChildren", fields: [parentId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  
//     children Category[] @relation(name: "CategoryChildren")
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt

//     @@index([parentId])
// }
  
//   model Blog {
//     id           String @id @default (auto()) @map("_id") @db.ObjectId
//     userId       String @db.ObjectId
//     title        String
//     description  String
//     image        String
//     slug         String @unique
//     categoryId   String @db.ObjectId
//     createdAt    DateTime @default (now())
//     updatedAt    DateTime @updatedAt
//     user         User @relation(fields: [userId], references: [id])
//     categoryBlog CategoryBlog ? @relation(fields: [categoryId], references: [id])
//   }
  
//   model CategoryBlog {
//     id        String @id @default (auto()) @map("_id") @db.ObjectId
//     name      String
//     slug      String @unique
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt
//     blog      Blog[]
// }
  
//   model Consultation {
//     id           String @id @default (auto()) @map("_id") @db.ObjectId
//     userId       String @db.ObjectId
//     title        String
//     image        String ?
//         adviceOn     String[]
//     startTime    DateTime
//     endTime      DateTime
//     description  String
//     pricePerHour Float
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt
//     user      User ? @relation(fields: [userId], references: [id])
//     Session   Session[]
//     Booking   Booking[]
// }
  
//   model Session {
//     id            String @id @default (auto()) @map("_id") @db.ObjectId
//     consultantId  String @db.ObjectId
//     userId        String @db.ObjectId
//     zoomMeetingId String ?
//         zoomJoinUrl   String ?
//             startTime     DateTime
//     endTime       DateTime
//     isReminder    Boolean @default (false)
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt
  
//     consultant Consultation ? @relation(fields: [consultantId], references: [id], onDelete: Cascade)
//     user       User @relation(fields: [userId], references: [id])
// }
  
//   model Booking {
//     id             String @id @default (auto()) @map("_id") @db.ObjectId
//     userId         String @db.ObjectId
//     consultationId String @db.ObjectId
//     hour           Float
//     amount         Float
//     payment        PaymentStatus @default (PENDING)
//     createdAt      DateTime @default (now())
//     updatedAt      DateTime @updatedAt
  
//     user         User @relation(fields: [userId], references: [id])
//     consultation Consultation @relation(fields: [consultationId], references: [id])
//     Payment      Payment[]
// }
  
//   model Payment {
//     id              String @id @default (auto()) @map("_id") @db.ObjectId
//     agreementId     String ? @db.ObjectId
//     bookingId       String ? @db.ObjectId
//     payerId         String @db.ObjectId // Client who pays
//     receiverId      String @db.ObjectId // Freelancer who will receive
//     amount          Float
//     fee             Float @default (0) // Platform fee
//     netAmount       Float // amount - fee
//     payment         PaymentStatus @default (PENDING)
//     stripePaymentId String ? @unique // Stripe payment intent ID
//     stripeChargeId  String ? // Stripe charge ID
//         createdAt       DateTime @default (now())
//     updatedAt       DateTime @updatedAt

//     // Relations
//     agreement Agreement ? @relation(fields: [agreementId], references: [id])
//     booking   Booking ? @relation(fields: [bookingId], references: [id])
//     payer     User @relation(name: "PaymentPayer", fields: [payerId], references: [id])
//     receiver  User @relation(name: "PaymentReceiver", fields: [receiverId], references: [id])
// }
  
//   model Withdrawal {
//     id               String @id @default (auto()) @map("_id") @db.ObjectId
//     userId           String @db.ObjectId // Freelancer requesting withdrawal
//     amount           Float
//     status           WithdrawalStatus @default (PENDING)
//     stripeTransferId String ? // Stripe transfer ID
//         adminNote        String ?
//             createdAt        DateTime @default (now())
//     updatedAt        DateTime @updatedAt

//     // Relations
//     user User @relation(fields: [userId], references: [id])
// }
  
//   model Wallet {
//     id     String @id @default (auto()) @map("_id") @db.ObjectId
//     userId String @unique @db.ObjectId
  
//     totalEarnings      Float
//     currentBalance     Float @default (0)
//     inProgressEarnings Float @default (0)
//     pendingWithdrawal  Float @default (0)
//     totalWithdrawn     Float @default (0)
  
//     createdAt DateTime @default (now())
//     updatedAt DateTime @updatedAt

//     //relation
//     user User @relation(fields: [userId], references: [id])
// }

//   // model Chatroom {
//   //   id             String    @id @default(auto()) @map("_id") @db.ObjectId
//   //   participant1Id String    @db.ObjectId
//   //   participant2Id String    @db.ObjectId
//   //   roomId         String    @unique
//   //   messages       Message[]
//   //   createdAt      DateTime  @default(now())

//   //   @@unique([participant1Id, participant2Id])
//   // }
  
//   model Message {
//     id         String @id @default (auto()) @map("_id") @db.ObjectId
//     chatroomId String
//     senderId   String @db.ObjectId
//     receiverId String @db.ObjectId
//     content    String
//     isRead     Boolean @default (false)
//     createdAt  DateTime @default (now())
//     sender     User @relation("SentMessages", fields: [senderId], references: [id])
//     receiver   User @relation("ReceivedMessages", fields: [receiverId], references: [id])
// }
  
//   model Notification {
//     id         String @id @default (auto()) @map("_id") @db.ObjectId
//     userId     String @db.ObjectId // Recipient user ID
//     senderId   String ? @db.ObjectId // Optional: User who triggered the notification
//     type NotificationType
//     entityType EntityType // What type of entity this notification is about
//     entityId   String @db.ObjectId // ID of the related entity
//     metadata   Json ?
//         isRead     Boolean @default (false)
//     createdAt  DateTime @default (now())
//     updatedAt  DateTime @updatedAt

//     // Relations
//     user   User @relation(fields: [userId], references: [id])
//     sender User ? @relation(name: "NotificationSender", fields: [senderId], references: [id])

//     // Indexes
//     @@index([userId, isRead])
//   }

// enum NotificationType {
//     BID_RECEIVED
//     BID_ACCEPTED
//     BID_REJECTED
//     PROJECT_DELIVERED
//     WITHDRAWAL_REQUESTED
//     WITHDRAWAL_APPROVED
//     WITHDRAWAL_REJECTED
//     AGREEMENT_REQUESTED
//     AGREEMENT_ACCEPTED
//     AGREEMENT_REJECTED
//     PAYMENT_RECEIVED
//     PAYMENT_SENT
//     NEW_MESSAGE
//     CONSULTATION_BOOKED
//     SESSION_REMINDER
//     REVIEW_RECEIVED
//     RATING_RECEIVED
// }

// enum EntityType {
//     BID
//     PROJECT
//     AGREEMENT
//     WITHDRAWAL
//     PAYMENT
//     CONSULTATION
//     SESSION
//     REVIEW
//     RATING
// }

// enum UserRole {
//     SUPER_ADMIN
//     ADMIN
//     COMPANY
//     INDIVIDUAL
// }

// enum UserStatus {
//     ACTIVE
//     BLOCKED
// }

// enum PaymentStatus {
//     PENDING
//     COMPLETED
//     CANCELED
//     REFUNDED
// }

// enum WithdrawalStatus {
//     PENDING
//     APPROVED
//     REJECTED
//     PROCESSED
//     CANCELED
// }

// enum ProjectPriceType {
//     Fixed
//     Negotiable
// }

// enum ProjectStatus {
//     OPEN
//     IN_PROGRESS
//     COMPLETED
//     CANCELED
// }

// enum BidStatus {
//     PENDING
//     ACCEPTED
//     REJECTED
// }

// enum AgreementStatus {
//     PENDING
//     ACCEPTED
//     REJECTED
//     COMPLETED
// }