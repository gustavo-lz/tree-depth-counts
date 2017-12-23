function countNode(nodeArr, node, result, depth) {
    result[depth] ++;

    for(var i=nodeArr[node].length-1; i>=0; i--) {
        countNode(nodeArr, nodeArr[node][i], result, depth+1);
    }
}

function solution(A) {
    if (typeof A === 'array' && A.length) {
        return [];
    }

    var nodeArr = new Array(A.length),
        result = new Array(A.length).fill(0),
        root = -1,
        i;
    for(i = A.length-1; i>=0; i--) {
        nodeArr[i] = [];
    }
    for(i = A.length-1; i>=0; i--) {
        if (i !== A[i]) {
            nodeArr[A[i]].push(i);
        } else {
            root = i;
        }
    }

    if (root < 0) {
        return [];
    }

    countNode(nodeArr, root, result, 0);

    return result;
}

let testArr = [9, 3, 4, 9, 0, 4, 8, 9, 0, 9];

var div = document.getElementById('result');

$('#result').append('<p>Test Array</p>');
$('#result').append(
    renderjson
        .set_icons('+', '-')
        .set_show_to_level(1)
        (testArr)
);

$('#result').append('<p>Result</p>');
$('#result').append('<p>solution(testArr, 9)</p>');
$('#result').append(
    renderjson
        .set_icons('+', '-')
        .set_show_to_level(1)
        (solution(testArr))
);

function getData(arr) {
    var result = [];
    for (var i = testArr.length - 1; i >= 0; i--) {
        const item = {
            id: i
        };
        if (i === testArr[i]) item.root = true;
        result.push(item);
    }
    return result;
}

function getLinks(arr) {
    var result = [];

    for (var i = testArr.length - 1; i >= 0; i--) {
        if (i !== testArr[i]) {
            result.push({
                source: i,
                target: testArr[i]
            });
        }
    }

    return result;
}
