import React, { useEffect, useState } from "react";
import {  addReply, deleteReply, getCustomerTickets } from "../utills";
import { MdDelete } from "react-icons/md";
import TicketComponent from "../TicketComponent";

const GetTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [change,setChange] = useState(false)
  const [text, setReply] = useState("");
  const [loader,setLoader] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoader(true)
      const data = await getCustomerTickets();
      setLoader(false)
      if(data){
        console.log(data)
        setTickets(data.tickets);
      }
    };
    getData();
  }, [change]);

  if(loader){
    return <h2>loading please wait...</h2>
  }
  return (
    <div>
      {tickets&&tickets.length!=0?tickets.map((item, ind) => (
        <TicketComponent setLoader={setLoader}  setChange={setChange} ind={ind} item={item}/>
        )):<h4>you have not create any ticket</h4>}
  </div>
  );
};

export default GetTickets;
