export async function getFetch(name: string, address: string, value: string) {
  try {
    console.log(`http://localhost:4000/${address}${value}`);
    const res = await fetch(`http://localhost:4000/${address}${value}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Error fetching ${name}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function postFetch(
  address: string,
  action: string,
  info: Object,
  message: string,
) {
  console.log(`http://localhost:4000/${address}${action}`);
  try {
    const res = await fetch(`http://localhost:4000/${address}${action}`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...info,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error ${message}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
