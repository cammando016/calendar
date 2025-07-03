export default function backendTest() {
    fetch('http://localhost:5001/secretmessage')
    .then(res => res.text())
    .then(msg => alert(msg))
}