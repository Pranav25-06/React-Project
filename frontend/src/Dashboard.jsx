import Users from "./Users";
import { useNavigate } from "react-router-dom";
function Dashboard({setUsers}){
    const navigate = useNavigate();
    const getEmployees = async ()=>{
        try{
            
            const token = localStorage.getItem("token");
            console.log(token)
            const response = await fetch("http://localhost:3000/api/users",{
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`
                },
                 

              })
               
              console.log(response)
            const data = await response.json();
           const result = data.data
           setUsers(result);
            console.log(result)
            navigate("/users");
             
        }catch(error){
            console.log(error);
        }
        
    }
    
    return (

        <>
        <div className="container mt-5 pt-5" style={{paddingTop:"100px"}}>
        <h1 mb-4>Welcome</h1>
        <button onClick={getEmployees} className="btn btn-primary">Get All Employees</button>
        </div>
        </>
        
    )
}

export default Dashboard;