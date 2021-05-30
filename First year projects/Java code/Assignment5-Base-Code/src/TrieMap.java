//Note: All of your TrieMapInterface method implementations must function recursively
//I have left the method signatures from my own solution, which may be useful hints in how to approach the problem
//You are free to change/remove/etc. any of the methods, as long as your class still supports the TrieMapInterface
import java.util.ArrayList;
import java.util.HashMap;
//step=call recursive function again
public class TrieMap implements TrieMapInterface{
  TrieMapNode root;
  
  public TrieMap(){
    root=new TrieMapNode(); //makes root node
  }
  public void put(String key, String value){put(root,key,value);} //functions to take arguments and format for recursive functions
  public String get(String key){return get(root,key);}
  public boolean containsKey(String key){ return containsKey(root,key); }
  public void print(){print(root);}


  public void put(TrieMapNode current, String curKey, String value) { //puts value into trie, makes new path if necessary
    if (curKey.length() == 0) { //if keyLength=0, destination reached
      current.setValue(value);
      return;
    }
    HashMap<Character, TrieMapNode> children = current.getChildren(); //gets all children
    if (children.containsKey(curKey.charAt(0))) { //if next step in path already exists
      put(children.get(curKey.charAt(0)), curKey.substring(1), value);
      return;
    } //otherwise make a new step in the path, enters it
    children.put(curKey.charAt(0), new TrieMapNode());
    current.setChildren(children);
    put(children.get(curKey.charAt(0)), curKey.substring(1), value);
  }

  public String get(TrieMapNode current, String curKey){
    if (curKey.length()==0){
      if (current.getValue()!=null){ //if reached destination, return value or null
        return current.getValue();
      }
      return null;
    }
    HashMap<Character, TrieMapNode> children = current.getChildren();
    if (children.containsKey(curKey.charAt(0))){ //if path exists, take a step. otherwise return null
      return get(children.get(curKey.charAt(0)),curKey.substring(1));
    }
    return null;
  }

  public boolean containsKey(TrieMapNode current, String curKey){
    if (curKey.length()==0){ //if at destination and value exists, return true
      if (current.getValue()!=null){
        return true;
      }
      return false;
    }
    HashMap<Character, TrieMapNode> children = current.getChildren();
    if (children.containsKey(curKey.charAt(0))){ //if path exists, step. otherwise return false
      return containsKey(children.get(curKey.charAt(0)),curKey.substring(1));
    }
    return false;
  }

  public ArrayList<String> getKeysForPrefix(String prefix){
    TrieMapNode node = findNode(root,prefix); //gets the right node
    if (node!=null){ //if te node exists, get the keys
      return getSubtreeKeys(node);
    }
    return new ArrayList();
  }

  public TrieMapNode findNode(TrieMapNode current, String curKey){
    if (curKey.length()==0){ //if at destination, return node
      return current;
    }
    HashMap<Character, TrieMapNode> children = current.getChildren();
    if (children.containsKey(curKey.charAt(0))){ //if oath exists, take step
      return findNode(children.get(curKey.charAt(0)),curKey.substring(1));
    }
    return null;
  }

  public ArrayList<String> getSubtreeKeys(TrieMapNode current){
    ArrayList<String> list=new ArrayList<>();
    HashMap<Character, TrieMapNode> children = current.getChildren();
    if (children.size()>0){ //probs not necessary
      children.forEach((key,value) -> list.addAll(getSubtreeKeys(value))); //add all subtreekeys of this node
    }

    //for (HashMap.Entry<Character, TrieMapNode> child:children.entrySet()){
    //  list.addAll(getSubtreeKeys(child.getValue()));
    //}
    if (current.getValue()!=null){
      list.add(current.getValue()); //adds this node's value, if it exists
    }
    return list;
  }

  public void print(TrieMapNode current){
    if (current.getValue()!=null){ //if value exists, print it
      System.out.println(current.getValue());
    }
    HashMap<Character, TrieMapNode> children = current.getChildren();
    for (char key:children.keySet()){
      print(children.get(key)); //print() all children
    }
  }
  
  public static void main(String[] args){
    //You can add some code in here to test out your TrieMap initially
    //The TrieMapTester includes a more detailed test
  }
}