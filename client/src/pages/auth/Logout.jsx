import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App'

const Logout = () => {

    const {state, dispatch} = useContext(userContext)

    const navigateToLogin = useNavigate()

    // useEffect(() => {
    //     axios.get('/logout')
    //       .then((ress) => {
    //         // console.log(ress.data)                  // this is giving continuous ARRAY data of the documents from Atlas
    //         navigateToLogin('/login')
    //     })
    //       .catch((err) => {
    //         console.log(err)
    //       })
    //   })

    useEffect(() => {
        fetch('/logout',
        {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        }).then((res) => {
            dispatch({type: "USER", payload: false})
            navigateToLogin('/login')
        
        }).catch((err) => {
            console.log(err)
        })
    })


  return (
    <div>Logout</div>
  )
}

export default Logout