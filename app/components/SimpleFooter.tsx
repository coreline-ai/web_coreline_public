import React from 'react';

export default function SimpleFooter() {
    return (
        <>
            <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2">
                <div className="w-2 h-2 rounded-full border bg-[#FFD600] border-black dark:border-none"></div>
                <div className="w-2 h-2 rounded-full border bg-[#A78BFA] border-black dark:border-none"></div>
                <div className="w-2 h-2 rounded-full border bg-[#2DD4BF] border-black dark:border-none"></div>
            </div>

        </>
    );
}
