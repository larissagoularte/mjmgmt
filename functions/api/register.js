import bcrypt from 'bcrypt';

export async function onRequestPost(context) {
    const { request, env } = context;
    const { username, password } = await request.json();

    if (!username || !password) {
        return new Response('Invalid request body', { status: 400 });
    }

    const existingUser = await env.USERS.get(username);
    if(existingUser) {
        return new Response('User already exists', { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDetails = { username, password: hashedPassword };
    await env.USERS.put(username, JSON.stringfy(userDetails));

    return new Response('User registered successfully', { status: 201 });
}