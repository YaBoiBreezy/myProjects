public abstract class Appliance extends Product{
    private int wattage;
    private String color;
    private String brand;

    public Appliance(int wattage, String color, String brand, double price, int stockQuantity){
        super(price,stockQuantity);
        this.wattage=wattage;
        this.color=color;
        this.brand=brand;
    }
    public int Getwattage(){
        return wattage;
    }
    public String Getcolor(){
        return color;
    }
    public String Getbrand(){
        return brand;
    }
}
