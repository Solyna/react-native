
const defaultNumbers = [
    { key: '1', value: '1' },
    { key: '2', value: '2' },
    { key: '3', value: '3' },
    { key: '4', value: '4' },
    { key: '5', value: '5' },
    { key: '6', value: '6' },
    { key: '7', value: '7' },
    { key: '8', value: '8' },
    { key: '9', value: '9' },
];

const numberKeys = defaultNumbers.concat([
    { key: '', value: '' },
    { key: '0', value: '0' }
]);
const numberIdentity = defaultNumbers.concat([
    { key: 'X', value: 'X' },
    { key: '0', value: '0' }
]);
const defaultCharacterKey1 = [
    { key: 'q', value: 'q', capitalKey: 'Q', capitalValue: 'Q' },
    { key: 'w', value: 'w', capitalKey: 'W', capitalValue: 'W' },
    { key: 'e', value: 'e', capitalKey: 'E', capitalValue: 'E' },
    { key: 'r', value: 'r', capitalKey: 'R', capitalValue: 'R' },
    { key: 't', value: 't', capitalKey: 'T', capitalValue: 'T' },
    { key: 'y', value: 'y', capitalKey: 'Y', capitalValue: 'Y' },
    { key: 'u', value: 'u', capitalKey: 'U', capitalValue: 'U' }
];
const defaultCharacterKey2 = [
    { key: 'a', value: 'a', capitalKey: 'A', capitalValue: 'A' },
    { key: 's', value: 's', capitalKey: 'S', capitalValue: 'S' },
    { key: 'd', value: 'd', capitalKey: 'D', capitalValue: 'D' },
    { key: 'f', value: 'f', capitalKey: 'F', capitalValue: 'F' },
    { key: 'g', value: 'g', capitalKey: 'G', capitalValue: 'G' },
    { key: 'h', value: 'h', capitalKey: 'H', capitalValue: 'H' },
    { key: 'j', value: 'j', capitalKey: 'J', capitalValue: 'J' },
    { key: 'k', value: 'k', capitalKey: 'K', capitalValue: 'K' },
    { key: 'l', value: 'l', capitalKey: 'L', capitalValue: 'L' },

];
const defaultCharacterKey3 = [
    // { key: 'up', value: 'up', type: 'UP', svg: 'key_up' },
    { key: 'up', value: 'up', type: 'UP' },

    { key: 'z', value: 'z', capitalKey: 'Z', capitalValue: 'Z' },
    { key: 'x', value: 'x', capitalKey: 'X', capitalValue: 'X' },
    { key: 'c', value: 'c', capitalKey: 'C', capitalValue: 'C' },
    { key: 'v', value: 'v', capitalKey: 'V', capitalValue: 'V' },
    { key: 'b', value: 'b', capitalKey: 'B', capitalValue: 'B' },
    { key: 'n', value: 'n', capitalKey: 'N', capitalValue: 'N' },
    { key: 'm', value: 'm', capitalKey: 'M', capitalValue: 'M' },
    { key: 'delete', value: 'delete', type: 'DELETE', svg: 'key_delete' }
];
const lettersFirst = defaultCharacterKey1.concat(
    [
        { key: 'i', value: 'i', capitalKey: 'I', capitalValue: 'I' },
        { key: 'o', value: 'o', capitalKey: 'O', capitalValue: 'O' },
        { key: 'p', value: 'p', capitalKey: 'P', capitalValue: 'P' }
    ],
    defaultCharacterKey2,
    defaultCharacterKey3
);


const carNumber = defaultCharacterKey1.concat([
    { key: 'p', value: 'p', capitalKey: 'P', capitalValue: 'P' },
    { key: '港', value: '港', capitalKey: '港', capitalValue: '港' },
    { key: '澳', value: '澳', capitalKey: '澳', capitalValue: '澳' }],
    defaultCharacterKey2,
    [{ key: '学', value: '学', capitalKey: '学', capitalValue: '学' }],
    defaultCharacterKey3
);

export {
    numberKeys,
    lettersFirst,
    carNumber,
    numberIdentity

}