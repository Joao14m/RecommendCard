import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

// This route to connect
// 1. Reads the user's JSON from the request.
// 2. Calls the Python script with that JSON as a command-line argument.
// 3. Captures stdout from Python (output).
// 4. Parses that JSON into a JavaScript object.
// 5. Returns it to the React frontend

export async function POST(req){
    try {
        const body = await req.json();
        const pythonProcess = spawn('python', [
            '../../../recommender/recommend.py',
            JSON.stringify(body),
        ]);

        var output = '';
        for await (const chunk of pythonProcess.stdout){
            output += chunk;
        }

        var errorOutput = '';
        for await (const chunk of pythonProcess.stderr){
            errorOutput += chunk;
        }

        if (errorOutput){
            console.error(errorOutput);
            return NextResponse.json({ error: errorOutput }, { status: 500 });
        }

        const recommendations = JSON.parse(output); // Parse the JSON from Python

        return NextResponse.json(recommendations); // Return JSON to the frontend
    } catch (err) {
        console.error('Server Error: ', err);
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}