export async function run(data, fetcher) {
    const response = await chrome.runtime.sendMessage({ type: 'fetch', url: `https://scamalytics.com/ip/${data.value}/`, options: { retries: 2 } });
    const text = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, 'text/html');
    const rows = htmlDoc.querySelectorAll('tr');
    const parsed = Array.from(rows)
        .map(row => row.innerText.trim().split('\n').map(x => x.trim()).filter(x => x.length))
        .filter(x => x.length === 2 && x[1] !== 'n/a')
    const parsedObj = Object.fromEntries(parsed);
    return { 'table': { 'title': 'IP Information', 'rows': parsedObj } }
}