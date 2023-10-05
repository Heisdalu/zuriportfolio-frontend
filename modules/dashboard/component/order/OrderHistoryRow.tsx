import { Manrope } from 'next/font/google';
import React from 'react';
import { OrderHistory } from '../../../../@types';
const manropeMD = Manrope({
  weight: ['500'],
  subsets: ['latin'],
});
const CancelledTab: React.FC = () => {
  return (
    <div
      className={`bg-[#FEF3F2] text-[#B42318] ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path
          d="M9.5 3L3.5 9M3.5 3L9.5 9"
          stroke="#F04438"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Cancelled</span>
    </div>
  );
};
const CompletedTab: React.FC = () => {
  return (
    <div
      className={`bg-[#ECFDF3] text-[#027A48] ${manropeMD.className} mx-auto py-[2px] pl-[6px] pr-2 flex items-center gap-2 w-fit `}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
        <path d="M10.5 3L5 8.5L2.5 6" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Completed</span>
    </div>
  );
};
const OrderHistoryRow = (props: OrderHistory) => {
  const padDate = (num: number) => {
    return String(num).padStart(2, '0');
  };
  const formatDate = () => {
    const date = props.date;

    return `${padDate(date.getDate()).padStart(2, '0')}/${padDate(date.getMonth())}/${date.getFullYear()}`;
  };

  return (
    <tr className="font-manropeL border border-[#EAECF0] font-normal text-[#667085] [&>*]:px-6  [&>*]:py-4">
      <td className={`text-[#101828] ${manropeMD.className} text-center`}>#{props.id}</td>
      <td>{props.productName}</td>
      <td className={`text-[#101828] ${manropeMD.className}`}>{props.customerName}</td>
      <td>{formatDate()}</td>
      <td>
        {props.status === 'completed' && <CompletedTab />}
        {props.status === 'cancelled' && <CancelledTab />}
      </td>
    </tr>
  );
};

export default OrderHistoryRow;
