
export const isEqual = (target, reference) => {
    
    if (!target) {
        return false;
    }

    if (target.length !== reference.length) {
        return false;
    }
    for (let index = 0; index < target.length; index++) {
        if (target[index] !== reference[index]) {
            return false;
        }
    }
    return true;
}



export const generateNameEmail = () => {

    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const name1 = ["Adriana", "Albert", "Jane", "Geraldine", "Elizabeth", "Frieda", "Enrico", "Edwin"];
    const name2 = ["Caroline", "Einstein", "Meitner", "Bohr", "Schroedinger", "Hubble", "Pascal", "Halley", "Marie"];

    const firstName = name1[getRandomInt(0, name1.length)];
    const lastName = name2[getRandomInt(0, name2.length)];
    const name = capFirst(firstName) + ' ' + capFirst(lastName);
    const email = `${firstName}_${lastName}@demo.com`.toLowerCase();
    return { name, email };
}

