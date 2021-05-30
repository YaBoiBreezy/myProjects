public abstract class Product {
    private double price;
    private int stockQuantity;
    private int soldQuantity=0;
    public Product(double price, int stockQuantity){
        this.price=price;
        this.stockQuantity=stockQuantity;
    }
    public double sellUnits(int item, int amount){
        if (stockQuantity>=amount){
            stockQuantity-=amount;
            soldQuantity+=amount;
            return amount*price;
        }
        return 0.0;
    }
    public int GetstockQuantity(){
        return stockQuantity;
    }
    public double Getprice(){
        return price;
    }
    public int GetsoldQuantity(){
        return soldQuantity;
    }
}