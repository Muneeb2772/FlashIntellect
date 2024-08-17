// updateUserStatus/route.js

export async function POST(req) {
    try {
      const { userId, status } = await req.json();
  
      const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            subscriptionStatus: status,
          },
        }),
      });
  
      if (response.ok) {
        return new Response(JSON.stringify({ message: "User status updated successfully." }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ message: "Failed to update user status." }), { status: response.status });
      }
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: "Error updating user status." }), { status: 500 });
    }
  }
  