import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
    matcher: ['/login','/signup','/forms','/formdetails/id','/form/id','/api/createform','/api/updateForm','/api/publishform'],
};
