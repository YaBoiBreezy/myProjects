package comp2402a2;

import java.util.ArrayList;
import java.util.*;
/**
 * This class implements the MyDeque interface.
 * @author sharp
 *
 * @param <T> the type of objects stored in the MyDeque
 *
 *
 */

public class MyFastDeque<T> implements MyDeque<T> {
	Deque<T> d = new ArrayDeque<T>();

	public MyFastDeque() {  }
	public int size() {return d.size();}

	public void addFirst(T x) {
		if(d.size()!=0 && equal(d.getFirst(),x)){
			d.removeFirst();
		}
		else {
			d.addFirst(x);
		}
	}

	public void addLast(T x) {
		if(d.size()!=0 && equal(d.getLast(),x)){
			d.removeLast();
		}
		else{
			d.addLast(x);
		}
	}

	public T removeFirst() {
		if(d.size()==0){
			return null;
		}
		return d.removeFirst();
	}

	public T removeLast() {
		if(d.size()==0){
			return null;
		}
		return d.removeLast();
	}
	public void ts(){
		/*Node place=head;
		String out="";
		for(int x=0;x<size;x++){
			out+=place.data;
			place=place.next;
		}
		System.out.println(out);*/
	}

	public boolean equal(T a, T b){
		if(a==null){
			return b == null;
		}
		else if(b==null){
			return false;
		}
		return a.equals(b);
	}
}


/*public class MyFastDeque<T> implements MyDeque<T> {
	class Node{
		T data;
		Node prev;
		Node next;
	}
	Node head,tail=null;
	int size;

	public MyFastDeque() { size=0; }
//Head -> next  node  prev <- tail
	public int size() { return size; }

	public void addFirst(T x) {
		if(size==0){
			Node hi=new Node();
			hi.data=x;
			head=hi;
			tail=hi;
			size++;
		}
		else if(equal(head.data,x)){
			if(size==1){head=null;tail=null;}
			else {
				head = head.next;
			}
			size--;
		}
		else{
			Node hi=new Node();
			hi.data=x;
			head.prev=hi;
			hi.next=head;
			head=hi;
			size++;
		}
	}

	public void addLast(T x) {
		if(size==0){
			Node hi=new Node();
			hi.data=x;
			head=hi;
			tail=hi;
			size++;
		}
		else if(equal(tail.data,x)){
			if(size==1){tail=null;head=null;}
			else {
				tail = tail.prev;
			}
			size--;
		}
		else{
			Node hi=new Node();
			hi.data=x;
			tail.next=hi;
			hi.prev=tail;
			tail=hi;
			size++;
		}
	}

	public T removeFirst() {
		if(size==0){
			return null;
		}
		T holder=head.data;
		if(size==1){tail=null;head=null;}
		else {
			head = head.next;
		}
		size--;
		return holder;
	}

	public T removeLast() {
		if(size==0){
			return null;
		}
		T holder=tail.data;
		if(size==1){tail=null;head=null;}
		else {
			tail = tail.prev;
		}
		size--;
		return holder;
	}
	public void ts(){
		Node place=head;
		String out="";
		for(int x=0;x<size;x++){
			out+=place.data;
			place=place.next;
		}
		System.out.println(out);
	}

	public boolean equal(T a, T b){
		/*if(a==b){
			return true;
		}*/
		/*if(a==null){
			return b == null;
		}
		else if(b==null){
			return false;
		}
		return a.equals(b);
	}
}*/


/*
public class MyFastDeque<T> implements MyDeque<T> {
	ArrayList<T> front=new ArrayList<T>();
	ArrayList<T> back=new ArrayList<T>();
	public MyFastDeque() {
	}

	public int size() {
		return front.size()+back.size();
	}

	public void addFirst(T x) {
		if(size()==0){
			front.add(x);
		}
		else if (front.size()==0 && back.size()==1){
			if(equal(back.get(0),x)){
				back.remove(0);
			}
			else{
				front.add(x);
			}
		}
		else{
			if(equal(front.get(front.size()-1),x)){
				front.remove(front.size()-1);
			}
			else{
				front.add(x);
			}
		}
		checkResize();
	}

	public void addLast(T x) {
		if(size()==0){
			back.add(x);
		}
		else if (back.size()==0 && front.size()==1){
			if(equal(front.get(0),x)){
				front.remove(0);
			}
			else{
				back.add(x);
			}
		}
		else{
			if(equal(back.get(back.size()-1),x)){
				back.remove(back.size()-1);
			}
			else{
				back.add(x);
			}
		}
		checkResize();
	}

	public T removeFirst() {
		if(size()==0){
			return null;
		}
		else if(front.size()==0 && back.size()==1){
			T holder=back.get(0);
			back.remove(0);
			return holder;
		}
		T holder=front.get(front.size()-1);
		front.remove(front.size()-1);
		checkResize();
		return holder;
	}

	public T removeLast() {
		if(size()==0){
			return null;
		}
		else if(back.size()==0 && front.size()==1){
			T holder=front.get(0);
			front.remove(0);
			return holder;
		}
		T holder=back.get(back.size()-1);
		back.remove(back.size()-1);
		checkResize();
		return holder;
	}

	public void checkResize(){
		if(size()==1 || size()==0){
		}
		else if(front.size()==0){
			int z=back.size()/2;
			ArrayList<T> newBack=new ArrayList<T>();
			for(int x=z;x>=0;x--){
				front.add(back.get(x));
			}
			for(int x=z+1;x<back.size();x++){
				newBack.add(back.get(x));
			}
			back=newBack;
		}
		else if(back.size()==0){
			int z=(front.size()-1)/2;
			ArrayList<T> newFront=new ArrayList<T>();
			for(int x=z;x>=0;x--){
				back.add(front.get(x));
			}
			for(int x=z+1;x<front.size();x++){
				newFront.add(front.get(x));
			}
			front=newFront;
		}
	}
	public void ts(){
		String out="";
		for(int x=back.size()-1;x>=0;x--){
			out+=back.get(x)+" ";
		}
		out+="|";
		for(int x=0;x<front.size();x++){
			out+=" "+front.get(x);
		}
		System.out.println(out);
	}

	public boolean equal(T a, T b){
		if(a==null){
			return b == null;
		}
		else if(b==null){
			return false;
		}
		return a.equals(b);
	}
}*/
