import { LinkedList } from "./linkedList.js";

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.prepend("turtle");
list.insertAt('rabbit', 9);
list.removeAt(4);
console.log(list.at(8));
list.pop();
console.log(list.toString());

console.log(list.contains('snake'));
console.log(list.contains('hamster'));