import { cookies } from "next/headers";

export async function getSessionCookie() {
    const session_cookie_name = process.env.NEXT_PUBLIC_SESSION_COOKIE;
    const cookieStore = cookies()

    const session_cookie = cookieStore.get(session_cookie_name || '');

    const name = session_cookie?.name;
    const value = session_cookie?.value;
    return {name, value};

}

export const getAuthHeader = async () => {
    const { name, value } = await getSessionCookie();
    const headers = {
        "Content-Type": "application/json",
        "Cookie": `${name}=${value}`
    }
    return headers;
}