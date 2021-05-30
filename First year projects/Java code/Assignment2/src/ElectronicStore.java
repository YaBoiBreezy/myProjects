import java.util.Scanner;
public class ElectronicStore {
    final int MAX_PRODUCTS=10; //the maximum number of different product instances that this store can contain. Final, so no need to be private.
    private String name;
    private double revenue=0;
    private Product[] products = new Product[MAX_PRODUCTS];
    private int numberOfProducts=0;

    public ElectronicStore(String name){
        this.name=name;
    }
    public String getName(){
        return name;
    }
    public boolean addProduct(Product p){
         if (numberOfProducts<10){
            products[numberOfProducts]=p;
            numberOfProducts+=1;
            return true;
        }
        return false;
    }
    public void sellProducts(){
        printStock();
        System.out.println("Please select a thing to buy");
        Scanner UI=new Scanner(System.in);  //gets input
        int selection=UI.nextInt()-1;
        System.out.println("Please select an amount");
        UI=new Scanner(System.in);  //gets input
        int amount=UI.nextInt();
        if (selection>=0 && selection<10 && products[selection].GetstockQuantity()>=amount && amount>0) {
            revenue+=products[selection].sellUnits(selection,amount);
        }
    }
    public void sellProducts(int item, int amount){
        if (item>=0 && item<numberOfProducts && products[item].GetstockQuantity()>=amount && amount>0){
            revenue+=products[item].sellUnits(item,amount);
        }
    }
    public double getRevenue(){
        return revenue;
    }
    public void printStock(){
        for (int x=0;x<MAX_PRODUCTS;x++) {
            if (products[x] != null) {
                System.out.println((x + 1) + ": " + products[x].toString());
            }
        }
    }
}