
import { storageService } from "./async-storage.service";

const STORAGE_KEY = 'locs'

export const locService = {
    getLocs,
    getEmptyLoc,
    createLoc,
    saveLoc
}

const locs = [
    { _id: makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { _id: makeId(), name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

async function saveLoc(loc) {
    return storageService.post(STORAGE_KEY, loc)
}

function getEmptyLoc() {
    return {
        name: '', lat: '', lng: ''
    }
}

function createLoc({ lat, lng }) {
    return {
        name: '', lat, lng
    }
}

function makeId(leng = 5) {
    let id = '';
    for (let i = 0; i < leng; i++) {
        id += String.fromCharCode(Math.random() * (127 - 35) + 35);
    }
    return id;
}

async function getLocs() {
    const storageLocs = await storageService.query(STORAGE_KEY)
    if (storageLocs.length) return storageLocs
    return storageService.postMany(STORAGE_KEY, locs)
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs);
    //     }, 1000)
    // });

}


