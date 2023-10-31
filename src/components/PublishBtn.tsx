import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const PublishBtn = ({id}:{id:number}) => {
  return (
    <Button className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400' >
        <Image alt='preview' width={20} height={20} src={"/Publish.svg"} />
        Publish
    </Button>
  )
}

export default PublishBtn