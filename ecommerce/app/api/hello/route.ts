export async function GET() {
  return new Response(JSON.stringify({message: 'Hello, from the fetch test API route!'}), 
    { status: 200, headers: { 'Content-Type': 'application/json' } });
}  

export async function POST() {
  return new Response(JSON.stringify({message: 'POST request received!'}), 
    { status: 200, headers: { 'Content-Type': 'application/json' } });
}