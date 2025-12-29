import { useEffect, useState } from "react";

export const Dashboard = () => {
    const [data, setData] = useState([])
    const apiCall = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (response.status == 200) {
            const data = await response.json();
            setData(data);
        }

    }
    useEffect(() => { apiCall() }, [])

    return (
        <>
            <h1>Dashboard</h1>
            <div style={{margin:"50px"}}>{data.map((item: any) =><div key={item.id}>{item.title}</div>)}</div>
        </>
    );
};