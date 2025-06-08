import { useState } from "react"
import React  from 'react'
import "./App.css";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [users, setusers] = useState([]);
  const [buttonState, setButtonState] = useState("add")
  const [userInfo, setUserInfo]=useState ({
    id:uuidv4,

    name:"",
    age:"",
    email:"",
    phone:"",

  }

  );

  const handleChange = (e)=>{
    const{name,value}=e.target;
    setUserInfo((currentInfo)=>{
      return {
        ...currentInfo,
        [name]:value,
      }
    })

  };
  const addData =()=>{
    setusers((currentUsers)=>[...currentUsers,userInfo])
    setUserInfo({
      id:uuidv4(),

      name:"",
    age:"",
    email:"",
    phone:"",

    })



  };
  // const deleteData=(id)=>{
  //   setusers((currentUsers)=>{
  //     return user.id !== id;

  //   })
  // }
  const deleteData = (id) => {
    setusers((currentUsers) => currentUsers.filter((user) => user.id !== id));
  };

   const startEditing =(user)=>{
    setUserInfo(user);
    setButtonState("edit");

   }
   const cancelEditing =()=>{
    setUserInfo({
      name:"",
      age:"",
      email:"",
      phone:"",

    })
    setButtonState("add")
   }
   const updateData=()=>{
    setusers((currentUsers)=>{
      return currentUsers.map((user)=>{
        if (user.id===userInfo.id){
          return userInfo;
        }
        return user;
      })
    })
    cancelEditing();  

   }
  
  return (
    <div className="Container">
      <div className="form">
        

      
<div>
  <input type="text" 
  placeholder="Enter Your Name"
   value={userInfo.name}
  name="name" 
  onChange={handleChange}/>
<br/>
<input type="number"
 placeholder="Enter Your Age" 
 name="age" 
 value={userInfo.age}
 onChange={handleChange} />
<br/>
<input type="email"
 placeholder="Enter Your Email" 
 value={userInfo.email}
 name= "email" 
 onChange={handleChange}/>
<br/>
<input type="number"
 placeholder="Enter Your PhoneNO:" 
 name= "phone" 
 value={userInfo.phone}
 onChange={handleChange}/>
<br/>
{
  buttonState === "add"? (<button onClick={addData}> Add</button> 
    
  ): (
 <div className="buttonContainer">
   <button onClick={updateData}> Update</button>
   <button onClick={cancelEditing}> Cancel</button>
   </div>
  )
}
</div>
</div>
<div className="datatable">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user,index) =>{
        return <tr key={index}>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            <button onClick={()=>startEditing(user)}>Edit</button>
            <button onClick={()=> deleteData(user.id)}>Delete</button>
          </td>
        </tr>
        
      })}
    </tbody>
  </table>

</div>


    </div>
  )
}

export default App