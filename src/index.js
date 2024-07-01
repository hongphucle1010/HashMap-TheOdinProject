import HashMap from "./hashmap";

const map = new HashMap(1);
map.set("name", "John Doe");
map.set("age", 30);
map.set("city", "New York");
map.set("name", "Jane Doe")
map.clear()
map.set("name", "John Doe");
console.log(map)
console.log(map.entries())
console.log(map.keys())
console.log(map.values())