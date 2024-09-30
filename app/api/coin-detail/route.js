import axios from "axios";
import { NextResponse } from "next/server";

const TOKEN = process.env.GECKO_TOKEN;

export async function GET() {
    try {
        console.log('Token:', TOKEN); // Ensure the token is being logged properly

        const response = await axios.get(COINGECKO_API_BASE, {
            // headers: {
            //     "x-cg-demo-api-key": TOKEN || '', // In case TOKEN is undefined, provide a fallback
            // },
        });

        console.log('Axios Response:', response.data); // Log the actual data

        // Return the data part of the axios response
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging

        // Return error information
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
}
