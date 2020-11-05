export interface DialogueRouter {

}

const router = {
    'report': {
        'BOOKMARK' : { /** method inside */},
        'BOOKMARKER' : {},
        'SIGN' : {},
        'CONSUMING' : {},
        'CONSUMED' : {},
        'OTHER' : [
            'one',
            'two'
        ],
        // back
    } ,
    'address': {
        'SPECIFY': {} ,
        'SHARE': {} ,
        'back': 'back',
    },
    'image': {
        'send' : {},
        'dont send': {},
        'back' : 'back',
    },
    'end': 'end'
}
