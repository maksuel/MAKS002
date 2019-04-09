let GRID;

jQuery(document).ready( $ => {

    const squareSize = 18;
    const padding = 3;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const words = [
        'DESENVOLVIMENTO',
        'SVILUPPO',
        'DEVELOPMENT',
        'DESARROLLO',
        'ENTWICKLUNG',
        'DÉVELOPPEMENT',
        'MAKS',
        'MAKSUEL BONI'
    ];
    let verticalLimit = 1000;
    let horizontalLimit = 1000;

    let canvas = $('#canvas');
    let grid = [];
    let cols;
    let rows;

    let draw = () => {

        let width = canvas.width();
        let height = canvas.height();

        cols = Math.floor( width / squareSize );
        rows = Math.floor( height / squareSize );

        let pixelWidth = width / cols;
        let pixelHeight = height / rows;

        $('html > head').append(
            $('<style>').attr('id','global').text(
                `span {
                    font-family: 'Roboto Mono', monospace;
                    font-size: ${(Math.ceil( squareSize / 2 ) + 1) + 'px'};
                }
                .square {
                    padding: ${padding + 'px'};
                    width: ${pixelWidth + 'px'};
                    height: ${pixelHeight + 'px'};
                }`
            )
        );

        canvas.empty();

        for( let x = 0; x < cols; x++ ) {

            grid[x] = [];

            for( let y = 0; y < rows; y++ ) {

                const char = characters.charAt( Math.floor( Math.random() * characters.length ) );
                const top = y * pixelHeight;
                const left = x * pixelWidth;
                const element = $('<div>').addClass('position-absolute m-0 overflow-hidden square').css({
                    left: left + 'px',
                    top: top + 'px'
                }).append(
                    $('<div>').addClass('d-table w-100 h-100'). append(
                        $('<span>').addClass('d-table-cell align-middle text-center text-dark').text(char)
                    )
                );

                grid[x][y] = {
                    element: element,
                    x: x,
                    y: y,
                    top: top,
                    left: left,
                    char: () => {
                        return element.find('span').text();
                    },
                    setWhite: () => {
                        element.find('div').addClass('bg-light').find('span').text('')
                    },
                    setRandom: () => {
                        element.find('div').removeClass('bg-light').find('span').text(
                            characters.charAt( Math.floor( Math.random() * characters.length ) )
                        )
                    },
                    setChar: char => {
                        element.find('div').removeClass('bg-light').addClass('bg-word').find('span').addClass('bold').text(char)
                    },
                    isLogo: () => {
                        return element.find('div').hasClass('bg-light');
                    },
                    isBold: () => {
                        return element.find('div').find('span').hasClass('bold');
                    }
                };

                canvas.append(element);
            }
        }

        whiteLogo( Math.floor( cols / 2 ), Math.floor( rows / 2 ) );

        let wi = 0;

        for( let j = 0; j < 100; j++ ) {
            
            let word = words[wi];
            
            wi = wi < words.length-1 ? ++wi : 0;


            if( Math.random() < .6 ) {

                addVerticalWord(word);

            } else {

                addHorizontalWord(word);
            }
        }

        GRID = grid;
    };

    let whiteLogo = ( offsetX = 0, offsetY = 0 ) => {

        [
            [10,10],                                              [16,10],
            [10,11], [11,11],                            [15,11], [16,11],
            [10,12], [11,12], [12,12],          [14,12], [15,12], [16,12],
            [10,13], [11,13], [12,13], [13,13], [14,13], [15,13], [16,13],
            [10,14], [11,14],          [13,14],          [15,14], [16,14],
            [10,15], [11,15],                            [15,15], [16,15],
            [10,16], [11,16],                            [15,16], [16,16],

                     [19,10], [20,10], [21,10],
            [18,11], [19,11],          [21,11], [22,11],
            [18,12], [19,12],          [21,12], [22,12],
            [18,13], [19,13],          [21,13], [22,13],
            [18,14], [19,14], [20,14], [21,14], [22,14],
            [18,15], [19,15],          [21,15], [22,15],
            [18,16], [19,16],          [21,16], [22,16],

            [24,10], [25,10],                   [28,10], [29,10],
            [24,11], [25,11],          [27,11], [28,11], 
            [24,12], [25,12], [26,12], [27,12],
            [24,13], [25,13], [26,13],
            [24,14], [25,14], [26,14], [27,14],
            [24,15], [25,15],          [27,15], [28,15], 
            [24,16], [25,16],                   [28,16], [29,16],

                     [32,10], [33,10], [34,10],
            [31,11], [32,11],                   [35,11],
            [31,12], [32,12],
                     [32,13], [33,13], [34,13],
                                       [34,14], [35,14],
            [31,15],                   [34,15], [35,15],
                     [32,16], [33,16], [34,16],

            [37,15], [38,15],
            [37,16], [38,16],

            [40,12], [41,12],          [43,12],          [45,12], [46,12],
            [40,13], [41,13],          [43,13],          [45,13], [46,13],
            [40,14], [41,14],          [43,14],          [45,14], [46,14],
                     [41,15], [42,15], [43,15], [44,15], [45,15],
                     [41,16], [42,16],          [44,16], [45,16],

                     [49,12], [50,12], [51,12],
            [48,13], [49,13],          [51,13], [52,13],
            [48,14], [49,14],          [51,14], [52,14],
            [48,15], [49,15],          [51,15], [52,15],
                     [49,16], [50,16], [51,16],

            [54,12], [55,12],          [57,12],
            [54,13], [55,13], [56,13], [57,13],
            [54,14], [55,14],
            [54,15], [55,15],
            [54,16], [55,16],

            [59,10], [60,10],
            [59,11], [60,11],
            [59,12], [60,12],          [62,12], [63,12],
            [59,13], [60,13], [61,13], [62,13],
            [59,14], [60,14], [61,14],
            [59,15], [60,15], [61,15], [62,15],
            [59,16], [60,16],          [62,16], [63,16]

        ].map( pos => {

            let x = ( pos[0] - 37 ) + offsetX;
            let y = ( pos[1] - 14 ) + offsetY;

            grid[x][y].setWhite();
        });
    };

    let addVerticalWord = word => {

        if( verticalLimit <= 0 ) return; // SAFE RECURSIVE
    
        let rx = Math.floor( Math.random() * cols );
        let ry = Math.floor( Math.random() * ( rows - word.length + 1 ) );
    
        let isEmpty = true;
    
        for( let i = 0; i < word.length; i++ ) {
    
            if( !isEmpty ) continue;

            const elem = grid[rx][ry+i];
    
            if( typeof elem == 'undefined' || elem.isLogo() ) {
                isEmpty = false;
            } else if( elem.isBold() ) {
                if( elem.char() != word.charAt(i) ) {
                    isEmpty = false;
                }
            }
        }
    
    
        if( isEmpty ) {
    
            for( let i = 0; i < word.length; i++ ) {
    
                grid[rx][ry+i].setChar(
                    word.charAt(i)
                );
            }
    
        } else {
    
            verticalLimit--;
    
            addVerticalWord(word);
        }
    };

    let addHorizontalWord = word => {

        if( horizontalLimit <= 0 ) return; // SAFE RECURSIVE
    
        let rx = Math.floor( Math.random() * ( cols - word.length + 1 ));
        let ry = Math.floor( Math.random() * rows );
    
        let isEmpty = true;

        for( let i = 0; i < word.length; i++ ) {
    
            if( !isEmpty ) continue;

            const elem = grid[rx+i][ry];
    
            if( typeof elem == 'undefined' || elem.isLogo() ) {
                isEmpty = false;
            } else if( elem.isBold() ) {
                if( elem.char() != word.charAt(i) ) {
                    isEmpty = false;
                }
            }
        }

        if( isEmpty ) {
    
            for( let i = 0; i < word.length; i++ ) {
    
                grid[rx+i][ry].setChar(
                    word.charAt(i)
                );
            }
    
        } else {
    
            horizontalLimit--;
    
            addHorizontalWord(word);
        }
    };

    draw();

    $(window).resize(draw);
});


/*


let x = 80, y = 55;
let sy = 24, sx = 13;

let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let words = [
    'DESENVOLVIMENTO',
    'SVILUPPO',
    'DEVELOPMENT',
    'DESARROLLO',
    'ENTWICKLUNG',
    'DÉVELOPPEMENT',
    'MAKS',
    'MAKSUEL BONI'
];

let container = $('#bg');
let grid = [];

for( let yi = 0; yi < y; yi++ ) {
    grid[yi] = [];
    let p = $('<p>').addClass('paragraph');
    for( let xi = 0; xi < x; xi++ ) {
        let char = characters.charAt( Math.floor( Math.random() * characters.length ) );
        let elem = $('<span>').addClass('default').text(char);
        grid[yi][xi] = {
            element: elem,
            isUsed: false,
            isLogo: false,
            char: char,
            x: xi,
            y: yi
        }
        p.append(elem);
    }
    container.append(p);
}

let verticalLimit = 1000;
let horizontalLimit = 1000;

// ADD VERTICAL WORD
function addVerticalWord( word ) {

    if( verticalLimit <= 0 ) return; // SAFE RECURSIVE

    let rx = Math.floor( Math.random() * x );
    let ry = Math.floor( Math.random() * ( y - word.length + 1 ) );

    let isEmpty = true;

    for( let i = 0; i < word.length; i++ ) {

        if( !isEmpty ) continue;

        let obj = grid[ry+i][rx];

        if( obj.isUsed || obj.isLogo ) {
            isEmpty = false;
        }
    }


    if( isEmpty ) {

        for( let i = 0; i < word.length; i++ ) {

            let obj = grid[ry+i][rx];

            obj.element.addClass('word').text( word.charAt(i) );
            obj.isUsed = true;
        }

    } else {

        verticalLimit--;

        addVerticalWord(word);
    }
}

// ADD VERTICAL WORD
function addHorizontalWord( word ) {

    if( horizontalLimit <= 0 ) return; // SAFE RECURSIVE

    let rx = Math.floor( Math.random() * ( x - word.length + 1 ));
    let ry = Math.floor( Math.random() * y );

    let isEmpty = true;

    for( let i = 0; i < word.length; i++ ) {

        if( !isEmpty ) continue;

        let obj = grid[ry][rx+i];

        if( obj.isUsed || obj.isLogo ) {
            isEmpty = false;
        }
    }


    if( isEmpty ) {

        for( let i = 0; i < word.length; i++ ) {

            let obj = grid[ry][rx+i];

            obj.element.addClass('word').text( word.charAt(i) );
            obj.isUsed = true;
        }

    } else {

        horizontalLimit--;

        addHorizontalWord(word);
    }
}



let logo = [
    grid[sy+0][sx+0], grid[sy+1][sx+0], grid[sy+2][sx+0], grid[sy+3][sx+0], grid[sy+4][sx+0], grid[sy+5][sx+0], grid[sy+6][sx+0],
                        grid[sy+1][sx+1], grid[sy+2][sx+1], grid[sy+3][sx+1], grid[sy+4][sx+1], grid[sy+5][sx+1], grid[sy+6][sx+1],
                                        grid[sy+2][sx+2], grid[sy+3][sx+2],
                                                            grid[sy+3][sx+3], grid[sy+4][sx+3],
                                        grid[sy+2][sx+4], grid[sy+3][sx+4],
                        grid[sy+1][sx+5], grid[sy+2][sx+5], grid[sy+3][sx+5], grid[sy+4][sx+5], grid[sy+5][sx+5], grid[sy+6][sx+5],
    grid[sy+0][sx+6], grid[sy+1][sx+6], grid[sy+2][sx+6], grid[sy+3][sx+6], grid[sy+4][sx+6], grid[sy+5][sx+6], grid[sy+6][sx+6],

                        grid[sy+1][sx+8],  grid[sy+2][sx+8],  grid[sy+3][sx+8],  grid[sy+4][sx+8],  grid[sy+5][sx+8],  grid[sy+6][sx+8],
    grid[sy+0][sx+9],  grid[sy+1][sx+9],  grid[sy+2][sx+9],  grid[sy+3][sx+9],  grid[sy+4][sx+9],  grid[sy+5][sx+9],  grid[sy+6][sx+9],
    grid[sy+0][sx+10],                                                          grid[sy+4][sx+10],
    grid[sy+0][sx+11], grid[sy+1][sx+11], grid[sy+2][sx+11], grid[sy+3][sx+11], grid[sy+4][sx+11], grid[sy+5][sx+11], grid[sy+6][sx+11],
                        grid[sy+1][sx+12], grid[sy+2][sx+12], grid[sy+3][sx+12], grid[sy+4][sx+12], grid[sy+5][sx+12], grid[sy+6][sx+12],

    grid[sy+0][sx+14], grid[sy+1][sx+14], grid[sy+2][sx+14], grid[sy+3][sx+14], grid[sy+4][sx+14], grid[sy+5][sx+14], grid[sy+6][sx+14],
    grid[sy+0][sx+15], grid[sy+1][sx+15], grid[sy+2][sx+15], grid[sy+3][sx+15], grid[sy+4][sx+15], grid[sy+5][sx+15], grid[sy+6][sx+15],
    grid[sy+2][sx+16], grid[sy+3][sx+16], grid[sy+4][sx+16],
    grid[sy+1][sx+17], grid[sy+2][sx+17], grid[sy+4][sx+17], grid[sy+5][sx+17],
    grid[sy+0][sx+18], grid[sy+1][sx+18], grid[sy+5][sx+18], grid[sy+6][sx+18],
    grid[sy+0][sx+19], grid[sy+6][sx+19],

    grid[sy+1][sx+21], grid[sy+2][sx+21], grid[sy+5][sx+21],
    grid[sy+0][sx+22], grid[sy+1][sx+22], grid[sy+2][sx+22], grid[sy+3][sx+22], grid[sy+6][sx+22],
    grid[sy+0][sx+23], grid[sy+3][sx+23], grid[sy+6][sx+23],
    grid[sy+0][sx+24], grid[sy+3][sx+24], grid[sy+4][sx+24], grid[sy+5][sx+24], grid[sy+6][sx+24],
    grid[sy+1][sx+25], grid[sy+4][sx+25], grid[sy+5][sx+25],

    grid[sy+5][sx+27], grid[sy+6][sx+27],
    grid[sy+5][sx+28], grid[sy+6][sx+28],

    grid[sy+2][sx+30], grid[sy+3][sx+30], grid[sy+4][sx+30],
    grid[sy+2][sx+31], grid[sy+3][sx+31], grid[sy+4][sx+31], grid[sy+5][sx+31], grid[sy+6][sx+31],
    grid[sy+5][sx+32], grid[sy+6][sx+32],
    grid[sy+3][sx+33], grid[sy+4][sx+33], grid[sy+5][sx+33],
    grid[sy+5][sx+34], grid[sy+6][sx+34],
    grid[sy+2][sx+35], grid[sy+3][sx+35], grid[sy+4][sx+35], grid[sy+5][sx+35], grid[sy+6][sx+35],
    grid[sy+2][sx+36], grid[sy+3][sx+36], grid[sy+4][sx+36],

    grid[sy+3][sx+38], grid[sy+4][sx+38], grid[sy+5][sx+38],
    grid[sy+2][sx+39], grid[sy+3][sx+39], grid[sy+4][sx+39], grid[sy+5][sx+39], grid[sy+6][sx+39],
    grid[sy+2][sx+40], grid[sy+6][sx+40],
    grid[sy+2][sx+41], grid[sy+3][sx+41], grid[sy+4][sx+41], grid[sy+5][sx+41], grid[sy+6][sx+41],
    grid[sy+3][sx+42], grid[sy+4][sx+42], grid[sy+5][sx+42],

    grid[sy+2][sx+44], grid[sy+3][sx+44], grid[sy+4][sx+44], grid[sy+5][sx+44], grid[sy+6][sx+44],
    grid[sy+2][sx+45], grid[sy+3][sx+45], grid[sy+4][sx+45], grid[sy+5][sx+45], grid[sy+6][sx+45],
    grid[sy+3][sx+46],
    grid[sy+2][sx+47], grid[sy+3][sx+47],

    grid[sy+0][sx+49], grid[sy+1][sx+49], grid[sy+2][sx+49], grid[sy+3][sx+49], grid[sy+4][sx+49], grid[sy+5][sx+49], grid[sy+6][sx+49],
    grid[sy+0][sx+50], grid[sy+1][sx+50], grid[sy+2][sx+50], grid[sy+3][sx+50], grid[sy+4][sx+50], grid[sy+5][sx+50], grid[sy+6][sx+50],
    grid[sy+3][sx+51], grid[sy+4][sx+51], grid[sy+5][sx+51],
    grid[sy+2][sx+52], grid[sy+3][sx+52], grid[sy+5][sx+52], grid[sy+6][sx+52],
    grid[sy+2][sx+53], grid[sy+6][sx+53]
];


for( let yi = 0; yi < y; yi++ ) {
    for( let xi = 0; xi < x; xi++ ) {

        if( logo.includes(grid[yi][xi]) ) {
            grid[yi][xi].char = '■';
            grid[yi][xi].element.addClass('brand text-light').text(grid[yi][xi].char = '■');
            grid[yi][xi].isUsed = true;
            grid[yi][xi].isLogo = true;
        }
    }
}




let wi = 0;

for( let j = 0; j < 80; j++ ) {
    
    let word = words[wi];
    
    wi = wi < words.length-1 ? ++wi : 0;


    if( Math.random() < .6 ) {

        addVerticalWord(word);

    } else {

        addHorizontalWord(word);
    }
}

// console.log(grid); */