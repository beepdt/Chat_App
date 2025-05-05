 import React, { use } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFriends } from '@/state';
import { GET_FRIENDS_ROUTE } from '@/pages/HomePage/apiClient';
import { useEffect } from 'react';

 const Contacts = () => {
    const {_id="", picturePath=""} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const friends = useSelector((state)=> state.user.friends);

    const getFriends = async () => {
            try {
              const response = await fetch(`${GET_FRIENDS_ROUTE}/${_id}`, 
                {
                  method: "GET",
                  headers: { Authorization: `Bearer ${token}`},
              });
              if (!response.ok) {
                throw new Error("Failed to fetch user");
              }
              const data = await response.json();
              console.log("data: ", data)
              dispatch(setFriends({ friends: data}));
            } catch (error) {
              console.error("Error fetching user:", error);
            }
          };
          useEffect(() => {
            getFriends()
          } , []); //eslint-disable-line react-hooks/exhaustive-deps
          

    return(
        <>
        <div
            className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] 
                        bg-[#111111] rounded-lg text-white w-full h-full"
        >
            <div className='flex items-center justify-between'>
              <h2 className='font-nohemi pl-4 pt-4 text-xl'>Direct Messages</h2>
            </div>
            <div className='flex items-center justify-between'>
              <h2 className='font-nohemi pl-4 pt-4 text-xl'>Groups</h2>
            </div>
            
        </div>
            
        </>
    )
}
export default Contacts;