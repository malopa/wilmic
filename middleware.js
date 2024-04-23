import { NextRequest } from "next/server"
import {updateSession} from './app/api/lib'
export async function middleware(request,res,next){
    return await updateSession(request)
}