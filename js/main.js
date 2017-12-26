function countNode(nodeArr, node, result, depth) {
    result[depth] ++;

    for(var i=nodeArr[node].length-1; i>=0; i--) {
        countNode(nodeArr, nodeArr[node][i], result, depth+1);
    }
}

function Stack(size) {
    this.arr = new Array(size);
    this.pointer = 0;
}

Stack.prototype.push = function(v) {
    this.arr[this.pointer] = v;
    this.pointer ++;
}

Stack.prototype.pushN = function(v, n) {
    for (var i = n-1; i >= 0; i--) {
        this.push(v);
    }
}

Stack.prototype.pop = function() {
    this.pointer --;
    return this.arr[this.pointer];
}

Stack.prototype.pushArray = function(arr) {
    for (var i=arr.length-1; i>=0; i--) {
        this.push(arr[i]);
    }
}

Stack.prototype.isEmpty = function() {
    return this.pointer <= 0;
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
        if (i !== A[i]) {
            if (nodeArr[A[i]]) {
                nodeArr[A[i]].push(i);
            } else {
                nodeArr[A[i]] = [i];
            }
        } else {
            root = i;
        }
    }

    if (root < 0) {
        return [];
    }

    var stack = new Stack(A.length),
        dStack = new Stack(A.length),
        curNode = root,
        depth = 1;

    result[0] = 1;
    do {
        if (nodeArr[curNode]) {
            var c = nodeArr[curNode].length;
            result[depth] += c;
            stack.pushArray(nodeArr[curNode]);
            dStack.pushN(depth + 1, c);
        }
        curNode = stack.pop();
        depth = dStack.pop();
    } while(curNode !== undefined);

    return result;
}

let testArr = [9, 3, 4, 9, 0, 4, 8, 9, 0, 9];
for (var i=0; i<50; i++) {
    testArr.push(i);
}

var ts1 = new Date().getTime();
var rst = solution(testArr);
console.log(new Date().getTime() - ts1);
console.log(rst);

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
        (rst)
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
