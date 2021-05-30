import java.util.Scanner;
public class ElectronicStoreTester {
    public static void main(String[]args){
        ElectronicStore store = new ElectronicStore("Sportstore");  //makes store
        store.printStock(store.desktops, store.laptops, store.fridges);     //prints all stock
        String userInput=" ";
        while(!(userInput.equals("quit"))){ //allows for repeated searching of terms
            System.out.println("Please enter a search term, or 'quit' to quit: ");
            Scanner UI=new Scanner(System.in);  //gets input
            userInput=UI.nextLine();
            if (!(userInput.equals("quit"))){
                if (store.searchStock(userInput, store.desktops, store.laptops, store.fridges)){    //searches all stock
                    System.out.println("A matching item is contained in the store's stock.");
                }
                else{
                    System.out.println("A matching item is not contained in the store's stock.");
                }
            }
        }
    }
}