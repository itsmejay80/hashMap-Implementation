class Node {
  // Node class to store key-value pairs and maintain linked list of collisions in bucket array of HashMap class below
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor(size = 1000) {
    // Initialize bucket array given size
    this.buckets = new Array(size).fill(null);
    this.size = size;
  }

  // Simple hash function: sum up the char codes of key's characters
  hash(key) {
    if (typeof key === "number") return key % this.size;

    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  }

  // Insert key-value pair into hash map
  set(key, value) {
    const index = this.hash(key);
    let node = this.buckets[index];

    // If bucket is empty, insert and return
    if (!node) {
      this.buckets[index] = new Node(key, value);
      return;
    }

    // Check if key already exists, if so update value
    let prev;
    while (node) {
      if (node.key === key) {
        node.value = value;
        return;
      }
      prev = node;
      node = node.next;
    }

    // If key not found, insert a new node
    prev.next = new Node(key, value);
  }

  // Return value associated with given key
  get(key) {
    const index = this.hash(key);
    let node = this.buckets[index];

    // Search for the key in the linked list
    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
    return undefined;
  }

  // Delete key-value pair from hash map
  delete(key) {
    const index = this.hash(key);
    let node = this.buckets[index];

    // If bucket is empty, return
    if (!node) return;

    // If deleting head of linked list, update bucket
    if (node.key === key) {
      this.buckets[index] = node.next;
      return;
    }

    // Search for the node
    let prev = node;
    while (node.next && node.key !== key) {
      prev = node;
      node = node.next;
    }

    // If key not found, return
    if (node.key !== key) return;

    // Remove node from linked list
    prev.next = node.next;
  }
}

let map = new HashMap();

map.set(1, "One");
map.set(2, "Two");
map.set(3, "Three");
map.set(3, "3");

console.log(map.get(1));
console.log(map.get(2));
console.log(map.get(3));

map.delete(3);

console.log(map.get(3));
