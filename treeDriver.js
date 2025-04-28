import {Tree} from "./binaryTree.js";


const test = new Tree([65,23,65,1,98,43,67,99,12,36,34,65]);


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}
prettyPrint(test.root);
console.log(test.isBalanced());

test.levelOrder((item)=> {
    console.log(item.data);
});
test.preOrder((item)=> {
    console.log(item.data);
});
test.inOrder((item)=> {
    console.log(item.data);
});
test.postOrder((item)=> {
    console.log(item.data);
});

test.insertItem(108);
test.insertItem(124);
test.insertItem(107);
test.insertItem(186);
test.insertItem(154);
console.log(test.isBalanced());
test.rebalance();
console.log(test.isBalanced());
prettyPrint(test.root);