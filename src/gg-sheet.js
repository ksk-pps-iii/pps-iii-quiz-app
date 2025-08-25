export const apiUrl = 'https://script.google.com/macros/s/AKfycbwiO63v0RvmBAc1THJ6oBD-uy5C-6QS8y48VhEj6sDGg_Ur8bUW4_KUmnPuTOeyjjuSsA/exec';

export async function postCloudData(action, data) {
    const payloadJSON = JSON.stringify({...data});
    var result = await fetch(`${apiUrl}?action=${action}`, {
        method: 'POST',
        body: payloadJSON,
        headers: { 'Content-Type': 'text/plain;charset=utf-8'},
    });
    var r = await result.json();
    return r;
}