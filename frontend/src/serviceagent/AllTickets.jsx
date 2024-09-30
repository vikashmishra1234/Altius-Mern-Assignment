import React, { useEffect, useState } from "react";
import { addReply, getAllTickets, updateTicketStatus } from "../utills";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import TicketComponent from "../TicketComponent";

const GetTickets = ({setNumberOfTickets,list}) => {
  const [tickets, setTickets] = useState([]);
  const [loader,setLoader] = useState(false)
  const [change,setChange] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const data = await getAllTickets();
      if(data){
        setNumberOfTickets(data.tickets.length)
        setTickets(data.tickets);
      }
    };
    getData();
  }, [change]);


  if(loader){
    return <h2>Loading Please wait...</h2>
  }
  return (
    <div>
      {tickets&&tickets.length!=0?tickets.map((item, ind) => (
       ind<list&&<TicketComponent
       key={ind}
       role={'agent'}
       setChange={setChange}
       setLoader={setLoader}
       ind={ind}
       item={item}
       />
        
        )):<h4>no tickets to show</h4>}
    </div>
  );
};

export default GetTickets;
