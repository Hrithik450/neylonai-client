export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");

  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }

  return null;
}

export async function loginWithGoogleToken(credential: string) {
  const formData = new URLSearchParams();
  formData.append("credential", credential);

  return await fetch(`${BASE_URL}/accounts/google/login/one-tap/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
}

export async function logoutFromGoogle() {
  console.log("CSRF:", getCookie("__Secure-csrftoken"));

  return await fetch(`${BASE_URL}/accounts/google/logout/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("__Secure-csrftoken") || "",
    },
  });
}
