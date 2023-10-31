import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const SaveBtn = ({id}:{id:number}) => {
  return (
    <Button variant={"outline"} className='gap-2' >
        <Image alt='Save' width={20} height={20} src={"/Save.svg"} />
        Save
    </Button>
  )
}

export default SaveBtn