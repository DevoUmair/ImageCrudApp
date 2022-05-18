import React , {createContext, useEffect, useState} from 'react';
import './App.css';
import IndividualUser from './Components/IndividualUser';
import Uplaod from './Components/Uplaod';
import Users from './Components/Users';

export const appContext = createContext(null)

function App() {
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [phoneNum , setPhoneNum] = useState(0);
  const [job , setJob] = useState("");
  const [city , setCity] = useState("");
  const [users, setUsers] = useState([]);
  const [selcetUsers, setSelectUsers] = useState([]);
  const [imageUrl , setImageUrL] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyW716i6mM5-Z0ukCpGzBYZWUw65ChPDWG7UjzgED960WZHA7GX2kQKQB7TGoKrmvtOE&usqp=CAU')



  const clearItems = () => {
    setName("");
    setEmail("");
    setPhoneNum(0);
    setCity("");
    setJob("");
    setImageUrL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvyW716i6mM5-Z0ukCpGzBYZWUw65ChPDWG7UjzgED960WZHA7GX2kQKQB7TGoKrmvtOE&usqp=CAU")
}

  return (
    <div className="App">
      <appContext.Provider value={ { name , setName , email , setEmail , phoneNum , setPhoneNum , job , setJob , 
        city , setCity  , users , setUsers , selcetUsers , setSelectUsers , imageUrl , setImageUrL , clearItems }} >
          <Uplaod />
          <Users />
          <IndividualUser />
      </appContext.Provider>
    </div>
  );
}

export default App;
