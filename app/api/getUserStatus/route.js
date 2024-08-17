export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    console.log('Response Status:', response.status); // Debugging log
    console.log('Response Headers:', response.headers); // Debugging log

    if (response.ok) {
      const user = await response.json();
      const subscriptionStatus = user.public_metadata?.subscriptionStatus || 'free';

      return new Response(JSON.stringify({ subscriptionStatus }), { status: 200 });
    } else {
      const errorText = await response.text();
      console.error('Failed to fetch user status:', errorText);
      return new Response(JSON.stringify({ message: "Failed to fetch user status." }), { status: response.status });
    }
  } catch (error) {
    console.error('Error fetching user status:', error);
    return new Response(JSON.stringify({ message: "Error fetching user status." }), { status: 500 });
  }
}
