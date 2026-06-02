export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }

  return null;
}

export async function loginWithGoogle(credential: string) {
  const formData = new URLSearchParams();
  formData.append("credential", credential);

  return await fetch(`${BASE_URL}/api/v1/google-login/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
}

export async function logoutFromGoogle() {
  const csrfToken = getCookie("csrftoken");

  return await fetch(`${BASE_URL}/api/v1/logout/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken ?? "",
    },
  });
}
