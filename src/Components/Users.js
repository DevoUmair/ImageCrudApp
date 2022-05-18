import React , {useContext, useEffect, useState} from 'react'
import { appContext } from '../App'
import { MdDelete } from 'react-icons/md'
import { BiSelectMultiple } from 'react-icons/bi'
import styled from 'styled-components'
import { deleteDoc ,  doc  , getDoc , collection  } from 'firebase/firestore'
import { db  } from '../Firebase-config'
import { BiSearch } from 'react-icons/bi'

function Users() {
  const [fillter , setFillter] = useState([]);
  const [filterStatues , setFilterStatues ] = useState(true)
  const { clearItems ,  setImageUrL, users , setSelectUsers , setName ,  setEmail , setPhoneNum , setJob  ,  setCity } = useContext(appContext)   
  const collectionRef = collection(db , 'users')

 

  const deleteUser = async (id) => {
    const userDoc = doc(db , "users" , id)
    await deleteDoc(userDoc);

    clearItems();
  }

  const selectUser = async (id) => {
    const docRef = doc( collectionRef , id)
    const docSnap = await getDoc(docRef)
    setSelectUsers(docRef)

    setName(docSnap.data().name)
    setEmail(docSnap.data().email)
    setPhoneNum(docSnap.data().phoneNum)
    setJob(docSnap.data().job)
    setCity(docSnap.data().city)
    setImageUrL(docSnap.data().imageUrL)

  }   

  const serchItems= (term) => {
    const  filletrerdUser = [];
    const result = () =>{

        if(term !== ''){
            users.map((user) => {
              if( user.name.toLowerCase().includes(term.toLowerCase()) ){
                filletrerdUser.push(user)
                setFillter(filletrerdUser)
                setFilterStatues(false)
              }
            })
        }else{
          setFilterStatues(true)
        }    
    }
    result();
  }


  const setUseApoint = (user) => {

    
    if(localStorage.getItem("apointedUsers") === null){
       const list = [];
       list.push(user)
       console.log(list) 
       localStorage.setItem("apointedUsers" , JSON.stringify(list));
    }else{
      const list = JSON.parse( localStorage.getItem("apointedUsers") )
      console.log(list)
      list.push(user)
      localStorage.setItem("apointedUsers" , JSON.stringify(list));
    }
   
   
  } 

  return (
  <>  
    <SearchBar>
     <BiSearch />
      <input onChange={(e) => {serchItems(e.target.value)} } type='text'/>
    </SearchBar>
    <Table style={{width:'100%'}}>
        <thead>
            <tr>
            <th>Iamge</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>Job</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Select</th>
            <th>Apoint</th>
            </tr>
        </thead>
        <tbody>
            {
              filterStatues ? (  users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td data-column="First Name"><img alt={user.name} src={user.imageUrL} style={{width:'100px' , height:'100px'}} /> </td>
                            <td data-column="First Name">{user.name}</td>
                            <td data-column="First Name">{user.email}</td>
                            <td data-column="Last Name">{user.phoneNum}</td>
                            <td data-column="Job Title">{user.city}</td>
                            <td data-column="Twitter">{user.job}</td>
                            <td data-column="Twitter">{user.upladDate.toDate().toDateString()}</td>
                            <td data-column="Twitter" className='dltBtn' > <MdDelete onClick={() => {deleteUser(user.id)}} /> </td>
                            <td data-column="Twitter" className='selectBtn' > <BiSelectMultiple onClick={() => {selectUser(user.id)}} /> </td>
                            <td data-column="Twitter"><button onClick={() => {setUseApoint(user)}} style={{border:'none' , background:'#313131' , outline:'none' , padding:'8px 12px' , color:'#fff' , cursor:'pointer' }} >Apoint</button></td>
                        </tr>
                    )
                })
              ) : (
                fillter.map((user) => {
                   return (
                      <tr key={user.id}>
                          <td data-column="First Name"><img alt={user.name} src={user.imageUrL} style={{width:'100px' , height:'100px'}} /> </td>
                          <td data-column="First Name">{user.name}</td>
                          <td data-column="First Name">{user.email}</td>
                          <td data-column="Last Name">{user.phoneNum}</td>
                          <td data-column="Job Title">{user.city}</td>
                          <td data-column="Twitter">{user.job}</td>
                          <td data-column="Twitter">{user.upladDate.toDate().toDateString()}</td>
                          <td data-column="Twitter" className='dltBtn' > <MdDelete onClick={() => {deleteUser(user.id)}} /> </td>
                          <td data-column="Twitter" className='selectBtn' > <BiSelectMultiple onClick={() => {selectUser(user.id)}} /> </td>
                          <td data-column="Twitter"><button onClick={() => {setUseApoint(user)}} style={{border:'none' , background:'#313131' , outline:'none' , padding:'8px 12px' , color:'#fff' , cursor:'pointer' }} >Apoint</button></td>
                      </tr>
                   )
                })
              )
            }
        </tbody>
</Table>
</>
  )
}

const Table = styled.table`
   
`

const SearchBar = styled.div`
   margin: 3% 0% -1%;
   width: 100%;
   background-color: #313131 ;
   border-radius: 10px;
   height: 100%;
   position: relative;

   input{
     margin-left:35px;
     width: 97%;
     font-size: 17px;
     background: transparent;
     border: none;
     outline: none;
     color: #fff;
     padding: 12px 0px;
   }

   svg{
     position: absolute;
     left: 1%;
     top: 30%;
     transform: translate(-30% , 0%);
     font-size: 1.3rem;
     color: #fff;
     font-weight: 800;
   }
`

export default Users