import { NextRequest,NextResponse } from "next/server"
import {updateSession} from './app/api/lib'
import { BASE_URL } from "./app/api/base";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from 'next';
export async function middleware(request:NextRequest,res: NextResponse){
    return await updateSession(request)
}

