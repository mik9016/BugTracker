import React, {useState,useEffect} from 'react';
import {fire} from '../Firebase';

export function useGetIssues(flag){
    const [data, setData] = useState([]);

    const getIssues = async () => {
        let Teams = [];
  
        await fire
          .database()
          .ref("Issues")
          .on("value", (snapshot) => {
            const teams = snapshot.val();
            for (let id in teams) {
              Teams.push({ id, ...teams[id] });
            }
          });
  
        setData(Teams);
        console.log("data fetched Issues Hook");
      };

    useEffect(() => {
        getIssues()
       
    }, [flag]);

    return data;
};

