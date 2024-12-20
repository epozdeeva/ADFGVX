const keySquare = [
    ['A', 'D', 'F', 'G', 'V', 'X'],
    ['B', 'C', 'E', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'W'],
    ['Y', 'Z']
];

function createLookupTable() {
    const lookup = {};
    for (let i = 0; i < keySquare.length; i++) {
        for (let j = 0; j < keySquare[i].length; j++) {
            lookup[keySquare[i][j]] = `${i}${j}`;
        }

        if (i === keySquare.length - 1) {
            lookup['Y'] = `${i}${keySquare[i].length}`;
            lookup['Z'] = `${i}${keySquare[i].length + 1}`;
        }
    }
    return lookup;
}

const lookupTable = createLookupTable();

function encrypt(text) {
    text = text.toUpperCase().replace(/[^A-Z]/g, ''); 
    let encrypted = '';
    
    for (const char of text) {
        if (lookupTable[char]) {
            encrypted += lookupTable[char];
        }
    }

    return encrypted;
}

function decrypt(text) {
    const reverseLookup = Object.fromEntries(Object.entries(lookupTable).map(([k, v]) => [v, k]));
    let decrypted = '';
    
    for (let i = 0; i < text.length; i += 2) {
        const code = text.substr(i, 2);
        if (reverseLookup[code]) {
            decrypted += reverseLookup[code];
        }
    }

    return decrypted;
}

document.getElementById('encryptBtn').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const result = encrypt(inputText);
    document.getElementById('resultText').value = result;
});

document.getElementById('decryptBtn').addEventListener('click', () => {
    const inputText = document.getElementById('resultText').value;
    const result = decrypt(inputText);
    document.getElementById('inputText').value = result;
});