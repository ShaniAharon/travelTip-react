
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    setCenter,
    getCenter
}

function query(entityType, delay = 300) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(entities)
        }, delay)
    })
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function postMany(entityType, newEntites) {
    return query(entityType)
        .then(entities => {
            entities.push(...newEntites)
            _save(entityType, entities)
            return newEntites
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            if (idx < 0) throw new Error(`Unknown Entity ${entityId}`)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

//map center function
function setCenter(entityType, centerLoc) {
    localStorage.setItem(entityType, JSON.stringify(centerLoc))
}

function getCenter(entityType) {
    return JSON.parse(localStorage.getItem(entityType)) || null
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(leng = 5) {
    let id = '';
    for (let i = 0; i < leng; i++) {
        id += String.fromCharCode(Math.random() * (127 - 35) + 35);
    }
    return id;
}
