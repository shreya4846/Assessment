import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from 'axios';
const Home = () => {
    const [data , setData] = useState([]);
    useEffect(()=>{
        console.log(sessionStorage.getItem("token"));
        const headers = {
            token:sessionStorage.getItem("token")
        }
        axios.get("http://localhost:8000/user",{headers} )
        .then(response=>{
            setData(response.data.data);
        })
        .catch(err =>{
            console.log(err);
        })
    },[])
    return (
        <div className="user-data-table-container">
            <h2>User Data Table</h2>
            <table className="user-data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{(item.dob).split('T')[0]}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))
                }
                    
                </tbody>
            </table>
        </div>
    );
};

export default Home