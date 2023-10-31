import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'


const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} className='gap-2' >
        <Image alt='preview' width={20} height={20} src={"/Preview.svg"} />
        Preview
    </Button>
  )
}

export default PreviewDialogBtn