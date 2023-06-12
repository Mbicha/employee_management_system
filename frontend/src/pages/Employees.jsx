import react from 'react';

//Import components
import NoticeBoard from '../components/NoticeBoard';

const Employees = () => {
    return (
        <div>
            <section className='flex flex-col md:flex-row lg:flex-row max-w-full max-h-full p-4'>
                <div className='flex flex-wrap w-full lg:w-4/5 items-center justify-center border rounded-lg'>
                    {/* Start of Employee card */}
                    <div className='flex flex-col border rounded-lg mr-1 mb-1 w-full sm:w-1/2 md:w-1/4 lg:w-1/4'>
                        {/* Profile photo */}
                        <div className='flex justify-center items-center p-4 m-2'>
                            <img src="" alt="Profile" srcset="" className='w-24 h-24 border border-black p-2 rounded-full'/>
                        </div>

                        {/* Other Details */}
                        <div className='flex flex-col border rounded-lg p-4'>
                            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                <span className='text-green-800'>Name:</span> Mbithi Charles
                            </h2>
                            <h2 className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                <span className='text-green-800'>Job Title:</span> Software Engineer
                            </h2>
                            <hr></hr>
                            <div className='flex justify-end'>
                                <button className='bg-green-800 w-24 rounded-lg text-white p-2 mt-1'>View</button>
                            </div>
                        </div>
                    </div>
                    {/* End of Employee Card */}
                    
                </div>
                <div className='flex flex-col border w-full md:w-1/5 lg:w-1/5 p-4 items-center'>
                    <NoticeBoard/>
                </div>
            </section>
        </div>
    )
}

export default Employees;
