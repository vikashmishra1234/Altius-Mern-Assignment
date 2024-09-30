import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { addReply, deleteReply, updateTicketStatus } from './utills';
import Swal from 'sweetalert2';

const TicketComponent = ({ ind, item, role, setLoader, setChange }) => {
    const [show, setShow] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [text, setReply] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleReply = async (ticketId) => {
        if (text) {
            setLoader(true)
            await addReply({ ticketId, text });
            setLoader(false)
            setChange((prevChange) => !prevChange)
        }
    };
    const handleChange = async(e,ticketId)=>{
        const status = e.target.value
        const res = await updateTicketStatus({status,ticketId})
        if(res&&res.message){
            setChange((prevChange) => !prevChange)
            Swal.fire({
                icon:'success',
                title:"status update successFully"
            })
        }
      }
    return (
        <div>
            <div key={item._id} className="mt-5  md:w-[650px] w-[95%] ml-2 border-[1px] p-2">
                <h5 className=" sm:text-xl  text-gray-500 font-bold mb-2">TicketId: {item._id}</h5>
                <h5 className="text-xl text-gray-500 font-bold mb-2">Customer Name: {item?.customerName}</h5>
                <h5 className="text-xl text-gray-500 font-bold">Title: {item.title}</h5>
                <p className="text-lg mt-2 mb-2">Description: {item.description}.</p>
                <div className="flex mt-2 mb-2 gap-10">
                    <h5 className="text-lg">Status: {item.status}</h5>
                    {
                        role=='agent'&&<select  onChange={(e)=>handleChange(e,item._id)}  className="text-lg border-2 text-red-500 p-1 " name="status" id="status">
                        <option  value="">change the status</option>
                        <option  value="Active">Active</option>
                        <option  value="Pending">Pending</option>
                        <option  value="Closed">Close</option>
                        </select>
                    }
                </div>
                <h5 className="text-lg">Last updated: {item.updatedAt.split("T")[0]} at {item.updatedAt.split("T")[1].split("+")[0]}</h5>
                <div className="flex items-center gap-5">
                    <div
                        onClick={() => {
                            setSelectedIndex(ind)
                            setShow(!show);
                        }}
                        className="text-blue-600 border border-blue-500 pr-2 pl-2 pt-1 pb-1 mt-3 mb-3 text-lg cursor-pointer"
                    >
                        Reply to this ticket
                    </div>
                    <div className="text-xl text-blue-600 border border-blue-500 pr-2 pl-2 pt-1 pb-1 cursor-pointer"
                        onClick={() => {
                            setShowReply(!showReply);
                            setSelectedIndex(ind);
                            setShow(false);
                        }}>
                        See replies
                    </div>
                </div>
                {show && selectedIndex === ind && (
                    <div className=' h-16'>
                        <input
                            type="text"
                            className="mb-1 h-full mt-1 w-[70%] bg-gray-200 outline-none p-2 mr-4"
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Write here"
                        />
                        <button className="text-blue-600" onClick={() => handleReply(item._id)} type="submit">
                            Submit
                        </button>
                    </div>
                )}
                <div>
                    {showReply && selectedIndex === ind && item.notes?.map((data) => (
                        <React.Fragment key={data._id}>
                            <h2 className="text-xl mt-2 font-bold text-gray-500 mb-2">Some replies to this ticket</h2>
                            <div className="border flex items-center justify-between border-b-gray-300">
                                <div>
                                    <p className="text-gray-500 text-lg">Reply: {data.text}</p>
                                    <p className="text-lg">By: {data.createdBy}</p>
                                    <p className="text-lg">Date: {data.createdAt.split("T")[0]} at {data.createdAt.split("T")[1].split("+")[0]}</p>
                                </div>
                                <div>
                                    <MdDelete size={'27px'} onClick={() => {
                                        deleteReply({ ticketId: item._id, noteId: data._id });
                                        setChange((prevChange) => !prevChange);
                                    }} cursor={'pointer'} />
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketComponent;
