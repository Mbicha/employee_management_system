import React from "react";

const NoticeBoard = () => {
    const announcements = [
        {
            "title": "Meeting",
            "date": "1st June, 2023",
            "start": "8:00AM",
            "end": "10:00AM",
            "venue": "Kisumu Office",
            "coverage": "Kisumu Employees Only",
            "expected": "Prepare report for your various designations."
        },
        {
            "title": "Seminar",
            "date": "4th June, 2023",
            "start": "8:00AM",
            "end": "4:00PM",
            "venue": "Nairobi Office",
            "coverage": "All Software Engineers",
            "expected": "Prepare report for your various designations."
        }
    ];

    return (
        <div className="flex flex-col border border-green-800 min-h-24">
            <h1 className="w-full border justify-center bg-green-800 text-white text-1xl p-2">
                Notice Board
            </h1>
            <div className="m-1 p-1">
                <h1 className="font-bold">Announcements</h1>
                <hr />
                {announcements.map((announcement, index) => (
                    <div key={index} className="border rounded-lg mb-1 p-1">
                        <div className="m-1">
                            <span className="font-semibold">Title: </span>
                            {announcement.title}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Date: </span>
                            {announcement.date}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Starting At: </span>
                            {announcement.start}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Stop: </span>
                            {announcement.end}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Venue: </span>
                            {announcement.venue}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Employees: </span>
                            {announcement.coverage}
                        </div>
                        <div className="m-1">
                            <span className="font-semibold">Expected: </span>
                            {announcement.expected}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoticeBoard;


// const NoticeBoard = () => {
//     const anouncements = [
//         {
//             "title": "Meeting",
//             "date": "1st June, 2023",
//             "start": "8:00AM",
//             "end": "10:00AM",
//             "venue": "Kisumu Office",
//             "coverage": "Kisumu Employees Only",
//             "expected": "Prepare report for your various designations."
//         },
//         {
//             "title": "Seminar",
//             "date": "4th June, 2023",
//             "start": "8:00AM",
//             "end": "4:00PM",
//             "venue": "Nairobi Office",
//             "coverage": "All Software Engineers",
//             "expected": "Prepare report for your various designations."
//         }
//     ]
//     return (
//         <>
//             <div className="flex flex-col border border-green-800 min-h-24">
//                 <h1 className="w-full border justify-center bg-green-800 text-white text-1xl p-2">
//                     Notice Board
//                 </h1>
//                 <div className="m-1 p-1">
//                     <h1 className="font-bold">Anouncements</h1>
//                     <hr />
//                     <div className="border rounded-lg mb-1 p-1">
//                         <div className="m-1"><span className="font-semibold">Title: </span>Meeting</div>
//                         <div className="m-1"><span className="font-semibold">Date: </span>1st June, 2023</div>
//                         <div className="m-1"><span className="font-semibold">Starting At: </span>8:00AM</div>
//                         <div className="m-1"><span className="font-semibold">Stop: </span>10:00AM</div>
//                         <div className="m-1"><span className="font-semibold">Venue: </span>Kisumu Office</div>
//                         <div className="m-1"><span className="font-semibold">Employees: </span>Kisumu Employees Only</div>
//                         <div className="m-1"><span className="font-semibold">Expected: </span>Prepare report for your various designations.</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default NoticeBoard;
