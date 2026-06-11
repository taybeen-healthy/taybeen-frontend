import React from "react";
import { QuickConnectInfo, CustomerServiceInfo } from "@/data/contactData";

interface ContactInfoProps {
  connect: QuickConnectInfo;
  service: CustomerServiceInfo;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ connect, service }) => {
  return (
    <div className="w-full lg:w-[42%] text-left space-y-12">
      <div>
        <h2 className="text-xl sm:text-2xl font-poppins font-bold text-brand-brown mb-6">
          {connect.title}
        </h2>
        <div className="space-y-4 font-poppins text-sm md:text-base text-[#3A2418]">
          <p className="leading-relaxed">
            <span className="font-semibold text-brand-brown">Email:</span>{" "}
            <a href={`mailto:${connect.email}`} className="hover:underline">
              {connect.email}
            </a>
          </p>
          <p className="leading-relaxed">
            <span className="font-semibold text-brand-brown">Call or WhatsApp:</span>{" "}
            {connect.phones.map((phone, i) => (
              <React.Fragment key={i}>
                <span className="font-medium">{phone}</span>
                {i < connect.phones.length - 1 && <span className="font-medium"> or</span>}
                {i < connect.phones.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-poppins font-bold text-brand-brown mb-6">
          {service.title}
        </h2>
        <div className="space-y-3 font-poppins text-sm md:text-base text-[#3A2418] font-medium">
          {service.hours.map((hour, i) => (
            <p key={i} className="leading-relaxed">
              {hour}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
