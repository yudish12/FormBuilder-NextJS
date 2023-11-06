import React from 'react'
import { useRouter } from 'next/router'

const Component = () => {
    const router = useRouter();
    const {id} = router.query
    return (
    <div></div>
  )
}

export default Component