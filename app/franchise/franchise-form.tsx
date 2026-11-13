
// "use client";

// import React, { useState } from "react";
// import Select from "react-select";
// import { BadgeCheck } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { submitFranchiseEnquiry } from "../lib/api";

// type StateOption = {
//   value: string;
//   label: string;
// };

// type FormData = {
//   fullName: string;
//   email: string;
//   phone: string;
//   city: string;
//   state: string;
//   whenToStart: string;
//   haveShop: string;
// };

// const indianStateOptions: StateOption[] = [
//   { value: "Andhra Pradesh", label: "Andhra Pradesh" },
//   { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
//   { value: "Assam", label: "Assam" },
//   { value: "Bihar", label: "Bihar" },
//   { value: "Chhattisgarh", label: "Chhattisgarh" },
//   { value: "Goa", label: "Goa" },
//   { value: "Gujarat", label: "Gujarat" },
//   { value: "Haryana", label: "Haryana" },
//   { value: "Himachal Pradesh", label: "Himachal Pradesh" },
//   { value: "Jharkhand", label: "Jharkhand" },
//   { value: "Karnataka", label: "Karnataka" },
//   { value: "Kerala", label: "Kerala" },
//   { value: "Madhya Pradesh", label: "Madhya Pradesh" },
//   { value: "Maharashtra", label: "Maharashtra" },
//   { value: "Manipur", label: "Manipur" },
//   { value: "Meghalaya", label: "Meghalaya" },
//   { value: "Mizoram", label: "Mizoram" },
//   { value: "Nagaland", label: "Nagaland" },
//   { value: "Odisha", label: "Odisha" },
//   { value: "Punjab", label: "Punjab" },
//   { value: "Rajasthan", label: "Rajasthan" },
//   { value: "Sikkim", label: "Sikkim" },
//   { value: "Tamil Nadu", label: "Tamil Nadu" },
//   { value: "Telangana", label: "Telangana" },
//   { value: "Tripura", label: "Tripura" },
//   { value: "Uttar Pradesh", label: "Uttar Pradesh" },
//   { value: "Uttarakhand", label: "Uttarakhand" },
//   { value: "West Bengal", label: "West Bengal" },
//   { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
//   { value: "Chandigarh", label: "Chandigarh" },
//   { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
//   { value: "Delhi", label: "Delhi" },
//   { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
//   { value: "Ladakh", label: "Ladakh" },
//   { value: "Lakshadweep", label: "Lakshadweep" },
//   { value: "Puducherry", label: "Puducherry" },
// ];

// const initialFormData: FormData = {
//   fullName: "",
//   email: "",
//   phone: "",
//   city: "",
//   state: "",
//   whenToStart: "",
//   haveShop: "",
// };

// const shopOptions = [
//   { value: "Yes, Owned Commercial Space", label: "Yes, Owned Commercial Space" },
//   { value: "Yes, Rented Commercial Space", label: "Yes, Rented Commercial Space" },
//   { value: "Looking for Location", label: "Looking for Location" },
//   { value: "No Space Yet", label: "No Space Yet" },
// ];

// const getFormattedStartMonth = (value: string) => {
//   if (!value) return "";

//   const [year, month] = value.split("-").map(Number);

//   return new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
//     month: "long",
//     year: "numeric",
//   });
// };

// const buildWhatsAppMessage = (formData: FormData) => {
//   return [
//     "Hi TeaMax, I am interested in a franchise.",
//     "",
//     `Full Name: ${formData.fullName.trim()}`,
//     `Email: ${formData.email.trim()}`,
//     `WhatsApp Number: +91${formData.phone}`,
//     `City: ${formData.city.trim()}`,
//     `State: ${formData.state}`,
//     `When to Start: ${getFormattedStartMonth(formData.whenToStart)}`,
//     `Shop Availability: ${formData.haveShop}`,
//   ].join("\n");
// };


// const getWhatsAppUrl = (formData: FormData) => {
//   const message = buildWhatsAppMessage(formData);

//   return `https://go.teamaxcafe.in/whatsapp?text=${encodeURIComponent(
//     message
//   )}`;
// };


// export default function FranchiseFormSection() {
//   const [formData, setFormData] = useState<FormData>({
//     ...initialFormData,
//   });

//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name === "phone") {
//       setFormData((prev) => ({
//         ...prev,
//         phone: value.replace(/\D/g, "").slice(0, 10),
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }

//     setErrorMessage("");
//   };


//   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (!formData.fullName.trim()) {
//       setErrorMessage("Please enter your full name.");
//       return;
//     }

//     if (
//       !formData.email.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
//     ) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     if (!/^[6-9]\d{9}$/.test(formData.phone)) {
//       setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
//       return;
//     }

//     if (!formData.city.trim()) {
//       setErrorMessage("Please enter your city.");
//       return;
//     }

//     if (
//       !indianStateOptions.some(
//         (option) => option.value === formData.state
//       )
//     ) {
//       setErrorMessage("Please select a valid Indian state or union territory.");
//       return;
//     }

//     if (!formData.whenToStart) {
//       setErrorMessage("Please select when you want to start.");
//       return;
//     }

//     if (!formData.haveShop) {
//       setErrorMessage("Please select your shop availability.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // 1. Submit to Railway backend API
//       try {
//         await submitFranchiseEnquiry({
//           fullName: formData.fullName.trim(),
//           phone: formData.phone,
//           email: formData.email.trim(),
//           city: formData.city.trim(),
//           state: formData.state,
//           budget: "₹3.69 Lakh",
//           space: formData.haveShop,
//           notes: `When to start: ${getFormattedStartMonth(formData.whenToStart)}`,
//         });
//       } catch (backendErr) {
//         console.warn("Backend franchise enquiry warning:", backendErr);
//       }

//       // 2. Submit to external Webhook URL if configured
//       const webhookUrl = process.env.NEXT_PUBLIC_FRANCHISE_WEBHOOK_URL;
//       if (webhookUrl) {
//         try {
//           await fetch(webhookUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               fullName: formData.fullName.trim(),
//               email: formData.email.trim(),
//               phone: formData.phone,
//               city: formData.city.trim(),
//               state: formData.state,
//               whenToStart: getFormattedStartMonth(formData.whenToStart),
//               haveShop: formData.haveShop,
//               source: "Franchise Page Form",
//               page: "/cafe-franchise-india",
//               submittedAt: new Date().toISOString(),
//             }),
//           });
//         } catch (webhookErr) {
//           console.warn("External webhook warning:", webhookErr);
//         }
//       }

//       const whatsappUrl = getWhatsAppUrl(formData);

//       // Open WhatsApp only once
//       const whatsappWindow = window.open(
//         whatsappUrl,
//         "_blank"
//       );

//       if (!whatsappWindow) {
//         setErrorMessage(
//           "WhatsApp could not be opened. Please allow popups and try again."
//         );
//         return;
//       }

//       setErrorMessage("");
//       setFormSubmitted(true);
//     } catch (error) {
//       console.error("Franchise enquiry error:", error);
//       setErrorMessage("Unable to open WhatsApp. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const stateSelectStyles = {
//     container: (base: any) => ({
//       ...base,
//       width: "100%",
//       minWidth: 0,
//     }),

//     control: (base: any, state: any) => ({
//       ...base,
//       minHeight: "58px",
//       height: "58px",
//       borderRadius: "8px",
//       borderColor: state.isFocused ? "#ffd028" : "#d1d5db",
//       boxShadow: "none",
//       cursor: "text",
//       "&:hover": {
//         borderColor: "#ffd028",
//       },
//     }),

//     valueContainer: (base: any) => ({
//       ...base,
//       padding: "0 14px",
//     }),

//     input: (base: any) => ({
//       ...base,
//       color: "#111827",
//       margin: 0,
//       padding: 0,
//     }),

//     placeholder: (base: any) => ({
//       ...base,
//       color: "#6b7280",
//       fontSize: "14px",
//     }),

//     singleValue: (base: any) => ({
//       ...base,
//       color: "#111827",
//       fontSize: "14px",
//     }),

//     indicatorsContainer: (base: any) => ({
//       ...base,
//       paddingRight: "6px",
//     }),

//     dropdownIndicator: (base: any) => ({
//       ...base,
//       color: "#6b7280",
//       "&:hover": {
//         color: "#111827",
//       },
//     }),

//     clearIndicator: (base: any) => ({
//       ...base,
//       padding: "6px",
//     }),

//     menu: (base: any) => ({
//       ...base,
//       zIndex: 20,
//       borderRadius: "8px",
//       overflow: "hidden",
//     }),

//     menuList: (base: any) => ({
//       ...base,
//       maxHeight: "220px",
//     }),

//     option: (base: any, state: any) => ({
//       ...base,
//       fontSize: "14px",
//       cursor: "pointer",
//       color: "#111827",
//       backgroundColor: state.isSelected
//         ? "#fff0a6"
//         : state.isFocused
//           ? "#fff8df"
//           : "#ffffff",
//       "&:active": {
//         backgroundColor: "#fff0a6",
//       },
//     }),
//   };

//   return (
//     <section id="franchise-form" className="tm-fc-form-section">
//       <div className="tm-fc-container">
//         <div className="tm-fc-form-card">
//           {/* Left Photo - Existing UI unchanged */}
//           <div className="tm-fc-form-media">
//             <img
//               src="/images/franchise-storefront.jpg"
//               alt="TeaMax Store Interior and Counter"
//               width="600"
//               height="450"
//             />
//           </div>

//           {/* Right Form - Existing UI unchanged */}
//           <div className="tm-fc-form-body">
//             <h2>Ready to Start Your Own TeaMax?</h2>

//             <p className="sub">
//               Get the complete franchise proposal, investment breakup and
//               setup process.
//             </p>

//             {formSubmitted ? (
//               <div
//                 style={{
//                   background: "rgba(255, 208, 40, 0.15)",
//                   border: "1px solid #ffd028",
//                   padding: "24px",
//                   borderRadius: "12px",
//                   textAlign: "center",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "inline-flex",
//                     marginBottom: "8px",
//                     color: "#ffd028",
//                   }}
//                 >
//                   <BadgeCheck size={36} />
//                 </div>

//                 <h3
//                   style={{
//                     color: "#ffd028",
//                     fontSize: "20px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   Thank You!
//                 </h3>

//                 <p
//                   style={{
//                     color: "#ffffff",
//                     fontSize: "14px",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   Your franchise enquiry is ready. Continue the conversation
//                   with our team on WhatsApp.
//                 </p>

//                 <button
//                   type="button"
//                   className="tm-fc-btn-submit"
//                   onClick={() => {
//                     window.open(
//                       getWhatsAppUrl(formData),
//                       "_blank",
//                       "noopener,noreferrer"
//                     );
//                   }}
//                 >
//                   <FaWhatsapp size={20} />
//                   <span>Continue on WhatsApp</span>
//                 </button>

//                 <button
//                   type="button"
//                   className="tm-fc-btn-submit"
//                   style={{
//                     marginTop: "12px",
//                     width: "100%",
//                     background: "rgba(255, 255, 255, 0.12)",
//                     color: "#ffffff",
//                     border: "1px solid rgba(255, 255, 255, 0.2)",
//                   }}
//                   onClick={() => {
//                     setFormData({ ...initialFormData });
//                     setFormSubmitted(false);
//                     setErrorMessage("");
//                   }}
//                 >
//                   Submit Another Enquiry
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleFormSubmit}>
//                 {errorMessage && (
//                   <div
//                     role="alert"
//                     style={{
//                       color: "#991b1b",
//                       background: "#fff1f2",
//                       border: "1px solid #fecaca",
//                       padding: "12px",
//                       borderRadius: "8px",
//                       marginBottom: "16px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     {errorMessage}
//                   </div>
//                 )}

//                 <div className="tm-fc-form-fields-grid">
//                   {/* Full Name */}
//                   <div className="tm-fc-input-group">
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       placeholder="Full Name"
//                       className="tm-fc-input"
//                       autoComplete="name"
//                       required
//                     />
//                   </div>

//                   {/* Email Address */}
//                   <div className="tm-fc-input-group">
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="Email Address"
//                       className="tm-fc-input"
//                       autoComplete="email"
//                       required
//                     />
//                   </div>

//                   {/* WhatsApp Number */}
//                   <div className="tm-fc-input-group">
//                     <div className="tm-fc-phone-wrap">
//                       <div className="tm-fc-phone-flag">
//                         <svg
//                           width="20"
//                           height="14"
//                           viewBox="0 0 30 20"
//                           style={{
//                             borderRadius: "2px",
//                             overflow: "hidden",
//                             flexShrink: 0,
//                           }}
//                           aria-label="Indian flag"
//                         >
//                           <rect
//                             width="30"
//                             height="6.66"
//                             fill="#FF9933"
//                           />
//                           <rect
//                             y="6.66"
//                             width="30"
//                             height="6.66"
//                             fill="#FFFFFF"
//                           />
//                           <rect
//                             y="13.33"
//                             width="30"
//                             height="6.67"
//                             fill="#138808"
//                           />
//                           <circle
//                             cx="15"
//                             cy="10"
//                             r="2.5"
//                             fill="#000080"
//                           />
//                         </svg>
//                         <span>+91</span>
//                       </div>

//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         placeholder="WhatsApp Number"
//                         className="tm-fc-phone-input"
//                         inputMode="numeric"
//                         autoComplete="tel-national"
//                         maxLength={10}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* City */}
//                   <div className="tm-fc-input-group">
//                     <input
//                       type="text"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       placeholder="City"
//                       className="tm-fc-input"
//                       autoComplete="address-level2"
//                       required
//                     />
//                   </div>

//                   {/* Searchable State Dropdown */}
//                   <div className="tm-fc-input-group">
//                     <Select
//                       inputId="tm-fc-franchise-state"
//                       name="state"
//                       options={indianStateOptions}
//                       value={
//                         indianStateOptions.find(
//                           (option) => option.value === formData.state
//                         ) || null
//                       }
//                       onChange={(selectedOption) => {
//                         setFormData((prev) => ({
//                           ...prev,
//                           state: selectedOption?.value || "",
//                         }));
//                         setErrorMessage("");
//                       }}
//                       placeholder="Select State"
//                       isSearchable
//                       isClearable
//                       className="tm-fc-state-select"
//                       classNamePrefix="tm-fc-state"
//                       noOptionsMessage={() => "No state found"}
//                       menuPlacement="auto"
//                       menuPosition="fixed"
//                       menuShouldScrollIntoView={false}
//                       maxMenuHeight={220}
//                       components={{
//                         IndicatorSeparator: () => null,
//                       }}
//                       styles={stateSelectStyles}
//                     />
//                   </div>

//                   {/* When to Start */}
//                   <div className="tm-fc-input-group">
//                     <select
//                       name="whenToStart"
//                       value={formData.whenToStart}
//                       onChange={handleInputChange}
//                       className="tm-fc-select"
//                       aria-label="When to Start"
//                       required
//                     >
//                       <option value="">When to Start?</option>
//                       <option value="Immediately">Immediately</option>
//                       <option value="Within 90 Days">Within 90 Days</option>
//                       <option value="Within 180 Days">Within 180 Days</option>
//                       <option value="Not Decided Yet">Not Decided Yet</option>
//                     </select>
//                   </div>

//                   {/* Shop Availability */}
//                   <div className="tm-fc-input-group">
//                     <select
//                       name="haveShop"
//                       value={formData.haveShop}
//                       onChange={handleInputChange}
//                       className="tm-fc-select"
//                       required
//                     >
//                       <option value="">Do you have a space?</option>
//                       {shopOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Submit Button - Existing UI unchanged */}
//                 <button
//                   type="submit"
//                   className="tm-fc-btn-submit"
//                   disabled={isSubmitting}
//                   style={{
//                     width: "100%",
//                     opacity: isSubmitting ? 0.7 : 1,
//                     cursor: isSubmitting ? "not-allowed" : "pointer",
//                   }}
//                 >
//                   <span>
//                     {isSubmitting
//                       ? "Preparing Enquiry..."
//                       : "Get Franchise Details on WhatsApp"}
//                   </span>
//                   <FaWhatsapp size={20} />
//                 </button>

//                 <p className="tm-fc-form-disclaimer">
//                   Submitting an enquiry does not guarantee franchise or
//                   location approval.                </p>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }














"use client";

import React, { useState } from "react";
import Select from "react-select";
import { BadgeCheck } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type StateOption = {
  value: string;
  label: string;
};

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  whenToStart: string;
  haveShop: string;
};

const indianStateOptions: StateOption[] = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "Delhi", label: "Delhi" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Puducherry", label: "Puducherry" },
];

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  whenToStart: "",
  haveShop: "",
};

const shopOptions = [
  { value: "Yes, Owned Commercial Space", label: "Yes, Owned Commercial Space" },
  { value: "Yes, Rented Commercial Space", label: "Yes, Rented Commercial Space" },
  { value: "Looking for Location", label: "Looking for Location" },
  { value: "No Space Yet", label: "No Space Yet" },
];

const getFormattedStartMonth = (value: string) => value;

const buildWhatsAppMessage = (formData: FormData) => {
  return [
    "Hi TeaMax, I am interested in a franchise.",
    "",
    `Full Name: ${formData.fullName.trim()}`,
    `Email: ${formData.email.trim()}`,
    `WhatsApp Number: +91${formData.phone}`,
    `City: ${formData.city.trim()}`,
    `State: ${formData.state}`,
    `When to Start: ${formData.whenToStart}`,
    `Shop Availability: ${formData.haveShop}`,
  ].join("\n");
};


const getWhatsAppUrl = (formData: FormData) => {
  const message = buildWhatsAppMessage(formData);

  return `https://go.teamaxcafe.in/whatsapp?text=${encodeURIComponent(
    message
  )}`;
};


export default function FranchiseFormSection() {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrorMessage("");
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (
      !formData.email.trim() ||
      !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email.trim())
    ) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\\d{9}$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!formData.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    if (
      !indianStateOptions.some(
        (option) => option.value === formData.state
      )
    ) {
      setErrorMessage("Please select a valid Indian state or union territory.");
      return;
    }

    if (!formData.whenToStart) {
      setErrorMessage("Please select when you want to start.");
      return;
    }

    if (!formData.haveShop) {
      setErrorMessage("Please select your shop availability.");
      return;
    }

    setIsSubmitting(true);

    // Open the tab during the user's click so the browser does not block the
    // WhatsApp window after the asynchronous webhook request.
    const whatsappWindow = window.open("about:blank", "_blank");

    if (!whatsappWindow) {
      setIsSubmitting(false);
      setErrorMessage(
        "Please allow popups for this website, then submit the form again."
      );
      return;
    }

    try {
      const webhookUrl =
        "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjYwNTY5MDYzNTA0MzE1MjZhNTUzNSI_3D_pc/IjU3NjcwNTZiMDYzNTA0MzY1MjZiNTUzYzUxMzMi_pc";

      // URLSearchParams sends a browser-safe form-urlencoded POST request.
      // This avoids a JSON preflight request in the browser. With no-cors,
      // the browser does not expose Pabbly's response/status to JavaScript.
      const webhookPayload = new URLSearchParams({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        countryCode: "+91",
        city: formData.city.trim(),
        state: formData.state,
        whenToStart: formData.whenToStart,
        haveShop: formData.haveShop,
        source: "Franchise Page Form",
        page: "/cafe-franchise-india",
        submittedAt: new Date().toISOString(),
      });

      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: webhookPayload,
      });

      // Continue to WhatsApp after the browser has sent the webhook request.
      whatsappWindow.location.href = getWhatsAppUrl(formData);
      setFormSubmitted(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Pabbly webhook submission error:", error);
      whatsappWindow.close();
      setErrorMessage(
        "Unable to submit your enquiry. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const stateSelectStyles = {
    container: (base: any) => ({
      ...base,
      width: "100%",
      minWidth: 0,
    }),

    control: (base: any, state: any) => ({
      ...base,
      minHeight: "58px",
      height: "58px",
      borderRadius: "8px",
      borderColor: state.isFocused ? "#ffd028" : "#d1d5db",
      boxShadow: "none",
      cursor: "text",
      "&:hover": {
        borderColor: "#ffd028",
      },
    }),

    valueContainer: (base: any) => ({
      ...base,
      padding: "0 14px",
    }),

    input: (base: any) => ({
      ...base,
      color: "#111827",
      margin: 0,
      padding: 0,
    }),

    placeholder: (base: any) => ({
      ...base,
      color: "#6b7280",
      fontSize: "14px",
    }),

    singleValue: (base: any) => ({
      ...base,
      color: "#111827",
      fontSize: "14px",
    }),

    indicatorsContainer: (base: any) => ({
      ...base,
      paddingRight: "6px",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      color: "#6b7280",
      "&:hover": {
        color: "#111827",
      },
    }),

    clearIndicator: (base: any) => ({
      ...base,
      padding: "6px",
    }),

    menu: (base: any) => ({
      ...base,
      zIndex: 20,
      borderRadius: "8px",
      overflow: "hidden",
    }),

    menuList: (base: any) => ({
      ...base,
      maxHeight: "220px",
    }),

    option: (base: any, state: any) => ({
      ...base,
      fontSize: "14px",
      cursor: "pointer",
      color: "#111827",
      backgroundColor: state.isSelected
        ? "#fff0a6"
        : state.isFocused
          ? "#fff8df"
          : "#ffffff",
      "&:active": {
        backgroundColor: "#fff0a6",
      },
    }),
  };

  return (
    <section id="franchise-form" className="tm-fc-form-section">
      <div className="tm-fc-container">
        <div className="tm-fc-form-card">
          {/* Left Photo - Existing UI unchanged */}
          <div className="tm-fc-form-media">
            <img
              src="/images/franchise-storefront.jpg"
              alt="TeaMax Store Interior and Counter"
              width="600"
              height="450"
            />
          </div>

          {/* Right Form - Existing UI unchanged */}
          <div className="tm-fc-form-body">
            <h2>Ready to Start Your Own TeaMax?</h2>

            <p className="sub">
              Get the complete franchise proposal, investment breakup and
              setup process.
            </p>

            {formSubmitted ? (
              <div
                style={{
                  background: "rgba(255, 208, 40, 0.15)",
                  border: "1px solid #ffd028",
                  padding: "24px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    marginBottom: "8px",
                    color: "#ffd028",
                  }}
                >
                  <BadgeCheck size={36} />
                </div>

                <h3
                  style={{
                    color: "#ffd028",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  Thank You!
                </h3>

                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}
                >
                  Your franchise enquiry is ready. Continue the conversation
                  with our team on WhatsApp.
                </p>

                <button
                  type="button"
                  className="tm-fc-btn-submit"
                  onClick={() => {
                    window.open(
                      getWhatsAppUrl(formData),
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  <FaWhatsapp size={20} />
                  <span>Continue on WhatsApp</span>
                </button>

                <button
                  type="button"
                  className="tm-fc-btn-submit"
                  style={{
                    marginTop: "12px",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onClick={() => {
                    setFormData({ ...initialFormData });
                    setFormSubmitted(false);
                    setErrorMessage("");
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {errorMessage && (
                  <div
                    role="alert"
                    style={{
                      color: "#991b1b",
                      background: "#fff1f2",
                      border: "1px solid #fecaca",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="tm-fc-form-fields-grid">
                  {/* Full Name */}
                  <div className="tm-fc-input-group">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="tm-fc-input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email Address */}
                  <div className="tm-fc-input-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="tm-fc-input"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="tm-fc-input-group">
                    <div className="tm-fc-phone-wrap">
                      <div className="tm-fc-phone-flag">
                        <svg
                          width="20"
                          height="14"
                          viewBox="0 0 30 20"
                          style={{
                            borderRadius: "2px",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                          aria-label="Indian flag"
                        >
                          <rect
                            width="30"
                            height="6.66"
                            fill="#FF9933"
                          />
                          <rect
                            y="6.66"
                            width="30"
                            height="6.66"
                            fill="#FFFFFF"
                          />
                          <rect
                            y="13.33"
                            width="30"
                            height="6.67"
                            fill="#138808"
                          />
                          <circle
                            cx="15"
                            cy="10"
                            r="2.5"
                            fill="#000080"
                          />
                        </svg>
                        <span>+91</span>
                      </div>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="WhatsApp Number"
                        className="tm-fc-phone-input"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="tm-fc-input-group">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="tm-fc-input"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  {/* Searchable State Dropdown */}
                  <div className="tm-fc-input-group">
                    <Select
                      inputId="tm-fc-franchise-state"
                      name="state"
                      options={indianStateOptions}
                      value={
                        indianStateOptions.find(
                          (option) => option.value === formData.state
                        ) || null
                      }
                      onChange={(selectedOption) => {
                        setFormData((prev) => ({
                          ...prev,
                          state: selectedOption?.value || "",
                        }));
                        setErrorMessage("");
                      }}
                      placeholder="Select State"
                      isSearchable
                      isClearable
                      className="tm-fc-state-select"
                      classNamePrefix="tm-fc-state"
                      noOptionsMessage={() => "No state found"}
                      menuPlacement="auto"
                      menuPosition="fixed"
                      menuShouldScrollIntoView={false}
                      maxMenuHeight={220}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      styles={stateSelectStyles}
                    />
                  </div>

                  {/* When to Start */}
                  <div className="tm-fc-input-group">
                    <select
                      name="whenToStart"
                      value={formData.whenToStart}
                      onChange={handleInputChange}
                      className="tm-fc-select"
                      aria-label="When to Start"
                      required
                    >
                      <option value="">When to Start?</option>
                      <option value="Immediately">Immediately</option>
                      <option value="Within 90 Days">Within 90 Days</option>
                      <option value="Within 180 Days">Within 180 Days</option>
                      <option value="Not Decided Yet">Not Decided Yet</option>
                    </select>
                  </div>

                  {/* Shop Availability */}
                  <div className="tm-fc-input-group">
                    <select
                      name="haveShop"
                      value={formData.haveShop}
                      onChange={handleInputChange}
                      className="tm-fc-select"
                      required
                    >
                      <option value="">Do you have a space?</option>
                      {shopOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Button - Existing UI unchanged */}
                <button
                  type="submit"
                  className="tm-fc-btn-submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  <span>
                    {isSubmitting
                      ? "Submitting Enquiry..."
                      : "Get Franchise Details on WhatsApp"}
                  </span>
                  <FaWhatsapp size={20} />
                </button>

                <p className="tm-fc-form-disclaimer">
                  Submitting an enquiry does not guarantee franchise or
                  location approval.                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
