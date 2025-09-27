import consultationImage from "@/assets/consultation/consultation.png";
import Image from "next/image";
import { Tag } from "./Tag";
import Link from "next/link";
import { Pricing } from "@/interfaces/global";

const ProfileConsultation = ({
  title,
  fee,
  services,
  id,
}: {
  title: string;
  fee: Pricing[];
  services: string[];
  id: string;
}) => {
  return (
    <div>
      <div className="border-t lg:my-8 my-6 2xl:my-10">
        <ConsultationBook title={title} fee={fee} services={services} id={id} />
      </div>
    </div>
  );
};

export default ProfileConsultation;

function ConsultationBook({
  title,
  fee,
  services,
  id,
}: {
  title: string;
  fee: Pricing[];
  services: string[];
  id?: string;
}) {
  return (
    <div className="border-b">
      <div className="bg-white rounded-xl shadow-sm py-6">
        <div className="relative flex flex-row lg:items-center gap-4 p-3 rounded-lg shadow-lg w-full">
          <Image
            width={150}
            height={100}
            src={consultationImage}
            alt={`image of ${title}`}
            className="object-contain h-28 w-20 2xl:w-28"
          />

          <div className="flex flex-col xl:space-y-4 space-y-3   w-full">
            <div className="flex flex-col sm:flex-row items-start w-full justify-between">
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              <Link
                href={`/book-consultation/${id}`}
                className="px-2 text-nowrap text-primary py-2 bg-primary/20 border-primary border rounded-full  text-xs  gap-2"
              >
                Book a consultation
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 512 117"
                >
                  <path
                    fill="#0b5cff"
                    d="M107.472 114.706H16.348c-5.968 0-11.791-3.203-14.557-8.589C-1.41 99.858-.247 92.434 4.702 87.63L68.17 24.164H22.607C10.088 24.164.044 13.974.044 1.6h83.992c5.968 0 11.79 3.203 14.556 8.589c3.203 6.259 2.038 13.683-2.911 18.486L32.214 92.143h52.55c12.518 0 22.708 10.19 22.708 22.563M468.183 0c-13.1 0-24.746 5.677-32.898 14.702C427.134 5.677 415.488 0 402.388 0c-24.164 0-43.961 20.67-43.961 44.834v69.872c12.518 0 22.562-10.19 22.562-22.563V44.689c0-11.646 9.025-21.544 20.67-21.98c12.228-.437 22.272 9.315 22.272 21.397v48.037c0 12.519 10.19 22.563 22.563 22.563V44.543c0-11.645 9.025-21.544 20.67-21.98c12.228-.437 22.272 9.316 22.272 21.398v48.036c0 12.52 10.19 22.563 22.563 22.563V44.69C512.144 20.67 492.347 0 468.183 0M221.595 58.226c0 32.17-26.056 58.226-58.226 58.226s-58.226-26.056-58.226-58.226S131.199 0 163.369 0s58.226 26.056 58.226 58.226m-22.563 0c0-19.651-16.012-35.663-35.663-35.663s-35.664 16.012-35.664 35.663c0 19.652 16.013 35.664 35.664 35.664s35.663-16.012 35.663-35.664m148.04 0c0 32.17-26.056 58.226-58.226 58.226S230.62 90.396 230.62 58.226S256.676 0 288.846 0s58.227 26.056 58.227 58.226m-22.562 0c0-19.651-16.012-35.663-35.664-35.663c-19.65 0-35.663 16.012-35.663 35.663c0 19.652 16.012 35.664 35.663 35.664c19.652 0 35.664-16.012 35.664-35.664"
                  />
                </svg>
                {fee?.map((data, idx) => (
                  <span key={idx} className="text-sm">
                    ${data.price} per {data.duration} min Zoom meeting
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {services.map((service, index) => (
                <Tag key={index} name={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
