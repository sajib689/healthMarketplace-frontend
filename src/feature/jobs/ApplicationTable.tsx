/* eslint-disable @next/next/no-img-element */

import { JobApplication } from "@/interfaces/global";

export default function ApplicantTable({
  applicants,
}: {
  applicants: JobApplication[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Profile</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id} className="border-t">
              <td className="px-4 py-2 border">
                <img
                  src={
                    applicant.user.profilePicture ||
                    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-2 border">
                {applicant.user.firstName} {applicant.user.lastName}
              </td>
              <td className="px-4 py-2 border">{applicant.user.email}</td>
              <td className="px-4 py-2 border">
                {new Date(applicant.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
