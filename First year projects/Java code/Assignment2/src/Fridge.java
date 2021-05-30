public class Fridge extends Appliance{
    private double cubicFeet;
    private boolean hasFreezer;

    public Fridge(double price, int stockQuantity, int wattage, String color, String brand, double cubicFeet, boolean freezer) {
        super(wattage, color, brand, price, stockQuantity);
        this.cubicFeet = cubicFeet;
        this.hasFreezer = hasFreezer;
    }
    public String toString(){
        if (hasFreezer){
            return cubicFeet+" cu. ft. Sub Zero Fridge with Freezer ("+Getcolor()+", "+Getwattage()+" watts) ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
        }
        return cubicFeet+" cu. ft. Sub Zero Fridge ("+Getcolor()+", "+Getwattage()+" watts) ("+Getprice()+" dollars each, "+GetstockQuantity()+" in stock, "+GetsoldQuantity()+" sold)";
    }
}