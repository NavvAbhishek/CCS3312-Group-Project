import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // Extracting both id and role from the token
        const userId = decodedToken.id;

        console.log(`User ID: ${userId}`);

        return { userId };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default getDataFromToken;
