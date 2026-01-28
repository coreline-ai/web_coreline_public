import React from 'react';

export default function SimpleFooter() {
  return (
    <>
      <div className="fixed right-0 bottom-6 left-0 flex justify-center gap-2">
        <div className="h-2 w-2 rounded-full border border-black bg-[#FFD600] dark:border-none bw:border-black"></div>
        <div className="h-2 w-2 rounded-full border border-black bg-[#A78BFA] dark:border-none bw:border-black"></div>
        <div className="h-2 w-2 rounded-full border border-black bg-[#2DD4BF] dark:border-none bw:border-black"></div>
      </div>
    </>
  );
}
