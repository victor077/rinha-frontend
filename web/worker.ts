addEventListener('message', function (e: MessageEvent) {
    console.log("mensagem enviada para o script worker");
    const content: string = e.data.result
    try {
        const parsedJson = JSON.parse(content);
        if (typeof parsedJson === 'object') {
            postMessage({ result: parsedJson });
        } else {
            postMessage({ error: "Invalid file. Please load a valid JSON file." });
        }
    } catch (error: any) {
        postMessage({ error: "Error parsing JSON: " + error.message });
    }
})
