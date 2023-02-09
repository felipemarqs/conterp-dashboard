import React from 'react'

import { useGetContractsQuery } from 'state/api'




const Dashboard = () => {

  //console.log(process.env.REACT_APP_BASE_URL)
  const {data} = useGetContractsQuery()
  console.log(data)

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard