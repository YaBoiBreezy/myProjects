import java.util.ArrayList;
public interface TrieMapInterface{
  //Adds the key/value pair to the TrieMap
  public void put(String key, String value);
  
  //Returns the object value associated with the given key
  //If the key is not present in the TrieMap, returns null
  public String get(String key);
  
  //Returns true if key is in the TrieMap, false otherwise
  public boolean containsKey(String key);
  
  //Returns an ArrayList of objects containing all keys that start with prefix
  public ArrayList<String> getKeysForPrefix(String prefix);
  
  //Prints all values stored inside the TrieMap
  public void print();
  
}/*
TrieMapInterface: This interface defines the methods that your TrieMap class must support. These methods should work
        similarly to how they would for a hash map or any other map data structure. The put method should add the
        associated key/value pair to the trie. If the key is already in the trie, the value should be updated.
        The get method should return the value associated with the given key, if the key exists. If the key does not exist
        in the trie, the get method should return null. The containsKey method should return true if the trie contains
        the given key and false otherwise. The getValuesForPrefix method must return an ArrayList of String values that
        contains all keys within the trie that start with the specified prefix. The print method should print all of the
        values contained within the trie. 2*/