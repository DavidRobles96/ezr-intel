export async function run(data) {
    const response = await fetch(`https://scamalytics.com/ip/${data.value}/`);
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