import React , { useEffect, useState} from 'react'
import { onSnapshot ,collection , query , orderBy} from 'firebase/firestore'
import { db } from '../Firebase-config'

function IndividualUser() {

  const [userList , setUserList] = useState([])
  const userCollectionRef = collection(db , "users")

  useEffect(() => {
    const q = query(userCollectionRef , orderBy("upladDate" , "desc") );
      onSnapshot(q  , (snaps) => {
          const userListArray = []
          const data = snaps.docs.map((doc) => ({...doc.data() , id:doc.id}) )

          data.map((user) => {
            userListArray.push({name : user.name , id:user.id})
          })

          setUserList(userListArray)
      })
      
  }, [])
 

  return (
    <div>
        {
            userList.map((userName) => {
                return <p key={userName.id} >{userName.name}</p>
            })
        } 
    </div>
  )
}

export default IndividualUser