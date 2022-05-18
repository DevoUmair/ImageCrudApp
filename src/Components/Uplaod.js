import React, { useEffect, useState , useContext , useRef }  from 'react'
import styled from 'styled-components'
import { db , storage} from '../Firebase-config'
import { addDoc , collection , onSnapshot, updateDoc , Timestamp , query , orderBy, where} from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { appContext } from '../App'

function Uplaod() {
  const [progress , setProress] = useState(0) 
  const [apointeUser , setApointeUser] = useState([])  
  

  const collectionRef = collection(db , 'users')
  const { clearItems , imageUrl , setImageUrL , setUsers , name , setName , email , setEmail , phoneNum , setPhoneNum , job , setJob , city , setCity , selcetUsers} = useContext(appContext);
  const photoUploadRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if(name === "" && email === "" && phoneNum === 0 && job === "" && city === ""){
          console.log("Emty")
    }else{
        await addDoc(collectionRef , {name:name , email : email , phoneNum : phoneNum , city : city , job : job , imageUrL : imageUrl , upladDate : Timestamp.now().toDate() })
        console.log("User Added Successfully")
    }  
    clearItems();
  }


  useEffect(() => {

    const q = query(collectionRef, orderBy("upladDate" , "desc") );
    onSnapshot(q , (snapshot) => {
        setUsers(snapshot.docs.map((doc) => ({...doc.data() , id:doc.id})))
    })
  
  }, [])

  const set = () =>{
    const apointeDUser = JSON.parse(localStorage.getItem("apointedUsers"))
    setApointeUser(apointeDUser)
  }
  
  useEffect(() => {
   set();
  } , [])

  const updateSelectedItem= async () => {
      const newFeilds = {name:name , email : email , phoneNum : phoneNum , city : city , job : job  , imageUrL:imageUrl , upladDate : Timestamp.now().toDate() }
      await updateDoc(selcetUsers , newFeilds)
      clearItems();
  }

  const clearSelectedItem = () => {
      clearItems();
  }

  const imageUplaodFileOpen = () => {
      photoUploadRef.current.click();
  }

  const  imageUpload = (e) => {
    const image = e.target.files[0]

       
    const name = new Date().getTime() + image.name
    const storageRef = ref(storage, name );

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProress(progress)
            console.log(progress)
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
            break;
        }
        }, 
        (error) => {
           console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                setImageUrL(downloadURL)
                setProress(0)
            });
    }
    );
   
  }

  return (
    <>  
         <ProgressBar style={{width: `${progress}%` }}>

         <button data-badge= {apointeUser !== null ? apointeUser.length : 0} className='notification' aria-label="10 unread notifications">
              <img style={{width:'30px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAACsElEQVRoge2azWsTQRjGf7WY2KopeNI2NVrQ4sUcrB9H9SIKnlQ8iuBJPIn+D73o3+BBLxLUg3jy7Mmi+NEqSMEPKGorNDWirTYe5l3SJtlk39mdmYA+8JBs8r7zPs/OTGZ3NuAOo0AFqArvAeMO6znBKLAA1Ju4ABQD6lKjQquJiHcD6lKjSryRRRcFN7hotAvqLhp1ZeSx5XfBMQBcAybleJz4yb5HYiYlZ8Cr0g4oAzMYob+BCfm8iJnYi8IKDRMHJbYuuWWPetviOFBj/VmfxwiNwyFae6sGHHOqtAPKtJqIuALcAg4Dg8Ij8tlKTE4N2O/VAbAJmI4RlIbT0rY3XHdgIuJVXyY2Al8cGvksNZzjtEMTEU9pRdksiCcscrQ4qU2wMTLRPSQ1DmgTbIzssshxXqPPoshPIG+Rp62hunTRGskBv5Q5tshhFs9E0A6tLcr4NNisCf5vxAO2aoK1RkrK+DTYqQnWGvG5naOqpTWyVxmfBk5P2ivcX2dFfO7KRNGjiTqwCgwnFacZWmcVsVmgDziTdaP9wDv89kgdmJXameFiABMRL2RlYgT4FtDIPLAjrYkC8CygiYhPUa70azEGvOwBExFfALu1Jo5iujS0+GZ+FW2JcB5Y7gHRcVwGziUx8qkHxHbjx2bR7RZE60nlES0a2xl55EFIWjxMEjQMvCX88InjG2B7UseDwE3id9tDsAbcEG1qFIBLwANgLoD4OeC+aCh0EqrdDioB+zAbaCXM8/RtUmRIuPa+fojGPFxl/RPd7zSeZlUxl0EfgPfCGXn9t2Cz09gJY5iz+0eOf9DY0MvTGN/9mF6czbh+Zlgi+fjP9I8DWT9nf+0otiuyNnJHEXs749qZIk+y+5cpzCZ1T2OEzmamUOyOhEYOuAI8wfwALMn7yzjqib8v76Eh+HRjNAAAAABJRU5ErkJggg==" alt="" tabindex="-1" />
         </button>     
 
        </ProgressBar>
        <form onSubmit={submitHandler}>
            <Container>
                <InputWrapper>
                   <div className='profile-content'>
                       <img className='profilePic' src={imageUrl} /> 
                       <div className='photo-upload-continer'>
                           <div className='photo-upload-btn' onClick={imageUplaodFileOpen}>
                                 Uplaod Photo
                           </div>
                            <input onChange={(e) => {imageUpload(e)}} ref={photoUploadRef} hidden type='file' style={{border:'none'}}/>
                       </div>
                   </div>
                </InputWrapper>
                <InputWrapper>
                    <label>Name : </label>
                    <input onChange={(e) => {setName(e.target.value)}} type='text' placeholder='Name...' value={name} />
                </InputWrapper>
                <InputWrapper>
                    <label>Email : </label>
                    <input onChange={(e) => {setEmail(e.target.value)}} type='email' placeholder='Email...' value={email} />
                </InputWrapper>
                <InputWrapper>
                    <label>Phone Number : </label>
                    <input onChange={(e) => {setPhoneNum( e.target.value )}} type='number' placeholder='Phonenumber...' value={phoneNum}/>
                </InputWrapper>
                <InputWrapper>
                    <label>City : </label>
                    <input onChange={(e) => {setCity(e.target.value)}} type='text' placeholder='City...'  value={city} />
                </InputWrapper>
                <InputWrapper>
                    <label>Job : </label>
                    <input onChange={(e) => {setJob(e.target.value)}} type='text' placeholder='Job...' value={job} />
                </InputWrapper>
                <InputWrapper>
                    <button >Submit</button> 
                </InputWrapper>
            </Container>
        </form>  
        
        <div className='buttons'>
            <button onClick={updateSelectedItem} className='updateBtn'>Update</button>
            <button onClick={clearSelectedItem} className='clearBtn'>Clear</button>
        </div>

    </>
  )
}

const Container = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);
   gap: 30px;
   grid-auto-rows: minmax(100px, auto);
`

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;

  input{
      flex: 1;
      width: 100%;
      margin: 0px 10px;
      background: none;
      border: none;
      outline: none;
      padding: 4px 4px;
      border-bottom: 1px solid #323232;
  }

  button{
      background: #414141;
      color: #fff;
      border: none;
      padding: 10px 30px;
      cursor: pointer;
      outline: none;
  }
`

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 0;
  height: 3px;
  border-radius: 12px;
  background-color: red;

`

export default Uplaod