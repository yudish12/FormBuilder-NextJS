import React from 'react'
import { SignUp } from "@clerk/nextjs";
const signup = () => {
    return (
        <div className='flex justify-center mt-24' >
            <SignUp />
        </div>
    );
}

export default signup
