import React, { useEffect, useState } from "react";
import { addNote, getCustomberTickets } from "../utills";


const GetTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [show, setShow] = useState(false);
  const [change,setChange] = useState(false)
  const [showReply, setShowReply] = useState(false);
  const [text, setReply] = useState("");
  const [selectedIndex,setSelectedIndex] = useState(null)
  const [loader,setLoader] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoader(true)
      const data = await getCustomberTickets();
      setLoader(false)
      setTickets(data.tickets);
    };
    getData();
  }, [change]);
  const handleReply = async (ticketId) => {
    if (text) {
      setLoader(true)
      await addNote({ ticketId, text });
      setLoader(false)
      setChange(!change)
    }
  };
  if(loader){
    return <h2>loading please wait...</h2>
  }
  return (
    <div>
      {tickets&&tickets.length!=0?tickets.map((item, ind) => (
        <div key={ind} className="mt-5  md:w-[650px] w-[95%] ml-2 border-[1px] p-2">

        <h5 className=" sm:text-xl  text-gray-500 font-bold mb-2">TicketId: {item._id}</h5>
        <h5 className="text-xl text-gray-500 font-bold mb-2">Customer Name: {item?.customerName}</h5>
        <h5 className="text-xl text-gray-500 font-bold">Title: {item.title}</h5>
        <p className="text-lg mt-2 mb-2">Description: {item.description}.</p>
        <div className="flex mt-2 mb-2 gap-10">
        <h5 className="text-lg">status: {item.status}</h5>
        </div>
        <h5 className="text-lg">last updated: {item.updatedAt.split("T")[0]} at {item.updatedAt.split("T")[1].split("Z")[0]}</h5>
        <div  className="flex items-center gap-5 ">
        <div
          onClick={() => {
              setSelectedIndex(ind)
            setShow(!show);
          }}
          className="text-blue-600 border border-blue-500 pr-2 pl-2 pt-1 pb-1 mt-3 mb-3 text-lg cursor-pointer"
        >
          reply to this ticket
        </div>
        <div className="text-xl text-blue-600 border border-blue-500 pr-2 pl-2 pt-1 pb-1 cursor-pointer" onClick={()=>{setShowReply(!showReply);setSelectedIndex(ind);setShow(false)}}>see replies</div>
        </div>
        {show && selectedIndex==ind && (
          <div>
            <input
              type="text"
              className="mb-1 mt-1 bg-gray-200 outline-none p-2  mr-4"
              onChange={(e) => setReply(e.target.value)}
              placeholder="write here"
            />
            <button className="text-blue-600" onClick={() => handleReply(item._id)} type="submit">
              Submit
            </button>
          </div>
        )}
        <div>
          {
             showReply&&selectedIndex==ind&&item.notes?.map((data,index)=>(
                  <>
                { index==0&&<h2 className="text-xl mt-2 font-bold text-gray-500 mb-2">some reply to this ticket</h2>}
                 <div key={index} className="border border-b-gray-300">
                   <p className="text-gray-500 text-lg">Reply: {data.text}</p>
                   <p className="text-lg">By: {data.createdBy}</p>
                   <p className="text-lg">Date: {data.createdAt.split("T")[0]} at {data.createdAt.split("T")[1].split("Z")[0]}</p>
                 </div>
                  </>
              ))
          }
        </div>
      </div>
      
      )):<h4>you hav'nt create any ticket</h4>}
  </div>
  );
};

export default GetTickets;
