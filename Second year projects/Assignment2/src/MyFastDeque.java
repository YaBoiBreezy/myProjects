import java.util.ArrayList;

/**
 * This class implements the MyDeque interface.
 * @author sharp
 *
 * @param <T> the type of objects stored in the MyDeque
 */
public class MyFastDeque<T> implements MyDeque<T> {
	ArrayList<T> front;
	ArrayList<T> back;
	public MyFastDeque() {
	}

	public int size() {
		return front.size()+back.size();
	}
	
	public void addFirst(T x) {
		if(front.get(front.size()-1)==x){
			front.remove(front.size()-1);
		}
		else{
			front.add(x);
		}
		checkResize();
	}
	
	public void addLast(T x) {
		if(back.get(back.size()-1)==x){
			back.remove(back.size()-1);
		}
		else{
			back.add(x);
		}
		checkResize();
	}
	
	public T removeFirst() {
		T holder=front.get(front.size()-1);
		front.remove(front.size()-1);
		checkResize();
		return holder;
	}

	public T removeLast() {
		T holder=back.get(back.size()-1);
		back.remove(back.size()-1);
		checkResize();
		return holder;
	}

	public void checkResize(){
		if(size()>1){
			if(front.size()==0){
				int z=back.size()/2;
				boolean odd=false;
				T holder=null;
				if(back.size()%2!=0){
					holder=removeLast();
					odd=true;
				}
				for(int y=z-1;y>=0;y--){
					front.add(back.get(y));
					back.set(y,removeLast());
				}
				if (odd){
					back.add(holder);
				}
			}
			else if(back.size()==0){
				int z=front.size()/2;
				boolean odd=false;
				T holder=null;
				if(front.size()%2!=0){
					holder=removeFirst();
					odd=true;
				}
				for(int y=z-1;y>=0;y--){
					back.add(front.get(y));
					front.set(y,removeFirst());
				}
				if (odd){
					front.add(holder);
				}
			}
		}

	}
}
