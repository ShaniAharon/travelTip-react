export const locService = {
    getLocs
}


const locs = [
    { id: '12341', name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id: '123a2', name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 1000)
    });
}


